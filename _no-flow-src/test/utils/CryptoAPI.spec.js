//

jest.mock("electron-store");

/**
 * @jest-environment node
 */
describe("CryptoAPI", () => {
  function setup() {
    global.fetch = require("fetch-ponyfill")().fetch;
    const CryptoAPI = require("../../app/utils/CryptoAPI");
    return { CryptoAPI };
  }

  it("should exist", () => {
    const { CryptoAPI } = setup();
    expect(CryptoAPI).toBeDefined();
  });

  // it('Should be able to load markets', async () => {
  //   // const cryptoAPI = new CryptoAPI();
  //   // await cryptoAPI.loadMarkets();
  //   // expect(cryptoAPI.loadedExchanges.length).toBeGreaterThan(0);
  // });
});
