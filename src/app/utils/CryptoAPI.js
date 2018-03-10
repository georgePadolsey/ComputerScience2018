import CCXT from 'ccxt';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export default class CryptoAPI {
  static async run() {
    for (const exc of CCXT.exchanges) {
      const exchange = new CCXT[exc]();
      console.log(await exchange.loadMarkets());
    }
  }
}
