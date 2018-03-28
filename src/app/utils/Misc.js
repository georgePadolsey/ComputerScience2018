// @flow
/* eslint-disable no-plusplus, import/prefer-default-export */
const prefixes = ['k', 'M', 'G', 'T', 'E', 'P'];

// Modified from https://stackoverflow.com/questions/17633462/format-a-javascript-number-with-a-metric-prefix-like-1-5k-1m-1g-etc
export function formatNumber(n: number): string {
  for (let i = 0; i < prefixes.length; i++) {
    const div = 10 ** ((i + 1) * 3);
    if (n >= div) {
      return String(n / div) + prefixes[i];
    }
  }
  return String(n);
}
