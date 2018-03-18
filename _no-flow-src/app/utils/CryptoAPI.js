//
/* eslint no-plusplus: ['error', { 'allowForLoopAfterthoughts': true }] */
import CCXT from "ccxt";
import { forEach } from "p-iteration";
import moment from "moment";
import Store from "electron-store";

import getStore from "../store/getStore";
import { CONFIG_KEY } from "../enc_keys";
import * as cryptoActions from "../actions/crypto";

import { Resolutions } from "../_types/Crypto";

const reduxStore = getStore();

const cryptoStore = new Store({
  name: "cryptoData",
  defaults: {},
  /**
   * Only encrypt the cryptoData store when in production
   * This is to prevent users manually editing the file
   * @see https://github.com/sindresorhus/electron-store
   */
  encryptionKey: process.env.NODE_ENV === "production" ? CONFIG_KEY : undefined
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
  store = null;

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
      } else if (
        !this.currencyExchangeLookup[currencyName].includes(exchange)
      ) {
        this.currencyExchangeLookup[currencyName].push(exchange);
      }
      this.loadedCurrencies[currencyName] = exchange.currencies[currencyName];
    });
  }

  cacheOHLCVData(exchangeId, symbol, timedCandleData) {
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

    this.store.store = Object.assign({}, oS, { candleData });
    return timedCandleData;
  }

  getOHLCVDataFromStore(exchangeId, symbol) {
    const oS = this.store.store;
    console.log(oS);
    if (
      oS &&
      oS.candleData &&
      oS.candleData[exchangeId] &&
      oS.candleData[exchangeId][symbol]
    ) {
      return oS.candleData[exchangeId][symbol];
    }
    console.log("no return");
  }

  async requestOHLCV(exchange, symbol, resolution) {
    while (+moment() - this.lastUsed[exchange.id] < exchange.rateLimit * 2) {
      /**
       * We can happily/safetly use await in a loop here
       * as we want this loop to be blocking to prevent
       * over requesting the exchange.
       */
      // eslint-disable-next-line no-await-in-loop
      await sleep(exchange.rateLimit);
    }
    this.lastUsed[exchange.id] = +moment();
    if (!confirm("fetch EXCHANGE DATA")) {
      return;
    }
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
      if (!this.hasStartedLoadingMarkets) {
        await this.loadMarkets();
      } else {
        throw Error("no loaded exch");
      }
    }

    return this.fetchOHLCV(this.loadedExchanges[0], "BTC/USD");
  }

  async fetchOHLCV(exchange, symbol) {
    const candleDataArr = this.getOHLCVDataFromStore(exchange.id, symbol);
    let allData = [];
    const neededRezs = this.neededResolutions.map(rez => rez.id());
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

    neededRezs.forEach(async rezId => {
      if (rezId == null) {
        return;
      }
      console.log(rezId, "rez needed");
      const rez = Resolutions[rezId];
      if (rez == null) {
        throw TypeError("Needed resolution not in map!");
      }
      const data = await this.requestOHLCV(exchange, symbol, rez);
      if (data == null) {
        return;
      }
      allData = [...allData, ...data.data];
    });

    return allData;
  }

  async loadMarkets() {
    if (!confirm("load market")) return;
    this.hasStartedLoadingMarkets = true;

    await forEach(CCXT.exchanges, async exchangeName => {
      // internal exchange names
      let exchange;
      try {
        // Instanciate all public exchanges (ones without APIkey and etc.)
        if (exchangeName !== "bitfinex2") {
          return;
        }
        exchange = new CCXT[exchangeName]();
        await this.loadExchange(exchange);
      } catch (e) {
        console.error(
          `[CryptoAPI] Exchange load market failed: ${(exchange &&
            exchange.name) ||
            exchangeName}`,
          e
        );
      }
      this.loadedExchanges.push(exchange);
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
