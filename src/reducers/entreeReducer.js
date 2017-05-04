import {
  LOAD_ENTREES,
  ENTREES_LOADED,
  SHOW_ENTREES,
  GLUTEN_FREE,
  ENT_EDIT_SWITCH,
  SHOW_ENT_SELECT,
  ENT_REFRESH
} from '../actions/types'


const INITIAL_STATE = {
  companies: null,
  glutenFree: false,
  entrees: null,
  entEdit: false,
  hasLoaded: false,
  details: {
    name: null,
    ingredients: null,
    entnotes: null,
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
    case LOAD_ENTREES:
      return {
        ...state,
      }
    case ENTREES_LOADED:
      return {
        ...state,
        entreesLoaded: true,
        entrees: action.payload
      }
    case GLUTEN_FREE:
    return {
        ...state,
        glutenFree: !state.glutenFree
      }
    case SHOW_ENTREES:
      return {
        ...state,
      }
    case SHOW_ENT_SELECT:
      return{
        ...state,
        entEdit: false,
        hasLoaded: true,
        details: {
          name: action.payload.name,
          ingredients: action.payload.ingredients,
          entnotes: action.payload.entnotes,
          category: action.payload.category,
          image: action.payload.image,
          allergies: action.payload.allergies,
          key: action.payload.key,
          gluten: action.payload.gluten  == "" ? false : action.payload.gluten,
          hasLoaded: true,
        }
      }
    case ENT_EDIT_SWITCH:
      return {...state, entEdit: !state.entEdit}
    case ENT_REFRESH:
      return {
        ...state,
        details: INITIAL_STATE.details
      }
    default:
      return state;
    }

}
