// @flow
import * as actions from '../../app/actions/crypto';
import { Resolutions } from '../../app/_types/Crypto';

describe('Crypto actions', () => {
  it('should be able to make cache OHLCV data action', () => {
    expect(actions.cacheOHLCVData('fakeId', 'USD/BTC', [
      {
        data: [[5, 5, 5, 5, 5, 5]],
        from: 0,
        to: 5,
        expires: 6,
        resolution: Resolutions.HOUR.id()
      },
      {
        data: [[6, 6, 6, 6, 6, 6]],
        from: 0,
        to: 5,
        expires: 6,
        resolution: Resolutions.DAY.id()
      }
    ])).toMatchSnapshot();
  });
});
