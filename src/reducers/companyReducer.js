import {
  COMPANY_NAME_ADDED,
  COMPANY_CHANGED,
  CHECK_COMPANY,
  COMPANY_DID_NOT_EXIST,
  COMPANY_EXISTS,
  DELETE_COMPANY,
  CHECK_COMPANY_NAME
  } from '../actions/types';

const INITIAL_STATE = {
    company: false,
    loading: true,
    companyID: null,
    localName: false
};

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMPANY_NAME_ADDED:
            return {
              ...state,
              company: action.payload.company,
              companyID: action.payload.companyID,
              localName: action.payload.localName
            };
        case COMPANY_DID_NOT_EXIST:
            return {
              ...state,
              company: action.payload.company,
              companyID: action.payload.companyID
            }
        case COMPANY_EXISTS:
          return {
            ...state,
            company: action.payload.company,
            companyID: action.payload.companyID
          };
        case DELETE_COMPANY:
          return {
            company: false,
            loading: true,
            companyID: null,
            localName: false
          }
        case CHECK_COMPANY_NAME:
        console.log('LOCAL NAME: ', action.payload);
          return{
            ...state,
            localName: action.payload
          }
        default:
            return state
    }
}
