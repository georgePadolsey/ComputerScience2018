// Action Type [Constant]
const SET_NAME = 'SET_NAME';

/**
 * Default state before any actions have taken place.
 * It is set automatically through es6 default args.
 */
const defaultState = {
  name: 'Bob'
}

/**
 * Pure function which returns a new state as needed
 * given the action and current state provided
 * @param {Object} state the current state
 * @param {Object} action the action provided
 */
function reducer(state = defaultState, action) {
  switch(action.type) {
    case SET_NAME:
      return {...state, name: action.payload }
    default:
      return state;
  }
}

// Before
store.getState().name; // -> Bob

// Usage
store.dispatch(setName('George'));

// After a store's cycle
store.getState().name; // -> George