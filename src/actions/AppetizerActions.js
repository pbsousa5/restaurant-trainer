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
  SHOW_APP_SELECT,
  APPS_EDIT_SWITCH,
  ATTEMPTING_APPS_UPDATE,
  APPS_UPDATE_SUCCESS,
  APPS_UPDATE_ERROR,
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
        category: category ? category.toUpperCase() : "",
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

//UPDATING appetizers
export const appUpdate = ({ appname, category,
  allergies, gluten, appnotes, ingredients, image, key }) => {

  const { currentUser } = firebase.auth()
  var currentLocalID
  var idRef = firebase.database().ref(`/users/${currentUser.uid}/currentID`)
  return dispatch => {
    dispatch(updateAppsAction())
    return idRef.once('value',function(snapshot){
      currentLocalID = snapshot.val()
      const appsRef = companyRef.child(`${currentLocalID}`).child('appetizers').child(key)
      appsRef.update({
        name: appname ? appname : "",
        category: category ? category.toUpperCase() : "",
        allergies: allergies ? allergies : "",
        gluten: gluten ? gluten : "",
        appnotes: appnotes ? appnotes : "",
        ingredients: ingredients ? ingredients : "",
        image: image ? image : "",
        time: new Date().getTime(),
        updatedBy: currentUser.uid,
      })
      dispatch(appsUpdateSuccess())
    })
      .catch((error) => {
        console.log(error)
        dispatch(appsUpdateError())
      })
  }

}
// DELETE appetizer
export const appDelete = ( key ) => {
  const { currentUser } = firebase.auth()
  var currentLocalID
  var isAdmin
  var idRef = firebase.database().ref(`/users/${currentUser.uid}/currentID`)

  return dispatch => {
    dispatch(deleteAppAction())
    return idRef.once('value',function(snapshot){
      currentLocalID = snapshot.val()
      const appRef = companyRef.child(`${currentLocalID}/appetizers/${key}`)
      appRef.remove()
      dispatch(appDeleteSuccess())
    })
      .catch((error) => {
        console.log(error)
        dispatch(appDeleteError())
      })
    }
}
// DISABLE APPETIZER
export const disableApp = () => {
  Alert.alert(
    'ERROR',
    'This feature has not yet been implemented.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
    type: "APP_DISABLE"
  }
}

export function appEditSwitch(){
  return{
    type: APPS_EDIT_SWITCH
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

// HANDLE PROMISES
function updateAppsAction(){
  return {
    type: ATTEMPTING_APPS_UPDATE
  }
}
function appsUpdateSuccess(){
  Alert.alert(
    'SUCCESS',
    'Appetizer has been updated in your database.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  //APPS_UPDATE_SUCCESS
  return {
    //type: WINE_CREATE
    type: POP_ROUTE
  }
}
function appsUpdateError() {
  Alert.alert(
    'ERROR',
    'There was an error saving your data.  Please try again.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
    type: APPS_UPDATE_ERROR
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
function deleteAppAction(){
  return {
    type: 'ATTEMPTING_APP_DELETE'
  }
}
function wineDeleteError(){
  Alert.alert(
    'ERROR',
    'There was an error deleting this appetizer.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
    //type: WINE_CREATE
    type: "ERROR_DELETING_APPETIZER"
  }
}
function appDeleteSuccess(){
  Alert.alert(
    'SUCCESS',
    'Appetizer has been removed from your database.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
    //type: WINE_CREATE
    type: POP_ROUTE
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
