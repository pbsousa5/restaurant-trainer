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
  WINE_NOTE_ADD
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
  bottle: null,
  notes: null
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
    case WINE_BOTTLE_DATA:
      return {...state, toggle: !state.toggle, bottle: action.payload.wines[0]}
    /*case WINE_NOTE_ADD:
      return {...state, notes: action.payload}
    case WINE_NOTE_REMOVE:
      return {...state, notes: action.payload}*/
    default:
      return state;
  }
};
