import {
  ADD_IMAGE,
  UPLOADED_IMAGE
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
    default:
      return state
  }
}
