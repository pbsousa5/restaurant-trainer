import React from 'react'
import { Alert } from 'react-native'
import {

  companyRef,
  databaseRef,
  usersRef,
  GetLocalRef
} from '../configs/firebase'
import LocalStore from 'react-native-simple-store'
import firebase from 'firebase'
import {
  IS_ADMIN,
  LOAD_COMPANIES,
  LOAD_COMPANY_DATA,
  TOGGLE_ADMIN,
  LOAD_COMPANY_USERS,
  COMPANY_USERS_LOADED
} from './types'


//Load companies from users record
export function loadCompanies (currentLocalID) {
  let companyData = {};
  return dispatch => {
    dispatch(getCompaniesRequestedAction())
    const { currentUser } = firebase.auth()
    const companyRef = usersRef.child(`${currentUser.uid}`).child('companies')
    return companyRef.on('value', snap => {
      const companies = snap.val()
      console.log("snap.key " , companies)
      dispatch(getCompaniesFulfilledAction(companies))
      /*
      snap.forEach(function(childSnapshot) {
        dispatch(getCompanyDataRequestedAction())
        var childData = childSnapshot.child('id');
        childSnapshot.id = childData.val()

        console.log('child: ', childSnapshot);
        //dispatch(getCompanyDataFulfilledAction(companyData))
      });*/
    })
  }
}
export function toggleAdmin () {
  // TESTING ADMIN SETTINGS
  return {
    type: TOGGLE_ADMIN
  }
}
export function loadCompanyData(coID){

  return dispatch => {
    dispatch(getCompanyDataRequestedAction())
    const { currentUser } = firebase.auth()
    const companyRef = usersRef.child(`${currentUser.uid}`).child('companies')
    return companyRef.on('value', snap => {
      const companies = snap.val()

      console.log("snap.key " , companies)
      dispatch(getCompanyDataFulfilledAction(companies))
    })
  }
}
export function loadCompanyUsers(companyID){
  console.log("companyID ", companyID);
  return function (dispatch){
    dispatch({type: LOAD_COMPANY_USERS})
    const usersRef = companyRef.child(`${companyID}`).child('info').child('employees')
    return usersRef.on('value', snap => {
      const users = snap.val()
      console.log("users: " , users)
      dispatch(getUsersFulfilledAction(users))
    })
  }
}
function getUsersFulfilledAction(users){
  return{
    type: 'COMPANY_USERS_LOADED',
    payload: users
  }
}
function getCompanyDataRequestedAction(){
  return{
    type: "COMPANIES_DATA_REQUESTED"
  }
}
function getCompanyDataFulfilledAction(companyData){
  return{
    type: LOAD_COMPANY_DATA,
    payload: companyData
  }
}
function getCompaniesRequestedAction(){
  return{
    type: "COMPANIES_REQUESTED"
  }
}
function getCompaniesFulfilledAction(companies){
  return{
    type: LOAD_COMPANIES,
    payload: companies
  }
}
