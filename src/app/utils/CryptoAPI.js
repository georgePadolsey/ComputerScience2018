// @flow
/* eslint no-plusplus: ['error', { 'allowForLoopAfterthoughts': true }] */
import CCXT from 'ccxt';
import { forEach } from 'p-iteration';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import Store from 'electron-store';

import getStore from '../store/getStore';
import { CONFIG_KEY } from '../enc_keys';
import * as cryptoActions from '../actions/crypto';

import type {
  TimedCandleData,
  OHLCVCandle,
  ResolutionType,
  ResolutionTypes
} from '../_types/Crypto';

export const Resolutions: ResolutionTypes = {
  HOUR: {
    id() {
      return 'HOUR';
    },
    since() {
      return +moment().subtract('1', 'day');
    },
    resolution() {
      return '1h';
    },
    expires() {
      return +moment()
        .minute(0)
        .add(1, 'hour');
    }
  },
  DAY: {
    id() {
      return 'DAY';
    },
    since() {
      return +moment().subtract('1', 'month');
    },
    resolution() {
      return '1d';
    },
    expires() {
      return +moment()
        .hour(0)
        .add(1, 'day');
    }
  },
  MONTH: {
    id() {
      return 'MONTH';
    },
    since() {
      return null;
    },
    resolution() {
      return '1M';
    },
    expires() {
      return +moment()
        .date(1)
        .add(1, 'month');
    }
  }
};

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
 * Additionally there is little need to have more than one instance
 * of the class with my use.
 */
export default new class CryptoAPI {
  loadedExchanges = [];
  currencyExchangeLookup = {};
  // @deprecated
  loadedCurrencies = {};
  hasStartedLoadingMarkets = false;
  lastUsed = {};
  store: typeof cryptoStore = null;
  cryptoActions: typeof cryptoActions;

  neededResolutions = [Resolutions.HOUR, Resolutions.DAY, Resolutions.MONTH];

  constructor(store: typeof cryptoStore) {
    this.store = store;
    if (this.store.get('lastUsed') == null) {
      this.store.set('lastUsed', {});
    }
    this.cryptoActions = bindActionCreators(cryptoActions, reduxStore.dispatch);
  }

  saveCryptoData(cryptoData) {
    this.store.store = cryptoData;
  }

  async loadExchange(exchange) {
    await exchange.loadMarkets();

    Object.keys(exchange.currencies).forEach(currencyName => {
      if (!this.currencyExchangeLookup[currencyName]) {
        this.currencyExchangeLookup[currencyName] = [exchange];
      } else if (!this.currencyExchangeLookup[currencyName].includes(exchange)) {
        this.currencyExchangeLookup[currencyName].push(exchange);
      }
      this.loadedCurrencies[currencyName] = exchange.currencies[currencyName];
    });
  }

  cacheOHLCVData(
    exchangeId: string,
    symbol: string,
    timedCandleData: TimedCandleData[]
  ): TimedCandleData[] {
    const oS = this.store.store;
    let origArr = [];
    if (oS && oS.candleData && oS.candleData[exchangeId] && oS.candleData[exchangeId][symbol]) {
      origArr = oS.candleData[exchangeId][symbol].filter(x => x != null);
    }
    const allData = [...origArr, ...timedCandleData];
    const candleData = {};
    candleData[exchangeId] = {};
    candleData[exchangeId][symbol] = allData;

    this.store.store = Object.assign({}, oS, { candleData });
    return timedCandleData;
  }

  getOHLCVDataFromStore(exchangeId: string, symbol: string): ?((?TimedCandleData)[]) {
    const oS = this.store.store;
    if (oS && oS.candleData && oS.candleData[exchangeId] && oS.candleData[exchangeId][symbol]) {
      return oS.candleData[exchangeId][symbol];
    }
  }

  canUseExchange(exchange: any) {
    return +moment() - this.store.get(`lastUsed.${exchange.id}`, 0) > exchange.rateLimit * 2;
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

  async requestOHLCV(
    exchange: any,
    symbol: string,
    resolution: ResolutionType
  ): Promise<?TimedCandleData> {
    await this.requestLock(exchange);
    return;
    if (!confirm('fetch EXCHANGE DATA')) {
      return;
    }

    console.log(`[CryptoAPI] Exchange data fetched from ${exchange.id} at ${+moment()} with rateLimit ${
      exchange.rateLimit
    }`);
    const data = await exchange.fetchOHLCV(
      symbol,
      resolution.resolution(),
      resolution.since() ? resolution.since() : undefined
    );

    const candleData = {
      data,
      from: resolution.since() || Math.min(...data.map(([time]) => time)),
      to: +moment(),
      resolution: resolution.id(),
      expires: resolution.expires()
    };
    this.cacheOHLCVData(exchange.id, symbol, [candleData]);
    return candleData;
  }

  async loadOHLCV() {
    if (!this.loadedExchanges[0]) {
      await this.loadMarkets();
    }
    console.log(this.loadedExchanges[0]);
    return this.fetchOHLCV(this.loadedExchanges[0], 'BTC/USD');
  }

  async fetchOHLCV(exchange: any, symbol: string): Promise<?(OHLCVCandle[])> {
    const candleDataArr: ?((?TimedCandleData)[]) = this.getOHLCVDataFromStore(exchange.id, symbol);
    let allData: OHLCVCandle[] = [];
    const neededRezs: (?string)[] = this.neededResolutions.map(rez => rez.id());
    if (candleDataArr != null) {
      candleDataArr.forEach((timedCandleData, i) => {
        if (timedCandleData == null) {
          return;
        }
        if (+moment() > timedCandleData.expires) {
          // candle has expired
          candleDataArr[i] = null;
          return;
        }

        if (neededRezs.includes(timedCandleData.resolution)) {
          allData = [...allData, ...timedCandleData.data];
          neededRezs[neededRezs.indexOf(timedCandleData.resolution)] = null;
        }
      });
    }

    neededRezs.forEach(async (rezId: ?string) => {
      if (rezId == null) {
        return;
      }
      console.log(rezId, 'rez needed');
      const rez = Resolutions[rezId];
      if (rez == null) {
        throw TypeError('Needed resolution not in map!');
      }
      const data: ?TimedCandleData = await this.requestOHLCV(exchange, symbol, rez);
      if (data == null) {
        return;
      }
      allData = [...allData, ...data.data];
    });

    return allData;
  }

  async loadMarkets() {
    if (this.hasStartedLoadingMarkets) return;
    if (!confirm('load market')) return;
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
        console.error(
          `[CryptoAPI] Exchange load market failed: ${(exchange && exchange.name) || exchangeName}`,
          e
        );
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
