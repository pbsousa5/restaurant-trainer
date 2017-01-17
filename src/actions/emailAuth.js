import firebase from 'firebase';
import FireAuth from 'react-native-firebase-auth';
import LocalStore from 'react-native-simple-store';
import { databaseRef } from '../configs/firebase'
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOG_OUT_USER,
  COMPANY_CHANGED,
  CREATE_USER_SUCCESS
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};
export const companyChanged = (text) => {
  console.log("COMPANY_CHANGED");
  return {
    type: COMPANY_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};
export const logOutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOG_OUT_USER });
    firebase.auth().signOut();
  }
}
export const loginUser = ( email, password, firstName, lastName ) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
  //  FireAuth.register(email, password, {firstName, lastName});

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log('email ' + email);
        console.log('password ' + password);
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => createUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
      });
      var fullName = firstName + " " + lastName
      firebase.auth().onAuthStateChanged(function(authData) {
        if(authData) {
          var profileRef = firebase.database().ref(`users/${authData.uid}`);
          profileRef.update({
            email: authData.email,
            name: fullName
          });
          LocalStore.get('localID').then(localID => {
              if (!localID) {
                  console.log('houston we have a problem!');
              }
              else{
                // add a currentID of this company
                // this can be used later for admins under
                // multiple company's
                profileRef.update({
                  currentID: localID.value
                });
                // add company to users profile for relationship
                profileRef.child(`companies/${localID.value}`).update({
                  admin: true
                })
              }
            })

        }
      })

  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};
const createUserSuccess = (dispatch, user) => {
  console.log("CREATED A NEW USER ADD ME TO DB: " + user);
  dispatch({
    type: CREATE_USER_SUCCESS,
    payload: user
  });
};