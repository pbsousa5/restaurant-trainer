import React from 'react'
import { Alert } from 'react-native'
import {
  winesRef,
  companyRef,
  databaseRef,
  usersRef,
  GetLocalRef
} from '../configs/firebase'
import LocalStore from 'react-native-simple-store'
import firebase from 'firebase'
import {
  LOAD_APPETIZERS,
  APPETIZERS_LOADED,
  SHOW_APPETIZERS,
  APPS_REQUESTED,
  CREATING_APPETIZER,
  CREATE_APPETIZER_SUCCESS,
  GLUTEN_FREE,
  POP_ROUTE,
  SHOW_APP_SELECT
} from './types'

function getAppsFulfilledAction  (apps){
  console.log('apps ' , apps);
  return{
    type: APPETIZERS_LOADED,
    payload: apps
  }
}
//Load appetizers from firebase
export function loadAppetizers (currentLocalID) {
  return function (dispatch) {
    dispatch(getAppsRequestedAction())
    const appsRef = companyRef.child(`${currentLocalID}`).child('appetizers')
    console.log('appsRef ',appsRef.toString());
    return appsRef.on('value', snap => {
      const apps = snap.val()
      console.log("snap.key " , apps)
      dispatch(getAppsFulfilledAction(apps))
    })
  }
}
// FUNCTION FOR CREATING APPETIZER IN FIREBASE
export const appCreate = ({ appname, category,
  allergies, gluten, appnotes, ingredients, image }) => {
  const { currentUser } = firebase.auth()
  var currentLocalID
  var idRef = firebase.database().ref(`/users/${currentUser.uid}/currentID`)
  return dispatch => {
    dispatch(createAppsAction())
    return idRef.once('value',function(snapshot){
      currentLocalID = snapshot.val()
      const id = Math.random().toString(36).substring(7)
      const appsRef = companyRef.child(`${currentLocalID}`).child('appetizers').child(id)
      appsRef.set({
        key: id,
        name: appname ? appname : "",
        category: category ? category : "",
        allergies: allergies ? allergies : "",
        gluten: gluten ? gluten : "",
        appnotes: appnotes ? appnotes : "",
        ingredients: ingredients ? ingredients : "",
        image: image ? image : "",
        time: new Date().getTime(),
        createdBy: currentUser.uid,
      })
      dispatch(appsCreateSuccess())
    })
      .catch((error) => {
        console.log(error)
        dispatch(appsCreateError())
      })
  }

}
export function showAppSelect(data){
  console.log('data ' , data.glass)
  return {
    type: SHOW_APP_SELECT,
    payload: data
  }
}
export const glutenFree = () => {
  return {
    type: GLUTEN_FREE
  }
}
function appsCreateSuccess(){
  Alert.alert(
    'SUCCESS',
    'Appetizer has been added to your database.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  // GO BACK A SCREEN TO THE APPETIZER LISTVIEW
  return {
    type: POP_ROUTE
  }
}
function appsCreateError(){
  Alert.alert(
    'ERROR',
    'There was an error saving your data.  Please try again.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
      type: "APPETIZER_CREATE_ERROR"
    }
}
function createAppsAction(){
  return {
    type: CREATING_APPETIZER
  }
}
function getAppsRequestedAction() {
  return {
    type: APPS_REQUESTED
  }
}
export const showAppetizer = () => {
  return {
    type: SHOW_APPETIZERS
  }
}
