import {
  ADD_IMAGE,
  UPLOADED_IMAGE,
  RESET_IMAGE,
  WINES_LOADED
} from '../actions/types';

const INITIAL_STATE = {
  image: null,
  imageAdded: false,
  uploadedImage: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return {
        ...state,
        image: action.source,
        imageAdded: true,
      }
    case UPLOADED_IMAGE:
      return {
        ...state,
        uploadedImage: action.payload
      }
    case WINES_LOADED:
    // resetting image state when wines page loads
    // TODO find a better way to reset this state 
      return {
        ...state,
        image: null,
        imageAdded: false,
        uploadedImage: null,
      }
    default:
      return state
  }
}
