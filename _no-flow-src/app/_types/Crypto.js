//
import moment from "moment";

export const Resolutions = {
  HOUR: {
    id() {
      return "HOUR";
    },
    since() {
      return +moment().subtract("1", "day");
    },
    resolution() {
      return "1h";
    },
    expires() {
      return +moment()
        .minute(0)
        .add(1, "hour");
    }
  },
  DAY: {
    id() {
      return "DAY";
    },
    since() {
      return +moment().subtract("1", "month");
    },
    resolution() {
      return "1d";
    },
    expires() {
      return +moment()
        .hour(0)
        .add(1, "day");
    }
  },
  MONTH: {
    id() {
      return "MONTH";
    },
    since() {
      return null;
    },
    resolution() {
      return "1M";
    },
    expires() {
      return +moment()
        .date(1)
        .add(1, "month");
    }
  }
};
