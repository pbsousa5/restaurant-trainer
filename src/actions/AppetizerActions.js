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
  APPS_REQUESTED
} from './types'

function getAppsFulfilledAction  (apps){
  return{
    type:LOAD_APPETIZERS,
    payload: apps
  }
}
//Load appetizers from firebase
export function loadAppetizers (currentLocalID) {
  return dispatch => {
    dispatch(getAppsRequestedAction())
    const appsRef = companyRef.child(`${currentLocalID}`).child('appetizers')
    return winesRef.on('value', snap => {
      const apps = snap.val()
      console.log("snap.key " , apps)
      dispatch(getAppsFulfilledAction(apps))
    })
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
