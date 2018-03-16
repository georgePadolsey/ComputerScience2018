//

export const CACHE_OHLCV_DATA = "CACHE_OHLCV_DATA";

export function cacheOHLCVData(exchangeId, symbol, timedCandleData) {
  return {
    type: CACHE_OHLCV_DATA,
    payload: {
      exchangeId,
      symbol,
      timedCandleData
    }
  };
}
