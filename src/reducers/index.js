import {combineReducers} from 'redux'
import navReducer from './navReducer'
import items from './items'
import emailReducer from './emailReducer'
import loggedReducer from './loggedReducer'
import companyReducer from './companyReducer'
import wineEdit from './wineReducer'
import wineNotes from './noteReducer'
import modal from './modalReducer'
import { reducer as formReducer } from 'redux-form';

const reducer = combineReducers({
  form: formReducer,
  navReducer,
  items,
  auth: emailReducer,
  userLogged: loggedReducer,
  myCompany: companyReducer,
  wines: wineEdit,
  notes: wineNotes,
  modal: modal
})

export default reducer
