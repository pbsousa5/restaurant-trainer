import firebase from 'firebase';
import {
  USER_IS_LOGGED_IN,
  USER_IS_NOT_LOGGED_IN
} from './types';

export const startAuthListener = function () {

 //this listener will update state upon changes of auth status.
 return (dispatch, getState)=> {   //using a redux-thunk instead of normal action
   firebase.auth().onAuthStateChanged(function (user) {
     if (user) {
         // User is signed in, dispatch action
        dispatch({type: USER_IS_LOGGED_IN, payload: user})
     }else {
       dispatch({type: USER_IS_NOT_LOGGED_IN})
     }
 });
 }
}
