import {
  LOAD_SALADS,
  SALADS_LOADED,
  SHOW_SALADS,
  GLUTEN_FREE,
  SALAD_EDIT_SWITCH,
  SHOW_SALAD_SELECT,
  SALAD_REFRESH
} from '../actions/types'


const INITIAL_STATE = {
  companies: null,
  glutenFree: false,
  salads: null,
  saladEdit: false,
  hasLoaded: false,
  details: {
    name: null,
    ingredients: null,
    saladnotes: null,
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
    case LOAD_SALADS
:
      return {
        ...state,
      }
    case SALADS_LOADED:
      return {
        ...state,
        saladsLoaded: true,
        salads: action.payload
      }
    case GLUTEN_FREE:
    return {
        ...state,
        glutenFree: !state.glutenFree
      }
    case SHOW_SALADS:
      return {
        ...state,
      }
    case SHOW_SALAD_SELECT:
      return{
        ...state,
        saladEdit: false,
        hasLoaded: true,
        details: {
          name: action.payload.name,
          ingredients: action.payload.ingredients,
          saladnotes: action.payload.saladnotes,
          category: action.payload.category,
          image: action.payload.image,
          allergies: action.payload.allergies,
          key: action.payload.key,
          gluten: action.payload.gluten  == "" ? false : action.payload.gluten,
          hasLoaded: true,
        }
      }
    case SALAD_EDIT_SWITCH:
      return {...state, saladEdit: !state.saladEdit}
    case SALAD_REFRESH:
      return {
        ...state,
        details: INITIAL_STATE.details
      }
    default:
      return state;
    }

}
