// @flow
/* eslint no-plusplus: ['error', { 'allowForLoopAfterthoughts': true }] */
import CCXT from 'ccxt';
import { forEach } from 'p-iteration';
import moment from 'moment';
import map from 'lodash/map';
import { bindActionCreators } from 'redux';
import Store from 'electron-store';

import swal from 'sweetalert2';
import getStore from '../store/getStore';
import { CONFIG_KEY } from '../enc_keys';
import * as cryptoActions from '../actions/crypto';
import type { Profile, ProfileData } from '../_types/Profile';
import type {
  TimedCandleData,
  OHLCVCandle,
  ResolutionType,
  ResolutionTypes
} from '../_types/Crypto';

const reduxStore = getStore();

const cryptoStore = new Store({
  name: 'cryptoData',
  defaults: {},
  /**
   * Only encrypt the cryptoData store when in production
   * This is to prevent users manually editing the file
   * @see https://github.com/sindresorhus/electron-store
   */
  encryptionKey: process.env.NODE_ENV === 'production' ? CONFIG_KEY : undefined
});

const MIN_EXCHANGES_ALLOWED = 3;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Opted for singleton design pattern
 * @see https://en.wikipedia.org/wiki/Singleton_pattern
 * This is so market data is always cached.
 * Additionally there` is little need to have more than one instance
 * of the class with my use.
 */
export default new class CryptoAPI {
  loadedExchanges = [];
  currencyExchangeLookup = {};
  hasStartedLoadingMarkets = false;
  lastUsed = {};
  store: typeof cryptoStore = null;
  cryptoActions: typeof cryptoActions;

  constructor(store: typeof cryptoStore) {
    this.store = store;
    if (this.store.get('lastUsed') == null) {
      this.store.set('lastUsed', {});
    }
    this.cryptoActions = bindActionCreators(cryptoActions, reduxStore.dispatch);
  }

  getCurrentProfile(): Profile {
    const profileData: ProfileData = reduxStore.getState().profileData;
    if (!profileData.currentProfile) {
      throw Error('Profile not loaded');
    }
    return profileData.loadedProfiles[profileData.currentProfile];
  }

  saveCryptoData(cryptoData) {
    this.store.store = cryptoData;
  }

  getExchange(exchangeId: string) {
    let exchange;
    for (let i = 0, l = this.loadedExchanges.length; i < l; i++) {
      exchange = this.loadedExchanges[i];
      if (exchange.id === exchangeId) {
        return exchange;
      }
    }
  }

  async loadExchange(exchange: any) {
    await exchange.loadMarkets();

    Object.keys(exchange.currencies).forEach(currencyName => {
      if (!this.currencyExchangeLookup[currencyName]) {
        this.currencyExchangeLookup[currencyName] = [exchange];
      } else if (
        !this.currencyExchangeLookup[currencyName].includes(exchange)
      ) {
        this.currencyExchangeLookup[currencyName].push(exchange);
      }
    });
  }

  cacheOHLCVData(
    exchangeId: string,
    symbol: string,
    timedCandleData: TimedCandleData[]
  ): TimedCandleData[] {
    const oS = this.store.store;
    let origArr = [];
    if (
      oS &&
      oS.candleData &&
      oS.candleData[exchangeId] &&
      oS.candleData[exchangeId][symbol]
    ) {
      origArr = oS.candleData[exchangeId][symbol].filter(x => x != null);
    }
    const allData = [...origArr, ...timedCandleData];
    const candleData = {};
    candleData[exchangeId] = {};
    candleData[exchangeId][symbol] = allData;

    this.store.store = { ...oS, candleData };
    return timedCandleData;
  }

  getOHLCVDataFromStore(
    exchangeId: string,
    symbol: string
  ): ?((?TimedCandleData)[]) {
    const actualStore = this.store.store;
    if (
      actualStore &&
      actualStore.candleData &&
      actualStore.candleData[exchangeId] &&
      actualStore.candleData[exchangeId][symbol]
    ) {
      return actualStore.candleData[exchangeId][symbol];
    }
  }

  canUseExchange(exchange: any) {
    return (
      +moment() - this.store.get(`lastUsed.${exchange.id}`, 0) >
      exchange.rateLimit * 2
    );
  }

  async requestLock(exchange: any) {
    while (!this.canUseExchange(exchange)) {
      /**
       * We can happily/safetly use await in a loop here
       * as we want this loop to be blocking to prevent
       * over requesting the exchange.
       */
      // eslint-disable-next-line no-await-in-loop
      await sleep(exchange.rateLimit);
    }
    this.store.set(`lastUsed.${exchange.id}`, +moment());
  }

  static normalizeData(data: any[]): OHLCVCandle[] {
    const candleData = [];
    data.forEach(arr => {
      candleData.push(map(arr, val => +val));
    });
    return candleData;
  }

  async requestOHLCV(
    exchange: any,
    symbol: string,
    timeframe: string
  ): Promise<?TimedCandleData> {
    await this.requestLock(exchange);
    // return;
    if (
      !(await swal({
        title: 'fetch Exchange Data',
        type: 'warning',
        showCancelButton: true
      })).value
    ) {
      return;
    }

    console.log(
      `[CryptoAPI] Exchange data fetched from ${
        exchange.id
      } at ${+moment()} with rateLimit ${exchange.rateLimit}`
    );
    let data = null;
    try {
      data = CryptoAPI.normalizeData(
        await exchange.fetchOHLCV(symbol, timeframe)
      );
    } catch (e) {
      console.warn(
        `[CryptoAPI] Exchange load OHLCV failed: ${exchange && exchange.name}`,
        e
      );
      return;
    }

    const candleData: TimedCandleData = {
      data,
      lastUpdated: +moment(),
      timeframe
    };
    this.cacheOHLCVData(exchange.id, symbol, [candleData]);
    return candleData;
  }

  async loadOHLCV() {
    if (!this.loadedExchanges[0]) {
      await this.loadMarkets();
    }
    console.log(this.loadedExchanges[0]);
    while (this.getExchange('coinfloor') == null) {
      await sleep(100);
    }
    return this.fetchOHLCV(this.getExchange('getbtc'), 'BTC/EUR');
  }

  async fetchOHLCV(exchange: any, symbol: string): Promise<?(OHLCVCandle[])> {
    const candleDataArr: ?((?TimedCandleData)[]) = this.getOHLCVDataFromStore(
      exchange.id,
      symbol
    );
    let allData: OHLCVCandle[] = [];
    const neededRezs: string[] = Object.keys(exchange.timeframes);
    if (candleDataArr != null) {
      candleDataArr.forEach((timedCandleData, i) => {
        if (timedCandleData == null) {
          return;
        }
        if (
          +moment() - timedCandleData.lastUpdated >=
          this.getCurrentProfile().expiryTimeout
        ) {
          // candle has expired
          candleDataArr[i] = null;
          return;
        }

        if (neededRezs.includes(timedCandleData.timeframe)) {
          allData = [...allData, ...timedCandleData.data];
          neededRezs[neededRezs.indexOf(timedCandleData.timeframe)] = null;
        }
      });
    }

    neededRezs.forEach(async (rez: ?string) => {
      if (rez == null) {
        return;
      }
      console.log(rez, 'rez needed');

      const data: ?TimedCandleData = await this.requestOHLCV(
        exchange,
        symbol,
        rez
      );
      if (data == null) {
        return;
      }
      allData = [...allData, ...data.data];
    });

    return allData;
  }

  async loadMarkets() {
    if (this.hasStartedLoadingMarkets) return;
    // if (!confirm('load market')) return;
    this.hasStartedLoadingMarkets = true;

    await forEach(CCXT.exchanges, async exchangeName => {
      // internal exchange names
      let exchange;
      try {
        // Instanciate all public exchanges (ones without APIkey and etc.)
        exchange = new CCXT[exchangeName]();
        if (exchange == null) {
          throw Error();
        }
        await this.requestLock(exchange);
        await this.loadExchange(exchange);
      } catch (e) {
        console.warn(
          `[CryptoAPI] Exchange load market failed: ${(exchange &&
            exchange.name) ||
            exchangeName}`,
          e
        );
        return;
      }
      this.loadedExchanges.push(exchange);
      this.cryptoActions.loadedExchange(exchange.id);
    });

    Object.keys(this.currencyExchangeLookup).forEach(currencyName => {
      if (
        this.currencyExchangeLookup != null &&
        this.currencyExchangeLookup[currencyName].length < MIN_EXCHANGES_ALLOWED
      ) {
        this.currencyExchangeLookup[currencyName] = null;
      }
    });
  }
}(cryptoStore);
