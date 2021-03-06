import firebase from 'firebase';
import { databaseRef } from '../configs/firebase'
import {
  ERROR_CREATING_COMPANY,
  COMPANY_NAME_ADDED,
  COMPANY_CHANGED,
  CHECK_COMPANY,
  COMPANY_DID_NOT_EXIST,
  COMPANY_EXISTS,
  DELETE_COMPANY,
  CHECK_COMPANY_NAME,
  CHECKING_FOR_NAME,
  CURRENT_ADMIN
  } from './types';
import LocalStore from 'react-native-simple-store';
import { Alert } from 'react-native'

const company = false
// CHECKING FOR COMPANY NAME CREATED LOCALLY

export const CheckName = () => {

  return (dispatch) => {
    dispatch(checkingNameExists())
    LocalStore.get('localCompany').then(localCompany => {
        if (!localCompany || localCompany == false) {
            console.log('localCompany is null: ' + localCompany);
            company = false
            //LocalStore.save('localCompany', {value: company});
            return dispatch(checkCompanyName(company))
        } else {
            company = true
            return dispatch(checkCompanyName(company))
        }
    }).catch(error => {
      return dispatch(processError(
        'ERROR',
        error.message,
        'ERROR_CHECKING_COMPANY'
      ))
    });
  }
}
const createLocalName = () => {
  return (dispatch) => {
    dispatch(creatingLocalName())
    LocalStore.get('localCompany').then(localCompany => {
        if (!localCompany) {
            LocalStore.save('localCompany', {value: true});
            return dispatch(localNameValueAdded(true))
        } else {
            // VALUE EXISTS FORCE IT TO TRUE
            LocalStore.save('localCompany', {value: true});
            return dispatch(localNameValueAdded(true))
        }
    }).catch(error => {
      console.log(error.message);
      return dispatch(processError(
        'ERROR',
        'There was an error checking local company name.',
        'ERROR_CHECKING_COMPANY_NAME'
      ))
    });
  }
}
// CHECKING FOR A COMPANY ID STORED LOCALLY
// IF ONE DOES NOT EXIST IT IS RANDOMLY GENERATED
// LATER WE WILL STORE THIS IN THE DATABASE
export const LocalCompanyCheck = () => {
  return (dispatch) => {
    dispatch(checkForCompanyExist())
    LocalStore.get('localID').then(localID => {
        if (!localID) {
            console.log('localID is null: ' + localID);
            const id = "";
            const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 12; i++ )
                id += possible.charAt(Math.floor(Math.random() * possible.length));
            //const id = Math.random().toString(36).substring(7);
            LocalStore.save('localID', {value: id});
            return dispatch(CreatingCompanyID(id))
        } else {
            console.log('localID value: ' + localID.value);
            // this checks admin level and also calls CompanyExists
            return dispatch(CheckAdmin(localID.value))
        }
    }).catch(error => {
      console.log(error.message);
      return dispatch(processError(
        'ERROR',
        error.message,
        ERROR_CREATING_COMPANY))
    });
  }
}
function creatingLocalName() {
  return {
    type: 'CREATING_LOCAL_NAME_VALUE'
  }
}
function localNameValueAdded(value) {
  console.log("LOCAL_NAME_VALUE_ADDED: ", value);
  return{
    type: 'LOCAL_NAME_VALUE_ADDED'
  }
}
function checkingNameExists() {
  return {
    type: CHECKING_FOR_NAME
  }
}
function checkCompanyName(exists){
  return {
    type: CHECK_COMPANY_NAME,
    payload: exists
  }
}
function submittingCompanyName(){
  //TODO add local company name true
  return (dispatch) => {
    dispatch(createLocalName())
  }
  return{
    type: 'SUBMITTING_COMPANY_NAME_TO_DATABASE'
  }
}
function checkForCompanyExist(){
  return{
    type: "CHECK_FOR_COMPANY_EXIST"
  }
}
function successfullyAddedCompanyToDatabase(coID){
  return{
    type: COMPANY_NAME_ADDED,
    payload: {
      company:true,
      companyID: coID,
      localName: true,
    }
  }
}
function processError(alert, message, type){
  Alert.alert(
    alert,
    message,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
  return{
    type: type
  }
}
export function createCompanyName({coID, coName, image}){
  // submit company info to the database
  return (dispatch) => {
    dispatch(submittingCompanyName())
    const currUID = firebase.auth().currentUser.uid;
    const currEmail = firebase.auth().currentUser.email;
    const companyRef = databaseRef.ref('companies').child(coID).child('info')
    const userRef = databaseRef.ref('users').child(currUID)
    companyRef.set({
      // SET NEW COMPANY NAME
      // UNDER NEW ID
      name: coName,
      active: true,
      id: coID,
      image: image,
      address: "",
      phone: "",
      email: ""
    })
    .then(() => {
      // SET THIS USER AS ADMIN TO COMPANY
      dispatch( SendAdminLevel(true) )
      companyRef.child('employees').child(currUID).set({
        admin: true,
        email: currEmail
    })})
    .then(() => {
      // SET USERS CURRENT COMPANY ID
      // THIS COULD LATER BE USED TO SWITCH BETWEEN RESTARAUNTS
      userRef.update({
        currentID: coID,
      })
    })
    .then(() => {
      // ADD COMPANY ID TO EMPLOYESS INFO
      userRef.child('companies').child(coID).set({
        admin: true,
        id: coID
      })
      dispatch(successfullyAddedCompanyToDatabase(coID))
    })
    .catch((error) => {
      dispatch(processError(
        'ERROR',
        error.message,
        'ERROR_ADDING_RESTAURANT_TO_DATABASE'
      ))
    })
  }
}
export function CompanyExists(coID){
  return{
    type: COMPANY_EXISTS,
    payload: {
      company:true,
      companyID:coID,
    }
  }
}
function CheckAdmin  (coID) {
  // check if user is admin
  console.log('check admin level');
  return dispatch => {
    dispatch({type: 'CHECKING_ADMIN_LEVEL'})
    var isAdmin = false
    const companyRef = databaseRef.ref('companies').child(coID).child('info')
    const currUID = firebase.auth().currentUser.uid
    const ref = companyRef.child('employees').child(currUID).child('admin')
     return ref.once("value")
      .then(function(snapshot) {
        const admin = snapshot.val()
        console.log('admin ', admin);
        dispatch(SendAdminLevel(admin))
        dispatch(CompanyExists(coID))
      }).catch((error) => {
        dispatch({type:'ERROR_CHECKING_ADMIN_LEVEL'})
      })
  }
}

function checkingAdminLevel(){
  return{
    type: "CHECKING_ADMIN_LEVEL"
  }
}

function SendAdminLevel(admin){
  return{
    type: CURRENT_ADMIN,
    payload: {
      admin: admin,
    }
  }
}
export const DeleteCompany = () => {
  // USED FOR TESTING IN ADDING NEW COMPANIES
  LocalStore.delete('localID')
  LocalStore.delete('localCompany')
  console.log('DELTED ' + LocalStore.get('localID'));
  /*
  LocalStore.get('localID').then(localID => {
    console.log("DELETED LOCAL ID: ", localID);
  })
  LocalStore.get('localCompany').then(localCompany => {
    console.log("DELETED localCompany: ", localCompany);
  })*/
  return {
    type: DELETE_COMPANY,
  }
}

function CreatingCompanyID (coID){
  // SET LOCAL NAME TO BE true
  console.log('LOCAL ID SET: ', coID);

  return {
    type: COMPANY_DID_NOT_EXIST,
    payload:{
      company:false,
      companyID:coID
    }
  }
}
