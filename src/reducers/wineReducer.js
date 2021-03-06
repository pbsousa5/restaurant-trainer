import {
  WINE_UPDATE,
  WINE_CREATE,
  WINE_SAVE_SUCCESS,
  REQ_DATA,
  LOADING_MODAL_DATA,
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
  HIDE_MODAL_REFRESH,
  BY_THE_GLASS,
  SHOW_WINE_SELECT,
  WINE_EDIT_SWITCH,
  WINE_SEARCHING,
  JUMP_TO,
  STOP_LOADING,
} from '../actions/types';
import merge from 'lodash/merge'


const INITIAL_STATE = {
  name: '',
  description: '',
  type: '',
  search: '',
  results: null,
  searching: false,
  loaded: false,
  wineListLoaded: false,
  loadingModal: false,
  wineEdit: false,
  toggle: false,
  wines: null,
  bottle: {},
  notes: null,
  //glass: false,
  hasLoaded: false,
  showHelp: true,
  clearWineEdit: false,
  details: {
    name: null,
    region: null,
    varietal: null,
    winenotes:null,
    image: "",
    vintage: null,
    producer: null,
    code: null,
    link: null,
    key: null,
    glass: false
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
    case WINE_SEARCHING:
      return {...state, searching: !state.searching}
    case WINE_EDIT_SWITCH:
      return {...state, wineEdit: !state.wineEdit}
    case BY_THE_GLASS:
    // TODO figure out a better way to handle nested states
    // possibly using lodash merge
      return {...state, details: {
        name: state.details.name,
        region: state.details.region,
        varietal: state.details.varietal,
        winenotes:state.details.winenotes,
        image: state.details.image,
        vintage: state.details.vintage,
        producer: state.details.producer,
        code: state.details.code,
        link: state.details.link,
        key: state.details.key,
        glass: !state.details.glass
      }
    }

    case LOADING_MODAL_DATA:
      return {...state, loadingModal: !state.loadingModal}
    case WINE_BOTTLE_DATA:
      return {...state, loadingModal: !state.loadingModal}
    case WINE_SEARCH_RESULTS:
      return {...state, results: action.payload, loaded: true, searching: !state.searching}//dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
    case TOGGLE_MODAL:
      return {...state, toggle: !state.toggle, notes: null }
    case WINES_LOADED:
      return {...state, wines: action.payload, wineListLoaded: true}
    case WINES_REJECTED:
      return state
    case WINES_REQUESTED:
      return state
    case WINES_REFRESH:
      return {...state,
        loaded: false,
        showHelp: true,
        notes: INITIAL_STATE.notes,
        details: INITIAL_STATE.details}
    case SHOW_WINE_SELECT:
      return {...state, wineEdit: false, hasLoaded: true, showHelp: false,details: {
          glass: action.payload.glass,
          name: action.payload.name,
          vintage: action.payload.vintage,
          region: action.payload.region,
          varietal: action.payload.varietal,
          winenotes:action.payload.winenotes,
          image: action.payload.image,
          producer: action.payload.winery,
          code: action.payload.code,
          link: action.payload.link,
          key: action.payload.key,
        }
      }
    case STOP_LOADING:
      return{...state, hasLoaded: false}
    case HIDE_MODAL_REFRESH:
      return {...state, loaded: false, hasLoaded: true, showHelp: false, details: {
          name: action.payload.name,
          vintage: action.payload.vintage,
          region: action.payload.region,
          varietal: action.payload.varietal,
          winenotes:action.notes,
          image: action.payload.image,
          producer: action.payload.winery,
          code: action.payload.code,
          link: action.payload.link
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
        }
    default:
      return ""
  }
}
