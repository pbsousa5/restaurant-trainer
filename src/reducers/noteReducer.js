import {
  WINE_NOTE_REMOVE,
  WINE_NOTE_ADD
} from '../actions/types'

const INITIAL_STATE = {
  id: null,
  notes: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WINE_NOTE_ADD:
      return {notes: addItem(action.payload, action.id)}
    case WINE_NOTE_REMOVE:
      return {notes: removeItem(action.id)}
    default:
      return state;
  }
}
function addItem(item, index){
  INITIAL_STATE.notes.push(item[index])
}
function removeItem(index){
  INITIAL_STATE.notes.splice(index,1);
  return notes
}
