import {
  USER_IS_LOGGED_IN,
  LOG_OUT_USER,
  USER_IS_NOT_LOGGED_IN
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  LoggedIn: false,
  hasResponded: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_IS_LOGGED_IN:
      return {
        ...state,
        user: action.payload,
        LoggedIn: true,
        hasResponded: true
      }
    case USER_IS_NOT_LOGGED_IN:
      return {
        ...state,
        LoggedIn: false,
        hasResponded: true
      }
    case LOG_OUT_USER:
      return Object.assign({}, state, {
            LoggedIn: false
          })
    default:
      return state;
    }

  }
