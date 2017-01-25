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
  IS_ADMIN,
  LOAD_COMPANIES,
  LOAD_COMPANY_DATA
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
