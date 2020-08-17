import { combineReducers } from 'redux';
import myAccount from './myAccount';

/**
 * If any new reducers are added, combine them below
 * so the rest of the application can access them.
 */
export default combineReducers({
  myAccount,
});
