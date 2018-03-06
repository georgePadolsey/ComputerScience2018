//@flow

import {UPDATE_PROFILE, LOAD_PROFILE} from '../actions/profile';


var defaultProfile = {isReal: false, displayName: 'George'}
export default function profileReducer(state, {type}: actionType) {
    // console.log(state);
    if(type === UPDATE_PROFILE) {
        // return {}
    }
    return state || defaultProfile;
}