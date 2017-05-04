import React from 'react'
import { Alert } from 'react-native'
import {
  companyRef,
} from '../configs/firebase'
import LocalStore from 'react-native-simple-store'


import firebase from 'firebase'
import {
  ENTREES_LOADED,
  SHOW_ENTREES,
  ENT_REQUESTED,
  CREATING_ENTREE,
  GLUTEN_FREE,
  NAV_BACK,
  SHOW_ENT_SELECT,
  ENT_EDIT_SWITCH,
  ATTEMPTING_ENT_UPDATE,
  ENT_UPDATE_ERROR,
  ENT_REFRESH,
} from './types'

function getEntFulfilledAction  (entree){
  console.log('entrees ' , entree);
  return{
    type: ENTREES_LOADED,
    payload: entree
  }
}
//Load appetizers from firebase
export function loadEntrees (currentLocalID) {
  return function (dispatch) {
    dispatch(getEntRequestedAction())
    const entRef = companyRef.child(`${currentLocalID}`).child('entrees')

    return entRef.on('value', snap => {
      const entree = snap.val()
      console.log("snap.key entree " , entree)
      dispatch(getEntFulfilledAction(entree))
    })
  }
}
// FUNCTION FOR CREATING APPETIZER IN FIREBASE
export const entCreate = ({ entname, category,
  allergies, gluten, entnotes, ingredients, image }) => {
    console.log("Entree category ", category);
  const { currentUser } = firebase.auth()
  var currentLocalID
  var idRef = firebase.database().ref(`/users/${currentUser.uid}/currentID`)
  return dispatch => {
    dispatch(createEntAction())
    return idRef.once('value',function(snapshot){
      currentLocalID = snapshot.val()
      const id = Math.random().toString(36).substring(7)
      const entRef = companyRef.child(`${currentLocalID}`).child('entrees').child(id)
      entRef.set({
        key: id,
        name: entname ? entname : "",
        category: category ? category.toUpperCase() : "",
        allergies: allergies ? allergies : "",
        gluten: gluten ? gluten : "",
        entnotes: entnotes ? entnotes : "",
        ingredients: ingredients ? ingredients : "",
        image: image ? image : "",
        time: new Date().getTime(),
        createdBy: currentUser.uid,
      })
      dispatch(entCreateSuccess())
    })
      .catch((error) => {
        console.log(error)
        dispatch(entCreateError())
      })
  }

}

//UPDATING entrees
export const entUpdate = ({ entname, category,
  allergies, gluten, entnotes, ingredients, image, key }) => {

  const { currentUser } = firebase.auth()
  var currentLocalID
  var idRef = firebase.database().ref(`/users/${currentUser.uid}/currentID`)
  return dispatch => {
    dispatch(updateEntAction())
    return idRef.once('value',function(snapshot){
      currentLocalID = snapshot.val()
      const entRef = companyRef.child(`${currentLocalID}`).child('entrees').child(key)
      entRef.update({
        name: entname ? entname : "",
        category: category ? category.toUpperCase() : "",
        allergies: allergies ? allergies : "",
        gluten: gluten ? gluten : "",
        entnotes: entnotes ? entnotes : "",
        ingredients: ingredients ? ingredients : "",
        image: image ? image : "",
        time: new Date().getTime(),
        updatedBy: currentUser.uid,
      })
      dispatch(entUpdateSuccess())
    })
      .catch((error) => {
        console.log(error)
        dispatch(entUpdateError())
      })
  }

}
// DELETE entree
export const entDelete = ( key ) => {
  const { currentUser } = firebase.auth()
  var currentLocalID
  var isAdmin
  var idRef = firebase.database().ref(`/users/${currentUser.uid}/currentID`)

  return dispatch => {
    dispatch(deleteEntAction())
    return idRef.once('value',function(snapshot){
      currentLocalID = snapshot.val()
      const entRef = companyRef.child(`${currentLocalID}/entrees/${key}`)
      entRef.remove()
      dispatch(entDeleteSuccess())
    })
      .catch((error) => {
        console.log(error)
        dispatch(entDeleteError())
      })
    }
}
// DISABLE ENTREE
export const disableEnt = () => {
  Alert.alert(
    'ERROR',
    'This feature has not yet been implemented.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
    type: "ENT_DISABLE"
  }
}

export function entEditSwitch(){
  return{
    type: ENT_EDIT_SWITCH
  }
}
export function showEntSelect(data){
  return {
    type: SHOW_ENT_SELECT,
    payload: data
  }
}
export const glutenFreeEntree = () => {
  return {
    type: GLUTEN_FREE
  }
}

// HANDLE PROMISES
function updateEntAction(){
  return {
    type: ATTEMPTING_ENT_UPDATE
  }
}
function entUpdateSuccess(){
  Alert.alert(
    'SUCCESS',
    'Entree has been updated in your database.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  //APPS_UPDATE_SUCCESS
  return {
    type: NAV_BACK,
  }



}
function entUpdateError() {
  Alert.alert(
    'ERROR',
    'There was an error saving your data.  Please try again.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
    type: ENT_UPDATE_ERROR
  }
}

function entCreateSuccess(){
  Alert.alert(
    'SUCCESS',
    'Entree has been added to your database.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )

  // GO BACK A SCREEN TO THE Entree LISTVIEW
  return {
    type: NAV_BACK,
  }

}
function entCreateError(){
  Alert.alert(
    'ERROR',
    'There was an error saving your data.  Please try again.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
      type: "ENTREE_CREATE_ERROR"
    }
}
function deleteEntAction(){
  return {
    type: 'ATTEMPTING_APP_DELETE'
  }
}
function entDeleteError(){
  Alert.alert(
    'ERROR',
    'There was an error deleting this entree.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
    //type: WINE_CREATE
    type: "ERROR_DELETING_ENTREE"
  }
}
function entDeleteSuccess(){
  Alert.alert(
    'SUCCESS',
    'Entree has been removed from your database.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  // USING NEW REACT NAVIGATION
  return {
    type: NAV_BACK,
  }


}
function createEntAction(){
  return {
    type: CREATING_ENTREE
  }
}
function getEntRequestedAction() {
  return {
    type: ENT_REQUESTED
  }
}
export function refreshingEnt(){
  return{
    type: ENT_REFRESH,
  }
}
export const showEntree = () => {
  return {
    type: SHOW_ENTREES
  }
}
