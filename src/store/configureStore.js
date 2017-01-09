import { createStore, applyMiddleware } from 'redux'

import rootReducer from '../reducers'
import syncOffline from './syncOffline'
import { syncFirebase } from '../configs/firebase'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios';
import * as Actions from '../actions'


const logger = createLogger();

export default function configureStore () {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk,logger)
  )
  syncOffline(store)
  syncFirebase(store)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }
  // immediately check firebase if the user is Authed in already
  store.dispatch(Actions.startAuthListener());
  return store
}
