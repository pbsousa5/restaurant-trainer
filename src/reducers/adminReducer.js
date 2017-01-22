import {
  IS_ADMIN
} from '../actions/types'

const INITIAL_STATE = {
  companies: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_ADMIN:
      return {
        ...state,
        companies: action.payload.companies
      }
    default:
      return state;
    }

}
