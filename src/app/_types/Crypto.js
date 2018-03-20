// @flow
import { Resolutions } from "../utils/CryptoAPI";

export type ResolutionType = {
  since: () => ?number,
  resolution: () => string,
  id: () => string,
  expires: () => number
};

export type ResolutionTypes = {
  [string]: ResolutionType
};

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
  from: number,
  to: number,
  expires: number,
  resolution: $Keys<typeof Resolutions>
};

export type CryptoState = {| +loadedExchanges: string[] |};
