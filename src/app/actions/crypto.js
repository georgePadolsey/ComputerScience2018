// @flow
import type { TimedCandleData } from '../_types/Crypto';

export const CACHE_OHLCV_DATA = 'CACHE_OHLCV_DATA';

export function cacheOHLCVData(
  exchangeId: string,
  symbol: string,
  timedCandleData: TimedCandleData[]
) {
  return {
    type: CACHE_OHLCV_DATA,
    payload: {
      exchangeId,
      symbol,
      timedCandleData
    }
  };
}
