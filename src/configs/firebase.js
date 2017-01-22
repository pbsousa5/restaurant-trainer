import firebase, { initializeApp } from 'firebase'
import { addItemSuccess, removeItemSuccess, goOnline, goOffline } from '../actions/items'
import { config } from './fb_config'


const firebaseApp = initializeApp(config)
export const itemsRef = firebaseApp.database().ref('items')
export const winesRef = firebaseApp.database().ref('wines')
export const databaseRef = firebaseApp.database();
export const companyRef = firebaseApp.database().ref('companies')
const connectedRef = firebaseApp.database().ref('.info/connected')
const storage = firebase.storage();
export const storageRef = storage.ref();

export function syncFirebase(store) {
  itemsRef.on('child_added', (snapshot) => {
    store.dispatch(addItemSuccess(snapshot.val()))
  })

  itemsRef.on('child_removed', (snapshot) => {
    store.dispatch(removeItemSuccess(snapshot.val().id))
  })

  connectedRef.on('value', snap => {
    if (snap.val() === true) {
      store.dispatch(goOnline())
    } else {
      store.dispatch(goOffline())
    }
  })
}

export function GetLocalRef(uid){

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

      }
    });
  }, function(error) {
    // The fetch failed.
    console.error(error);
  });
  return currentLocalID
}
