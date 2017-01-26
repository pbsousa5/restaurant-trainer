

import {
  LOAD_APPETIZERS,
  APPETIZERS_LOADED,
  SHOW_APPETIZERS,
  GLUTEN_FREE
} from '../actions/types'


const INITIAL_STATE = {
  companies: null,
  glutenFree: false,
  appetizers: null,
  details: {
    name: null,
    type: null,
    description: null,
    image: "",
    link: null,
    key: null,

  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_APPETIZERS:
      return {
        ...state,

      }
    case APPETIZERS_LOADED:
      return {
        ...state,
        appetizersLoaded: true,
        appetizers: action.payload
      }
    case GLUTEN_FREE:
      return {
        ...state,
        glutenFree: !state.glutenFree
      }
    case SHOW_APPETIZERS:
      return {
        ...state,

      }
    default:
      return state;
    }

}
