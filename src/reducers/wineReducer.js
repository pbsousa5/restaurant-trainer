import {
  WINE_UPDATE,
  WINE_CREATE,
  WINE_SAVE_SUCCESS,
  REQ_DATA,
  WINE_SEARCH_RESULTS,
  TOGGLE_MODAL,
  WINES_LOADED,
  WINES_REQUESTED,
  WINES_REJECTED,
  WINES_REFRESH,
  WINE_BOTTLE_DATA,
  WINE_NOTE_REMOVE,
  WINE_NOTE_ADD,
  HIDE_MODAL,
  HIDE_MODAL_REFRESH
} from '../actions/types';



const INITIAL_STATE = {
  name: '',
  description: '',
  type: '',
  search: '',
  results: null,
  loaded: false,
  toggle: false,
  wines: null,
  bottle: {},
  notes: null,
  details: {
    name: null,
    region: null,
    varietal: null,
    winenotes:null,
    image: "",
    producer: null,
    code: null,
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WINE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case WINE_CREATE:
      return state;
    case WINE_SAVE_SUCCESS:
      return state;
    case REQ_DATA:
      return state
    case WINE_SEARCH_RESULTS:
      return {...state, results: action.payload, loaded: true}//dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
    case TOGGLE_MODAL:
      return {...state, toggle: !state.toggle, notes: null }
    case WINES_LOADED:
      return {...state, wines: action.payload}
    case WINES_REJECTED:
      return state
    case WINES_REQUESTED:
      return state
    case WINES_REFRESH:
      return {...state, loaded: false}
    case HIDE_MODAL_REFRESH:
      return {...state, loaded: false, details: {
          name: action.payload.name,
          region: action.payload.region,
          varietal: action.payload.varietal,
          winenotes:action.notes,
          image: action.payload.image,
          producer: action.payload.winery,
          code: action.payload.code
        }
      }
    case 'TEST_WINE_UPDATE':
      return {...state, details: updateDetails(action.payload.prop, action.payload.value)}
    default:
      return state;
  }
}

const updateDetails = ({ prop, value }) =>{
  switch(prop){
    case "name":
      return {
          name: value,
          region: INITIAL_STATE.details.region,
          varietal: INITIAL_STATE.details.varietal,
          winenotes: INITIAL_STATE.details.notes,
          image: INITIAL_STATE.details.image,
          producer: INITIAL_STATE.details.winery,
          code: INITIAL_STATE.details.code
        }
    default:
      return ""
  }
}
