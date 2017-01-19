import { createStore, applyMiddleware, compose } from 'redux'
import wineReducer from '../reducers/wineFormReducer'
import reducer from '../reducers'
import syncOffline from './syncOffline'
import { syncFirebase } from '../configs/firebase'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import * as Actions from '../actions'


const logger = createLogger();
//export default compose(applyMiddleware(thunk))(createStore)(duedates);
export default function configureStore () {
  const store = createStore(
    reducer,
    compose(applyMiddleware(thunk,logger))
  )
  syncOffline(store)
  syncFirebase(store)

  if (module.hot) {
    module.hot.accept(() => {
      const reducer = require('../reducers/index').default
      store.replaceReducer(reducer)
    })
  }
  // immediately check firebase if the user is Authed in already
  store.dispatch(Actions.startAuthListener());
  return store
}
