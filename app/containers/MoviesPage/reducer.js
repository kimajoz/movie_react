/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  RECEIVE_API_DATA
} from './actions';

function moviesReducer(state = {}, { type, data }) {
  switch (action.type) {
    case RECEIVE_API_DATA:
      return data;
    default:
      return state;
  }
}

export default moviesReducer;
