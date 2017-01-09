import firebase from 'firebase';
import {
  winesRef,
  companyRef,
  databaseRef,
  GetLocalRef
} from '../configs/firebase'
import LocalStore from 'react-native-simple-store';
import axios from 'axios';
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
  WINES_REFRESH
} from './types';


function requestData() {
	return {
    type: REQ_DATA
  }
}
function receiveData(results) {
	return{
		type: WINE_SEARCH_RESULTS,
		payload: results
	}
};
export function toggleModal(){
  console.log('toggle ');
  return{
    type: TOGGLE_MODAL
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

    type: WINE_UPDATE,
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
//Load wines from firebase
export function loadWines (currentLocalID) {
  return dispatch => {
    dispatch(getWineRequestedAction());
    const winesRef = companyRef.child(`${currentLocalID}`).child('wines')
    return winesRef.once('value', snap => {
      const wines = snap.val();
      dispatch(getWineFulfilledAction(wines))
    })
    .catch((error) => {
      console.log(error);
      dispatch(getWineRejectedAction());
    });
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
  return {
    type: WINES_LOADED,
    payload: wines
  };
}


export const wineCreate = ({ name, description, type }) => {

  const { currentUser } = firebase.auth();
  var currentLocalID


  var idRef = firebase.database().ref(`/users/${currentUser.uid}/currentID`);
  idRef.once('value', function(thisID) {
    // The first callback succeeded; go to the second.
    idRef.child('readCount').transaction(function(current) {
      // Increment readCount by 1, or set to 1 if it was undefined before.
      return (current || 0) + 1;
    }, function(error, committed, snapshot) {
      if (error) {
        // The fetch succeeded, but the update failed.
        console.error(error);
      } else {
        currentLocalID = thisID.val()
        const id = Math.random().toString(36).substring(7);
        const winesRef = companyRef.child(`${currentLocalID}`).child('wines').child(id)
      //  console.log(thisID.val())
        winesRef.set({
          name: name,
          description: description,
          type: type,
          time: new Date().getTime(),
          createdBy: currentUser.uid,
          imageURL: '',
          region: ''
        })

      }
    });
  }, function(error) {
    // The fetch failed.
    console.error(error);
  });

  return {
    type: WINE_CREATE
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
