import {COMPANY_NAME_ADDED, COMPANY_CHANGED, CHECK_COMPANY, COMPANY_DOES_NOT_EXIST, COMPANY_EXISTS} from '../actions/types';

const INITIAL_STATE = {
    company: false,
    loading: true,
    companyID: null
};

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHECK_COMPANY:
            return {
              ...state,
              //company: action.payload.company,
              //companyID: action.payload.companyID
            };
        case COMPANY_DOES_NOT_EXIST:
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
        default:
            return state
    }
}
