import CCXT from 'ccxt';
import { forEach } from 'p-iteration';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export default class CryptoAPI {
  loadedExchanges = [];

  async loadMarkets() {
    forEach(CCXT.exchanges, async exchange => {
      try {
        await exchange.loadMarkets();
      } catch (e) {
        console.error(`[CryptoAPI] Exchange load market failed: ${exchange.name}`);
      }
      this.loadedExchanges.push(exchange);
    });
  }
}
