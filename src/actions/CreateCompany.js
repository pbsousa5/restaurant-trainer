import firebase from 'firebase';
import { databaseRef } from '../configs/firebase'
import {COMPANY_NAME_ADDED, COMPANY_CHANGED, CHECK_COMPANY, COMPANY_DOES_NOT_EXIST, COMPANY_EXISTS} from './types';
import LocalStore from 'react-native-simple-store';

export function CheckForCompanyExist() {
    return{type: CHECK_COMPANY}
}
export function CompanyCreated(coID, coName){
  // submit company info to the database
  const currUID = firebase.auth().currentUser.uid;
  const currEmail = firebase.auth().currentUser.email;
  const companyRef = databaseRef.ref('companies').child(coID)
  companyRef.set({
        name: coName,
        active: true
      //  time: new Date().getTime()
      })
  companyRef.child('employees').child(currUID).set({
    admin: true,
    email: currEmail
  })
  return{type: CHECK_COMPANY, payload: {
      company:true,
      companyID:coID
    }
  }
}
export function CompanyExists(coID){
  return{type: COMPANY_EXISTS, payload: {
      company:true,
      companyID:coID
    }
  }
}

export function NoCompanyCreated (coID){
  return{
    type: COMPANY_DOES_NOT_EXIST, payload:{
      company:false,
      companyID:coID
    }
  }
}
