import {
  IS_ADMIN,
  LOAD_COMPANIES,
  LOAD_COMPANY_DATA,
  CURRENT_ADMIN
} from '../actions/types'

const INITIAL_STATE = {
  companies: null,
  companyData: {
    name: null,
    image: null,
    address: null,
  },
  isAdmin: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_COMPANIES:
      return {
        ...state,
        companies: {
          name: action.payload.id,
          image: action.payload.image,
          address: action.payload.address,
        }
      }
    case LOAD_COMPANY_DATA:
      return {
        ...state,
        companyData: action.payload
      }
    case CURRENT_ADMIN:
      return{
        ...state,
        isAdmin: action.payload.admin
      }
    default:
      return state;
    }

}
