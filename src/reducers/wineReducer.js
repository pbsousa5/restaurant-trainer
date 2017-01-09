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
  WINES_REFRESH
} from '../actions/types';

import { ListView } from 'react-native'

const INITIAL_STATE = {
  name: '',
  description: '',
  type: '',
  search: '',
  results: null,
  loaded: false,
  toggle: false,
  wines: null
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
      return {...state, toggle: !state.toggle }
    case WINES_LOADED:
      return {...state, wines: action.payload}
    case WINES_REJECTED:
      return state
    case WINES_REQUESTED:
      return state
    case WINES_REFRESH:
      return {...state, loaded: false}
    default:
      return state;
  }
};
