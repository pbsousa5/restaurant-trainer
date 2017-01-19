import firebase from 'firebase';
import React from 'react'
import { Alert } from 'react-native'
import {
  winesRef,
  companyRef,
  databaseRef,
  GetLocalRef
} from '../configs/firebase'
import LocalStore from 'react-native-simple-store';
//import axios from 'axios';
import AppConfigs from '../configs/config'
import {
  WINE_UPDATE,
  WINE_CREATE,
  WINE_FETCH_SUCCESS,
  WINE_SAVE_SUCCESS,
  REQ_DATA,
  WINE_SEARCH_RESULTS,
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
  BY_THE_GLASS

} from './types';


function requestData(data) {
  switch (data){
    case "wines":
      return {
        type: REQ_DATA
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
	return{
		type: WINE_SEARCH_RESULTS,
		payload: results
	}
};
function receiveWineData(results) {
  return {
    modalType: 'WINE_MODAL',
    type: WINE_BOTTLE_DATA,
    payload: results
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
  console.log('toggle ', obj, data);
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
	return {
		type: 'RECV_ERROR',
		payload: json
	}
};
export function refreshingWines(){
  return{
    type: WINES_REFRESH,
  }
}
//const url = 'http://services.wine.com/api/beta/service.svc/json/catalog?apikey=aca7099dc132f00c97ac0abf5e4872e8&search='
const wineSearch = AppConfigs.wineSearch
const wineDetails = AppConfigs.wineDetails
export const wineUpdate = ({ prop, value }) => {
  return {
    type: 'TEST_WINE_UPDATE',
    //type: WINE_UPDATE,
    payload: { prop, value }
  }


  /*
  return {
    type: WINE_UPDATE,
    payload: { prop, value }
  }
  return function(dispatch) {
		dispatch(requestData());
		return axios({
			url: url+search,
			timeout: 20000,
			method: 'get',
			responseType: 'json'
		})
			.then(function(response) {
				dispatch(receiveData(response.data));
			})
			.catch(function(response){
				dispatch(receiveError(response.data));
				//dispatch(pushState(null,'/error'));
			})
	}
  */
}
  export function wineData(search) {
    console.log('search ',wineDetails+search.code);
    return function(dispatch) {
      dispatch(requestData("wines_modal"));

    return fetch(wineDetails+search.code)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      }).then((data) => {
        dispatch(receiveWineData(data))
        console.log(data);
      })
      .catch((error) => {
        dispatch(receiveError(responseJson.data))
      });
    }
  }

  /*
// MODAL DATA for single bottles
export function wineData(search){
  console.log(search.code);
  return function(dispatch) {
		dispatch(requestData());
		return axios({
			url: wineDetails+search.code,
			timeout: 20000,
			method: 'get',
			responseType: 'json'
		})
			.then(function(response) {
				dispatch(receiveWineData(response.data));
			})
			.catch(function(response){
				dispatch(receiveError(response.data));
				//dispatch(pushState(null,'/error'));
			})
	}
}
*/
  export function searchWine({search}) {
    return function(dispatch) {
      dispatch(requestData("wines"))
    return fetch(wineSearch+search)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      }).then((data) => {
        dispatch(receiveData(data))
        console.log(data);
      })
      .catch((error) => {
        dispatch(receiveError(responseJson.data))
      });
    }
  }

  /*
export function searchWine({search}) {
	return function(dispatch) {
		dispatch(requestData());
		return axios({
			url: wineSearch+search,
			timeout: 20000,
			method: 'get',
			responseType: 'json'
		})
			.then(function(response) {
				dispatch(receiveData(response.data));
			})
			.catch(function(response){
				dispatch(receiveError(response.data));
				//dispatch(pushState(null,'/error'));
			})
	}
};
*/
  export function getWineDetails({search}) {
    return function(dispatch) {
      dispatch(requestData())
    return fetch(wineDetails+search)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      }).then((data) => {
        dispatch(receiveData(data))
        console.log(data);
      })
      .catch((error) => {
        dispatch(receiveError(responseJson.data))
      })
    }
  }

  /*
export function getWineDetails({search}){
  return function(dispatch) {
		dispatch(requestData());
		return axios({
			url: wineDetails+search,
			timeout: 20000,
			method: 'get',
			responseType: 'json'
		})
			.then(function(response) {
				dispatch(receiveData(response.data));
			})
			.catch(function(response){
				dispatch(receiveError(response.data));
				//dispatch(pushState(null,'/error'));
			})
	}
}
*/
//Load wines from firebase
export function loadWines (currentLocalID) {
  return dispatch => {
    dispatch(getWineRequestedAction());
    const winesRef = companyRef.child(`${currentLocalID}`).child('wines')
    return winesRef.on('value', snap => {
      const wines = snap.val();
      console.log("snap.key " , wines);
      dispatch(getWineFulfilledAction(wines))
    })
  }
  //
}
function getWineRequestedAction() {
  return {
    type: WINES_REQUESTED
  };
}

function getWineRejectedAction() {
  return {
    type: WINES_REJECTED
  }
}

function getWineFulfilledAction(wines) {
  console.log('wines ', wines);
  return {
    type: WINES_LOADED,
    payload: wines
  };
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

export const wineCreate = ({ winename, winery,
  varietal, vintage, winenotes, region, image, glass, link, code }) => {
  const { currentUser } = firebase.auth();
  var currentLocalID
  var idRef = firebase.database().ref(`/users/${currentUser.uid}/currentID`);
  return dispatch => {
    dispatch(createWineAction());
    return idRef.once('value',function(snapshot){
      currentLocalID = snapshot.val()
      console.log('idRef ', currentLocalID)
      const id = Math.random().toString(36).substring(7)
      const winesRef = companyRef.child(`${currentLocalID}`).child('wines').child(id)
      console.log('imageURL ', image);
      winesRef.set({
        key: id,
        name: winename ? winename : "",
        link: link ? link : "",
        code: code ? code : "",
        description: winenotes ? winenotes : "",
        winery: winery ? winery : "",
        varietal: varietal ? varietal : "",
        glass: glass,
        imageURL: image ? image : "",
        region: region ? region : "",
        time: new Date().getTime(),
        createdBy: currentUser.uid,
      })
      dispatch(wineCreateSuccess())
    })
      .catch((error) => {
        console.log(error);
        dispatch(wineCreateError());
      })
      /*
    idRef.once('value',function(snapshot){
      currentLocalID = snapshot.val()
      console.log('idRef ', currentLocalID)
      const id = Math.random().toString(36).substring(7)
      const winesRef = companyRef.child(`${currentLocalID}`).child('wines').child(id)
      console.log('imageURL ', image);
      winesRef.set({
        name: winename ? winename : "",
        description: winenotes ? winenotes : "",
        winery: winery ? winery : "",
        varietal: varietal ? varietal : "",
        glass: glass ? glass : "",
        imageURL: image ? image : "",
        region: region ? region : "",
        time: new Date().getTime(),
        createdBy: currentUser.uid,
      }, function(error) {
        if (error) {
          Alert.alert(
            'ERROR',
            'Data could not be saved.',
            [
              {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          )

        } else {
          Alert.alert(
            'SUCCESS',
            'Data was saved.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          )

        }
      })
    })*/
  }

};

export const wineFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/wines`)
      .on('value', snapshot => {
        dispatch({ type: WINES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const wineSave = ({ name, description, type, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/wines/${uid}`)
      .set({ name, description, type })
      .then(() => {
        dispatch({ type: WINE_SAVE_SUCCESS });
        //Actions.employeeList({ type: 'reset' });
      });
  };
};

export const wineDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/wines/${uid}`)
      .remove()
      .then(() => {
        //Actions.employeeList({ type: 'reset' });
      });
  };
};
