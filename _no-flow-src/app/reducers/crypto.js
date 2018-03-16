//
import CryptoAPI from "../utils/CryptoAPI";
import { CACHE_OHLCV_DATA } from "../actions/crypto";

const defaultCryptoData = {};

export default function cryptoReducer(state = defaultCryptoData, action) {
  let ret = state;
  const saveData = () => {
    CryptoAPI.saveCryptoData(ret);
  };
  let candleData = {};
  let exchangeData = {};
  switch (action.type) {
    case CACHE_OHLCV_DATA:
      candleData = {};
      exchangeData = {};
      var arr = [];
      if (
        state.candleData &&
        state.candleData[action.payload.exchangeId] &&
        state.candleData[action.payload.exchangeId][action.payload.symbol]
      ) {
        arr =
          state.candleData[action.payload.exchangeId][action.payload.symbol];
      }
      exchangeData[action.payload.symbol] = [
        ...arr,
        ...action.payload.timedCandleData
      ];
      candleData[action.payload.exchangeId] = exchangeData;
      ret = Object.assign({}, state, { candleData });
      saveData();
      break;
    default:
      return state;
  }
  return ret;
}
