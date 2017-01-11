import {
  WINE_NOTE_ADD,
  WINE_NOTE_REMOVE
} from './types'


export function wineNoteAdd(note, id) {
  return {
  	type: WINE_NOTE_ADD,
  	payload: note,
    id: id
  }
}

export function wineNoteRemove(note, id) {
	return {
		type: WINE_NOTE_REMOVE,
		payload: note,
    id: id
	}
}
