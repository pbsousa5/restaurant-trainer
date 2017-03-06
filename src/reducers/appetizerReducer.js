import {
  LOAD_APPETIZERS,
  APPETIZERS_LOADED,
  SHOW_APPETIZERS,
  GLUTEN_FREE,
  APPS_EDIT_SWITCH,
  SHOW_APP_SELECT,
  APPS_REFRESH
} from '../actions/types'


const INITIAL_STATE = {
  companies: null,
  glutenFree: false,
  appetizers: null,
  appsEdit: false,
  hasLoaded: false,
  details: {
    name: null,
    ingredients: null,
    appnotes: null,
    category: null,
    image: "",
    allergies: null,
    key: null,
    gluten: false,
    hasLoaded: false,

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
    case SHOW_APP_SELECT:
      return{
        ...state,
        appsEdit: false,
        hasLoaded: true,
        details: {
          name: action.payload.name,
          ingredients: action.payload.ingredients,
          appnotes: action.payload.appnotes,
          category: action.payload.category,
          image: action.payload.image,
          allergies: action.payload.allergies,
          key: action.payload.key,
          gluten: action.payload.gluten  == "" ? false : action.payload.gluten,
          hasLoaded: true,
        }
      }
    case APPS_EDIT_SWITCH:
      return {...state, appsEdit: !state.appsEdit}
    case APPS_REFRESH:
      return {
        ...state,
        details: INITIAL_STATE.details
      }
    default:
      return state;
    }

}
