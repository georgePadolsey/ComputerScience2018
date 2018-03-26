// @flow

export type OHLCVCandle = [
  number, // UTC timestamp in milliseconds, integer
  number, // (O)pen price, float
  number, // (H)ighest price, float
  number, // (L)owest price, float
  number, // (C)losing price, float
  number // (V)olume (in terms of the base currency), float
];

export type TimedCandleData = {
  data: OHLCVCandle[],
  lastUpdated: number,
  timeframe: string
};

export type CryptoState = { +loadedExchanges: string[] };
