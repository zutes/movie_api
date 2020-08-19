import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES } from '../actions/actions';

//You first have two functions (called reducers): visibilityFilter and movies,
//each reducer takes a state and an action, and if it’s concerned by the action, it changes the state.
//Note that reducers are pure functions; they depend on nothing except their parameters,
//and they don't change anything. When concerned by the action, reducers simply return a new value.
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

//The moviesApp is a combined reducer (a reducer made out of other reducers).
//In order to keep the code clean, it splits into two smaller reducers.
//This pattern is so common that Redux comes with a built-in function to implement it: combineReducers.
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
});

export default moviesApp;
