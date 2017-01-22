import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOG_OUT_USER,
  LOGIN_USER,
  COMPANY_CHANGED,
  CREATE_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  company: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case COMPANY_CHANGED:
      return { ...state, company: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
      case CREATE_USER_SUCCESS:
        return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'auth error', password: '', loading: false };
    case LOG_OUT_USER:
      return {
        email: '',
        password: '',
        user: null,
        error: '',
        company: '',
        loading: false
      }
    default:
      return state;
  }
};
