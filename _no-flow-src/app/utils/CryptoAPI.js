//      
/* eslint no-plusplus: ['error', { 'allowForLoopAfterthoughts': true }] */
import CCXT from 'ccxt';
import { forEach } from 'p-iteration';
import moment from 'moment';
import Store from 'electron-store';

import { store } from '../index';
import { CONFIG_KEY } from '../enc_keys';

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

                    
                                                   
                                
                                   
                                  
                                   
                                                           
  

                        
             
                         
                             
                     
                         
   
  

const Resolutions                  = {
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

  async _loadExchange(exchange) {
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
  cacheOHLCVData(exchangeId        , symbol        , timedCandleData                   ) {
    const data = {
      lastUpdated: +moment(),
      timedCandleData
    };
    cryptoStore.set(`${exchangeId}.${symbol}`, data);
  }

  async loadOHLCV()                            {
    console.log(this.loadedExchanges);
    const exchange = this.loadedExchanges[0];
    if (exchange == null) return;
    const symbol = 'BTC/USD';
    if (!confirm('load ohlcv')) return;

    let allData                = [];
    const datas                    = [];

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

      await sleep(exchange.rateLimit * 2);
    }

    this.cacheOHLCVData(exchange.id, symbol, datas);
    return allData;
  }

  async loadMarkets() {
    return;
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
        await this._loadExchange(exchange);
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

  async getConversion(origCurrency        , quoteCurrency        ) {
    forEach(this.loadedExchanges, async exchange => {
      exchange.markets;
    });
  }
}();
