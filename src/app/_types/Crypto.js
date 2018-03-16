// @flow
import moment from 'moment';

export type ResolutionTypes = {
  [string]: {
    since: () => ?number,
    resolution: () => string,
    id: () => string,
    expires: () => number
  }
};

export const Resolutions: ResolutionTypes = {
  HOUR: {
    id() {
      return 'HOUR';
    },
    since() {
      return +moment().subtract('1', 'day');
    },
    resolution() {
      return '1h';
    },
    expires() {
      return +moment()
        .minute(0)
        .add(1, 'hour');
    }
  },
  DAY: {
    id() {
      return 'DAY';
    },
    since() {
      return +moment().subtract('1', 'month');
    },
    resolution() {
      return '1d';
    },
    expires() {
      return +moment()
        .hour(0)
        .add(1, 'day');
    }
  },
  MONTH: {
    id() {
      return 'MONTH';
    },
    since() {
      return null;
    },
    resolution() {
      return '1M';
    },
    expires() {
      return +moment()
        .date(1)
        .add(1, 'month');
    }
  }
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
