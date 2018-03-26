// Action Type [Constant]
const SET_NAME = 'SET_NAME';

/**
 * Action Creator to set name of person
 * @param {string} name the name of the person
 * @see https://redux.js.org/basics/actions
 */
function setName(name) {
	return {
		type: SET_NAME,
		payload: name
	}
}

// Usage
store.dispatch(setName('George'));