import firebase from 'firebase'
import React from 'react'
import { Alert } from 'react-native'
import {
  winesRef,
  companyRef,
  databaseRef,
  GetLocalRef
} from '../configs/firebase'
import LocalStore from 'react-native-simple-store'
//import axios from 'axios'
import AppConfigs from '../configs/config'
import {
  WINE_UPDATE,
  WINE_CREATE,
  WINE_FETCH_SUCCESS,
  WINE_SAVE_SUCCESS,
  REQ_DATA,
  ULTS,
  TOGGLE_MODAL,
  WINES_LOADED,
  WINES_REQUESTED,
  WINES_REJECTED,
  WINES_REFRESH,
  WINE_BOTTLE_DATA,
  HIDE_MODAL,
  HIDE_MODAL_REFRESH,
  POP_ROUTE,
  LOADING_MODAL_DATA,
  BY_THE_GLASS,
  SHOW_WINE_SELECT,
  WINE_EDIT_SWITCH,
  DELETE_WINE,
  WINE_SEARCHING,
  WINE_SEARCH_RESULTS
} from './types'
import { ApiUtils } from '../configs/ApiUtils'

function requestData(data) {
  switch (data){
    case "wines":
      return {
        type: WINE_SEARCHING
      }
    case "wines_modal":
      return {
        type: LOADING_MODAL_DATA
      }
    default:
      return {
        type: "DEFAULT"
      }
  }


}
function receiveData(results) {
  //console.log('RESULTS: ', results)
	return{
		type: WINE_SEARCH_RESULTS,
		payload: results
	}
}
function receiveWineData(results) {
  return {
    modalType: 'WINE_MODAL',
    type: WINE_BOTTLE_DATA,
    payload: results
  }
}
export function wineEditSwitch() {
  return{
    type: WINE_EDIT_SWITCH,
  }
}
export function showWineSelect(data){
  console.log('data ' , data.glass)
  return {
    type: SHOW_WINE_SELECT,
    payload: data
  }
}
export function deleteWine(data){
  console.log("WINE TO DELETE: ", data)
  var adaRef = firebase.database().ref('users/ada')
  adaRef.remove()
    .then(function() {
      console.log("Remove succeeded.")
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message)
    })
  return{
    type: DELETE_WINE,
    payload: data
  }
}
export function byTheGlass(){
  return{
    type: BY_THE_GLASS
  }
}
export function closeModal(){
  return {
    modalType: '',
    type: HIDE_MODAL
  }
}
export function toggleModal(obj, data, notes){
  console.log('toggle ', obj, data)
  if(obj){
    return{
      type: HIDE_MODAL_REFRESH,
      payload: data,
      notes: notes
    }
  }else {
    return{
      type: HIDE_MODAL,
    }
  }


}


function receiveError(json) {
  return function(dispatch) {
    dispatch(wineDataError())
  }
	return {
		type: 'RECV_ERROR',
		payload: json
	}
}
export function refreshingWines(){
  return{
    type: WINES_REFRESH,
  }
}
//const url = 'http://services.wine.com/api/beta/service.svc/json/catalog?apikey=aca7099dc132f00c97ac0abf5e4872e8&search='
const wineSearch = AppConfigs.wineSearch
const wineDetails = AppConfigs.wineDetails

export function wineData(search) {
  console.log('search ',wineDetails+search.code)

  return function(dispatch) {
    dispatch(requestData("wines_modal"))

  return fetch(wineDetails+search.code) 
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson
    }).then((data) => {
      dispatch(receiveWineData(data))
      console.log(data)
    })
    .catch((error) => {
      dispatch(receiveError(responseJson.data))
    })
  }
}


export function searchWine({search}) {
  console.log('search ',wineSearch+search)
  return function(dispatch) {
      dispatch(requestData("wines"))
      fetch(wineSearch+search).then(function(response) {
        if(response.ok) {
          return response.json()
        } else {
          dispatch(receiveError(response.data))
        }
      }).then(function(data) {
         if(data) {
           dispatch(receiveData(data))
         }
      }).catch(function(error) {
        dispatch(receiveError(error))
      })
  }

}


export function getWineDetails({search}) {
  return function(dispatch) {
    dispatch(requestData())
  return fetch(wineDetails+search)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson
    }).then((data) => {
      dispatch(receiveData(data))
      console.log(data)
    })
    .catch((error) => {
      dispatch(receiveError(responseJson.data))
    })
  }
}


//Load wines from firebase
export function loadWines (currentLocalID) {
  return dispatch => {
    dispatch(getWineRequestedAction())
    const winesRef = companyRef.child(`${currentLocalID}`).child('wines')
    return winesRef.on('value', snap => {
      const wines = snap.val()
      console.log("snap.key " , wines)
      dispatch(getWineFulfilledAction(wines))
    })
  }
}
function getWineRequestedAction() {
  return {
    type: WINES_REQUESTED
  }
}

function getWineRejectedAction() {
  return {
    type: WINES_REJECTED
  }
}

function getWineFulfilledAction(wines) {
  console.log('wines ', wines)
  return {
    type: WINES_LOADED,
    payload: wines
  }
}
function createWineAction() {
  return{
    type: "CREATING_WINE"
  }
}
function wineCreateSuccess() {
  Alert.alert(
    'SUCCESS',
    'Wine has been added to your database.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
    //type: WINE_CREATE
    type: POP_ROUTE
  }
}
function deleteWineAction(){
  return {
    type: 'ATTEMPTING_WINE_DELETE'
  }
}
function wineDataError() {
  Alert.alert(
    'ERROR',
    'There was an error loading data.  Please try again.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
    type: WINE_SEARCHING
  }
}
function wineDeleteSuccess(){
  Alert.alert(
    'SUCCESS',
    'Wine has been removed from your database.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
    //type: WINE_CREATE
    type: POP_ROUTE
  }
}
function wineDeleteError(){
  Alert.alert(
    'ERROR',
    'There was an error deleting this wine.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
    //type: WINE_CREATE
    type: "ERROR_DELETING_WINE"
  }
}
function wineCreateError() {
  Alert.alert(
    'ERROR',
    'There was an error saving your data.  Please try again.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
      type: "WINE_CREATE_ERROR"
    }
}
function updateWineAction(){
  return {
    type: 'ATTEMPTING_WINE_UPDATE'
  }
}
function wineUpdateSuccess(){
  Alert.alert(
    'SUCCESS',
    'Wine has been updated from your database.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
    //type: WINE_CREATE
    type: POP_ROUTE
  }
}
function wineUpdateError() {
  Alert.alert(
    'ERROR',
    'There was an error saving your data.  Please try again.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
    type: "WINE_UPDATE_ERROR"
  }
}
export const disableWine = () => {
  Alert.alert(
    'ERROR',
    'This feature has not yet been implemented.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return {
    type: "WINE_DISABLE"
  }
}
// FUNCTION FOR UPDATING WINES IN firebase
export const wineUpdate = ({ winename, winery,
  varietal, vintage, winenotes, region, image, glass, key, winelink }) => {
    console.log('VARS ', {winename, winery,
    varietal, vintage, winenotes, region, image, glass, key, winelink} )
  const { currentUser } = firebase.auth()
  var currentLocalID
  var idRef = firebase.database().ref(`/users/${currentUser.uid}/currentID`)
  return dispatch => {
    dispatch(updateWineAction())
    return idRef.once('value',function(snapshot){
      currentLocalID = snapshot.val()
      console.log('idRef ', currentLocalID)
      const winesRef = companyRef.child(`${currentLocalID}`).child('wines').child(key)
      winesRef.update({
        name: winename,
        link: winelink,
        vintage: vintage,
        winenotes: winenotes,
        winery: winery,
        varietal: varietal,
        glass: glass,
        image: image,
        region: region,
        time: new Date().getTime(),
        updatedBy: currentUser.uid,
      })
      dispatch(wineUpdateSuccess())
    })
      .catch((error) => {
        console.log(error)
        dispatch(wineUpdateError())
      })
  }
}
// FUNCTION FOR CREATING WINE IN FIREBASE
export const wineCreate = ({ winename, winery,
  varietal, vintage, winenotes, region, image, glass, link, code }) => {
  const { currentUser } = firebase.auth()
  var currentLocalID
  var idRef = firebase.database().ref(`/users/${currentUser.uid}/currentID`)
  return dispatch => {
    dispatch(createWineAction())
    return idRef.once('value',function(snapshot){
      currentLocalID = snapshot.val()
      console.log('idRef ', currentLocalID)
      const id = Math.random().toString(36).substring(7)
      const winesRef = companyRef.child(`${currentLocalID}`).child('wines').child(id)
      console.log('imageURL ', image)
      winesRef.set({
        key: id,
        name: winename ? winename : "",
        link: link ? link : "",
        vintage: vintage ? vintage : "",
        code: code ? code : "",
        winenotes: winenotes ? winenotes : "",
        winery: winery ? winery : "",
        varietal: varietal ? varietal : "",
        glass: glass,
        image: image ? image : "",
        region: region ? region : "",
        time: new Date().getTime(),
        createdBy: currentUser.uid,
      })
      dispatch(wineCreateSuccess())
    })
      .catch((error) => {
        console.log(error)
        dispatch(wineCreateError())
      })
  }

}

export const wineFetch = () => {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/wines`)
      .on('value', snapshot => {
        dispatch({ type: WINES_FETCH_SUCCESS, payload: snapshot.val() })
      })
  }
}

export const wineSave = ({ name, description, type, uid }) => {
const { currentUser } = firebase.auth()

return (dispatch) => {
  firebase.database().ref(`/users/${currentUser.uid}/wines/${uid}`)
    .set({ name, description, type })
    .then(() => {
      dispatch({ type: WINE_SAVE_SUCCESS })
      //Actions.employeeList({ type: 'reset' })
    })
  }
}

export const wineDelete = ( key ) => {
  const { currentUser } = firebase.auth()
  var currentLocalID
  var isAdmin
  var idRef = firebase.database().ref(`/users/${currentUser.uid}/currentID`)

  return dispatch => {
    dispatch(deleteWineAction())
    return idRef.once('value',function(snapshot){
      currentLocalID = snapshot.val()
      const wineRef = companyRef.child(`${currentLocalID}/wines/${key}`)
      wineRef.remove()
      dispatch(wineDeleteSuccess())
    })
      .catch((error) => {
        console.log(error)
        dispatch(wineDeleteError())
      })
    }
}
