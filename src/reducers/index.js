import {combineReducers} from 'redux'
import navReducer from './navReducer'
import items from './items'
import emailReducer from './emailReducer'
import loggedReducer from './loggedReducer'
import companyReducer from './companyReducer'
import wineEdit from './wineReducer'
import wineNotes from './noteReducer'
const rootReducer = combineReducers({
  navReducer,
  items,
  auth: emailReducer,
  userLogged: loggedReducer,
  myCompany: companyReducer,
  wines: wineEdit,
  notes: wineNotes
})

export default rootReducer
