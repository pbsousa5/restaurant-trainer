import {
  WINE_BOTTLE_DATA,
  HIDE_MODAL,
  HIDE_MODAL_REFRESH
} from '../actions/types';

const INITIAL_STATE = {
  modalType: null,
  bottle: {},
  toggle: false,
  addfields: false
}

export default function modal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case WINE_BOTTLE_DATA:
      return {
        modalType: action.modalType,
        bottle: action.payload.wines[0],
        toggle: !state.toggle
      }
    case HIDE_MODAL:
      return INITIAL_STATE
    case HIDE_MODAL_REFRESH:
    //TODO add flag for wine notes
      return INITIAL_STATE
    default:
      return state
  }
}

/* .... */
