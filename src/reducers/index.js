import {combineReducers} from 'redux'
//import navReducer from './navReducer'
import items from './items'
import emailReducer from './emailReducer'
import loggedReducer from './loggedReducer'
import companyReducer from './companyReducer'
import wineEdit from './wineReducer'
import wineNotes from './noteReducer'
import modal from './modalReducer'
import image from './imageReducer'
import admin from './adminReducer'
import navRouter from './NavRouterReducer'
import appetizer from './appetizerReducer'
import { reducer as forms } from 'redux-form'
import { AppNavigator } from '../navigators/AppNavigator'
import { NavigationActions } from 'react-navigation'

const initialNavState = {
  index: 0,
  routes:[
    {key:'InitA', routeName:'Loading'}
  ],
}

function nav(state = initialNavState, action){
  console.log('action.type* ',action.type);
  //console.log('action* ',action);
  switch(action.type){
    case 'CONNECTION_OFFLINE':
      return AppNavigator.router.getStateForAction(action, state)
    case 'user_is_logged_in':
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Home'}), state)
    case 'SHOW_WINE_SELECT':
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'ViewWine'}), state)
    case 'SHOW_APP_SELECT':
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'ViewApp'}), state)
    case 'user_is_not_logged_in':
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'LoginStart'}), state)
    case "LOGIN_EMAIL":
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'EmailLogin'}), state)
    case 'NAV_BACK':
      return AppNavigator.router.getStateForAction(NavigationActions.back(), state)
    default:
      return AppNavigator.router.getStateForAction(action, state)
  }
}

function auth(state = initialAuthState, action){
  switch(action.type){
    case 'Login':
      return{...state, isLoggedIn: true}
    case 'Logout':
      return {...state, isLoggedIn: false}
    default:
      return state
  }

}
const initialLoggedState = {isLoggedIn: false}
const reducer = combineReducers({
  form: forms,
  nav,
  auth,
  navRouter,
  items,
  appetizer: appetizer,
  admin: admin,
  image: image,
  auth: emailReducer,
  userLogged: loggedReducer,
  myCompany: companyReducer,
  wines: wineEdit,
  notes: wineNotes,
  modal: modal
})

export default reducer
