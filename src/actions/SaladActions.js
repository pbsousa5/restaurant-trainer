import React from 'react'
import { Alert } from 'react-native'
import {
  companyRef,
} from '../configs/firebase'
import LocalStore from 'react-native-simple-store'


import firebase from 'firebase'
import {
  SALADS_LOADED,
  SHOW_SALADS,
  SALAD_REQUESTED,
  CREATING_SALAD,
  GLUTEN_FREE,
  NAV_BACK,
  SHOW_SALAD_SELECT,
  SALAD_EDIT_SWITCH,
  ATTEMPTING_SALAD_UPDATE,
  SALAD_UPDATE_ERROR,
  SALAD_REFRESH,
} from './types'

function getSaladFulfilledAction  (salad){
  console.log('salads ' , salad);
  return{
    type: SALADS_LOADED,
    payload: salad
  }
}
//Load salads from firebase
export function loadSalads (currentLocalID) {
  return function (dispatch) {
    dispatch(getSaladRequestedAction())
    const saladRef = companyRef.child(`${currentLocalID}`).child('salads')

    return saladRef.on('value', snap => {
      const salad = snap.val()
      console.log("snap.key salad " , salad)
      dispatch(getSaladFulfilledAction(salad))
    })
  }
}
// FUNCTION FOR CREATING SALAD IN FIREBASE
export const saladCreate = ({ saladname, category,
  allergies, gluten, saladnotes, ingredients, image }) => {

  const { currentUser } = firebase.auth()
  var currentLocalID
  var idRef = firebase.database().ref(`/users/${currentUser.uid}/currentID`)
  return dispatch => {
    dispatch(createSaladAction())
    return idRef.once('value',function(snapshot){
      currentLocalID = snapshot.val()
      let id = "";
      const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 12; i++ )
          id += possible.charAt(Math.floor(Math.random() * possible.length));
      const saladRef = companyRef.child(`${currentLocalID}`).child('salads').child(id)
      saladRef.set({
        key: id,
        name: saladname ? saladname : "",
        category: category ? category.toUpperCase() : "",
        allergies: allergies ? allergies : "",
        gluten: gluten ? gluten : "",
        saladnotes: saladnotes ? saladnotes : "",
        ingredients: ingredients ? ingredients : "",
        image: image ? image : "",
        time: new Date().getTime(),
        createdBy: currentUser.uid,
      })
      dispatch(saladCreateSuccess())
    })
      .catch((error) => {
        console.log(error)
        dispatch(saladCreateError())
      })
  }

}

//UPDATING entrees
export const saladUpdate = ({ saladname, category,
  allergies, gluten, saladnotes, ingredients, image, key }) => {

  const { currentUser } = firebase.auth()
  var currentLocalID
  var idRef = firebase.database().ref(`/users/${currentUser.uid}/currentID`)
  return dispatch => {
    dispatch(updateSaladAction())
    return idRef.once('value',function(snapshot){
      currentLocalID = snapshot.val()
      const saladRef = companyRef.child(`${currentLocalID}`).child('salads').child(key)
      saladRef.update({
        name: saladname ? saladname : "",
        category: category ? category.toUpperCase() : "",
        allergies: allergies ? allergies : "",
        gluten: gluten ? gluten : "",
        saladnotes: saladnotes ? saladnotes : "",
        ingredients: ingredients ? ingredients : "",
        image: image ? image : "",
        time: new Date().getTime(),
        updatedBy: currentUser.uid,
      })
      dispatch(saladUpdateSuccess())
    })
      .catch((error) => {
        console.log(error)
        dispatch(saladUpdateError())
      })
  }

}
// DELETE entree
export const saladDelete = ( key ) => {
  const { currentUser } = firebase.auth()
  var currentLocalID
  var isAdmin
  var idRef = firebase.database().ref(`/users/${currentUser.uid}/currentID`)

  return dispatch => {
    dispatch(deleteSaladAction())
    return idRef.once('value',function(snapshot){
      currentLocalID = snapshot.val()
      const saladRef = companyRef.child(`${currentLocalID}/salads/${key}`)
      saladRef.remove()
      dispatch(saladDeleteSuccess())
    })
      .catch((error) => {
        console.log(error)
        dispatch(saladDeleteError())
      })
    }
}
// DISABLE ENTREE
export const disableSalad = () => {
  Alert.alert(
    'ERROR',
    'This feature has not yet been implemented.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
    type: "SALAD_DISABLE"
  }
}

export function saladEditSwitch(){
  return{
    type: SALAD_EDIT_SWITCH
  }
}
export function showSaladSelect(data){
  return {
    type: SHOW_SALAD_SELECT,
    payload: data
  }
}
export const glutenFreeSalad = () => {
  return {
    type: GLUTEN_FREE
  }
}

// HANDLE PROMISES
function updateSaladAction(){
  return {
    type: ATTEMPTING_SALAD_UPDATE,

  }
}
function saladUpdateSuccess(){
  Alert.alert(
    'SUCCESS',
    'Salad has been updated in your database.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  //APPS_UPDATE_SUCCESS
  return {
    type: NAV_BACK,
  }



}
function saladUpdateError() {
  Alert.alert(
    'ERROR',
    'There was an error saving your data.  Please try again.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
    type: SALAD_UPDATE_ERROR
  }
}

function saladCreateSuccess(){
  Alert.alert(
    'SUCCESS',
    'Salad has been added to your database.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )

  // GO BACK A SCREEN TO THE Entree LISTVIEW
  return {
    type: NAV_BACK,
  }

}
function saladCreateError(){
  Alert.alert(
    'ERROR',
    'There was an error saving your data.  Please try again.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
      type: "SALAD_CREATE_ERROR"
    }
}
function deleteSaladAction
(){
  return {
    type: 'ATTEMPTING_SALAD_DELETE'
  }
}
function saladDeleteError(){
  Alert.alert(
    'ERROR',
    'There was an error deleting this Salad.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
    //type: WINE_CREATE
    type: "ERROR_DELETING_SALAD"
  }
}
function saladDeleteSuccess(){
  Alert.alert(
    'SUCCESS',
    'Salad has been removed from your database.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  // USING NEW REACT NAVIGATION
  return {
    type: NAV_BACK,
  }


}
function createSaladAction(){
  return {
    type: CREATING_SALAD
  }
}
function getSaladRequestedAction() {
  return {
    type: SALAD_REQUESTED
  }
}
export function refreshingSalad(){
  return{
    type: SALAD_REFRESH,
  }
}
export const showSalad = () => {
  return {
    type: SHOW_SALADS
  }
}
