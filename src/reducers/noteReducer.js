import {
  WINE_NOTE_REMOVE,
  WINE_NOTE_ADD,
  WINES_REFRESH
} from '../actions/types'

const INITIAL_STATE = {
  notes: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WINE_NOTE_ADD:
      // add notes items to our notes array
      return {...state, notes: insert(state.notes, action.id, action.payload)
        }
    case WINE_NOTE_REMOVE:
      return {...state,
        // removes notes items from the array by the note
        notes:  state.notes.filter(element => element !== action.payload)}
    case WINES_REFRESH:
      return {...state, notes: INITIAL_STATE.notes}
    default:
      return state;
  }
}
function addItem(item, index){
  return INITIAL_STATE.notes.push(item[index])
}

const insert = (arr, index, newItem) => {
  return [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index)
]}

const removeItem = (arr, index) => {
  return [
  ...arr.slice(0, index),
  ...arr.slice(index +1)
]}
