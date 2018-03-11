import CCXT from 'ccxt';
import { forEach } from 'p-iteration';

const MIN_EXCHANGES_ALLOWED = 3;

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

  async loadMarkets() {
    return;
    if (!confirm('load market')) return;
    await forEach(CCXT.exchanges, async exchangeName => {
      // internal exchange names
      let exchange;
      try {
        // Instanciate all public exchanges (ones without APIkey and etc.)
        if (exchangeName !== 'bittrex') {
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

    setTimeout(() => {
      console.log(this);
    }, 3000);
  }

  async getConversion(origCurrency, quoteCurrency) {
    forEach(this.loadedExchanges, async exchange => {
      exchange.markets;
    });
  }
}();
