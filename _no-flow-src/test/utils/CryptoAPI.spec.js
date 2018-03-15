/* eslint-env jest */
// import CryptoAPI from '../../app/utils/CryptoAPI';
// import NodeEnvironment from 'jest-environment-node';

/**
 * @jest-environment node
 */
describe("CryptoAPI", () => {
  beforeAll(() => {
    global.fetch = require("fetch-ponyfill")().fetch;
    global.CryptoAPI = require("../../app/utils/CryptoAPI");
  });

  it("Should be able to load markets", async () => {
    // const cryptoAPI = new CryptoAPI();
    // await cryptoAPI.loadMarkets();
    // expect(cryptoAPI.loadedExchanges.length).toBeGreaterThan(0);
  });
});
