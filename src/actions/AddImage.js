import {
  winesRef,
  companyRef,
  GetLocalRef,
  storageRef
} from '../configs/firebase'
import {
  Platform
} from 'react-native';
import React, { Component } from 'react';

import RNFetchBlob from 'react-native-fetch-blob'
import {
 ADD_IMAGE,
 UPLOADED_IMAGE
} from './types'

import firebase from 'firebase'

export const addImage = (source) => {
  console.log('addImage: ', source.uri);
  return {
    type: ADD_IMAGE,
    source: source
  }
}

export const UploadImage = (source) => {
  const fs = RNFetchBlob.fs
  const Blob = RNFetchBlob.polyfill.Blob
  const storageRef = firebase.storage().ref('images');
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob
  let uploadImage = source.uri
  const imageName = `ordr-image-${Platform.OS}-${new Date()}.jpg`

  let rnfbURI = RNFetchBlob.wrap(uploadImage)
  // Get reference to local company ID before uploadImage
  const { currentUser } = firebase.auth()
  var currentLocalID
  var idRef = firebase.database().ref(`/users/${currentUser.uid}/currentID`)
  
  // create Blob from file path
  return dispatch => {
    return idRef.once('value',function(snapshot){
      currentLocalID = snapshot.val()
      Blob
        .build(rnfbURI, { type : 'image/jpg;'})
        .then((blob) => {
          let uploadBlob = null
          // upload image using Firebase SDK
          // CREATE A NEW FOLDER FOR EACH COMPANY ID
          const fileRef = `${currentLocalID}/${imageName}`
          const uploadTask = storageRef.child(`${currentLocalID}/${imageName}`)
            .put(blob, { contentType : 'image/jpg' })
            .then((snapshot) => {
              blob.close()
              console.log('downloadURL: ', snapshot.downloadURL)
              dispatch(receivedImage(snapshot.downloadURL))
            })
            .catch((error) => {
              console.log(error.message)
            })
        })
      })

    }

}

function handleDispatch(message){
  console.log("MESSASGE: ", message.toString());
  return{
    type: "DISPATCH_RECEIVED"
  }

}



function receivedImage(payload){
  return {
    type: UPLOADED_IMAGE,
    payload: payload
  }
}
