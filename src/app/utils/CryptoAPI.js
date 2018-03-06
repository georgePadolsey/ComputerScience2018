import CCXT from 'ccxt';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export default class CryptoAPI {
  static async run() {
    // for (const exc of CCXT.exchanges) {
    //   const exchange = new CCXT[exc]();
    //   if (exchange.has.fetchOHLCV) {
    //     for (const symbol in exchange.markets) {
    //       await sleep(exchange.rateLimit); // milliseconds
    //       // console.log(await exchange.fetchOHLCV(symbol, '1m')); // one minute
    //     }
    // }
    // }
  }
}
