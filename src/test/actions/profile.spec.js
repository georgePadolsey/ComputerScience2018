import { spy } from 'sinon';
import { PROFILE_CREATOR_STAGES } from '../../app/_types/Profile';
import getProfileData from '../../app/utils/ProfileProvider.js';
import * as actions from '../../app/actions/profile';

jest.mock('../../app/utils/ProfileProvider.js', () => async () => ({ loadedProfileData: 'true' }));
jest.mock('electron-store');

describe('profileActions', () => {
  it('should create changeProfile action', () => {
    expect(actions.changeProfile('testUID')).toMatchSnapshot();
  });

  it('should create changeProfileName action', () => {
    expect(actions.changeProfileName('testUID', 'testName')).toMatchSnapshot();
  });

  it('should create setOfferedCreator action', () => {
    expect(actions.setOfferedCreator(true)).toMatchSnapshot();
    expect(actions.setOfferedCreator(false)).toMatchSnapshot();
  });

  it('should create setProfileCreatorStage action', () => {
    for (const profileCreatorStage of Object.values(PROFILE_CREATOR_STAGES)) {
      expect(actions.setProfileCreatorStage(profileCreatorStage)).toMatchSnapshot();
    }
  });

  it('should return an async - thunk loadProfileData action', async () => {
    const fn = actions.loadProfileData();
    expect(fn).toBeInstanceOf(Function);
    const dispatchSpy = spy();

    const res = await fn(dispatchSpy);

    expect(dispatchSpy.firstCall.args[0]).toEqual({
      type: actions.LOADED_PROFILE_DATA,
      payload: { loadedProfileData: 'true' }
    });
    expect(dispatchSpy.calledOnce).toBe(true);
  });
});
