//@flow


type actionType = {
    +type: string
}

export const LOAD_PROFILE = "LOAD_PROFILE";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

export function loadProfile() {
    return {
        type: LOAD_PROFILE
    }
}

export function updateProfile() {
    return {
        type: UPDATE_PROFILE
    }
}