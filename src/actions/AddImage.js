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
  // ONLY NEED THE BELOW FOR IMAGES FROM A URL
  /*
  RNFetchBlob
    .config({ fileCache : true , appendExt : 'jpg' })
    .fetch('GET', 'https://avatars0.githubusercontent.com/u/5063785?v=3&s=460')//source.uri)
    .then((resp) => {
      uploadImage = resp.path()
    })
  */
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
          // upload image using Firebase SDK
          // CREATE A NEW FOLDER FOR EACH COMPANY ID
          const fileRef = `${currentLocalID}/${imageName}`
          const uploadTask = storageRef.child(`${currentLocalID}/${imageName}`)
            .put(blob, { contentType : 'image/jpg' })
            .then((snapshot) => {
              console.log('fileRef: ', fileRef)
              dispatch(receivedImage(fileRef))
              blob.close()
            })
        })
      })

    }
    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // See below for more detail
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      const downloadURL = uploadTask.snapshot.downloadURL;
      console.log('downloadURL: ',downloadURL);
    });
}
export function DisplayFirebaseImage(imageRef){

  console.log("RENDER IMAGE");

  const storageRef = firebase.storage.child(imageRef);
  storageRef.getDownloadURL().then(function(url) {
    console.log(url);
  }).catch(function(error) {
          console.log(error.message);
    })


}
export function fetchUrl(url) {
    var storage = firebase.storage();
    var storageRef = storage.ref();
    return storageRef.child(url).getDownloadURL().then(function(urlLong) {
        return {
            url: urlLong,

        };
    }).catch(function(error) {
        console.log(error);
        throw {
            message: error.code,
            status: error.status,
            data: error
        };
    });
}

function receivedImage(payload){
  return {
    type: UPLOADED_IMAGE,
    payload: payload
  }
}
