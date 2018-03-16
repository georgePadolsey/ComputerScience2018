// @flow
/* eslint no-plusplus: ['error', { 'allowForLoopAfterthoughts': true }] */
import CCXT from 'ccxt';
import { forEach } from 'p-iteration';
import moment from 'moment';
import Store from 'electron-store';

import getStore from '../store/getStore';
import { CONFIG_KEY } from '../enc_keys';
import * as cryptoActions from '../actions/crypto';

import { Resolutions } from '../_types/Crypto';
import type { TimedCandleData, OHLCVCandle } from '../_types/Crypto';

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

  neededResolutions = [Resolutions.HOUR, Resolutions.DAY, Resolutions.MONTH];

  constructor(store) {
    this.store = store;
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

  cacheOHLCVData(exchangeId: string, symbol: string, timedCandleData: TimedCandleData[]) {
    reduxStore.dispatch(cryptoActions.cacheOHLCVData(exchangeId, symbol, timedCandleData));
  }

  async loadOHLCV(): Promise<?(OHLCVCandle[])> {
    const exchange = this.loadedExchanges[0];
    if (exchange == null) return;
    const symbol = 'BTC/USD';
    if (!confirm('load ohlcv')) return;

    let allData: OHLCVCandle[] = [];
    const datas: TimedCandleData[] = [];

    let resolution;
    for (let i = 0; i < this.neededResolutions.length; i++) {
      resolution = this.neededResolutions[i];
      console.log('test time', +new Date(), exchange.rateLimit);

      const data = await exchange.fetchOHLCV(
        symbol,
        resolution.resolution(),
        resolution.since() ? resolution.since() : undefined
      );

      allData = [...allData, ...data];
      datas.push({
        data,
        from: resolution.since() || Math.min(...data.map(([time]) => time)),
        to: +moment(),
        expires: resolution.expires(),
        resolution: resolution.id()
      });

      /**
       * We can happily/safetly use await in a loop here
       * as we want this loop to be blocking to prevent
       * over requesting the exchange.
       */
      // eslint-disable-next-line no-await-in-loop
      await sleep(exchange.rateLimit * 2);
    }

    this.cacheOHLCVData(exchange.id, symbol, datas);
    return allData;
  }

  async loadMarkets() {
    if (!confirm('load market')) return;
    await forEach(CCXT.exchanges, async exchangeName => {
      // internal exchange names
      let exchange;
      try {
        // Instanciate all public exchanges (ones without APIkey and etc.)
        if (exchangeName !== 'bitfinex2') {
          return;
        }
        exchange = new CCXT[exchangeName]();
        await this.loadExchange(exchange);
      } catch (e) {
        console.error(
          `[CryptoAPI] Exchange load market failed: ${(exchange && exchange.name) || exchangeName}`,
          e
        );
      }
      this.loadedExchanges.push(exchange);
    });

    Object.keys(this.currencyExchangeLookup).forEach(currencyName => {
      if (this.currencyExchangeLookup[currencyName].length < MIN_EXCHANGES_ALLOWED) {
        delete this.currencyExchangeLookup[currencyName];
      }
    });
  }

  async getConversion(origCurrency: string, quoteCurrency: string) {
    // forEach(this.loadedExchanges, async exchange => {
    //   exchange.markets;
    // });
  }
}(cryptoStore);
