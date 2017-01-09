import React from 'react'
import { AppRegistry } from 'react-native'

import configureStore from './src/store/configureStore'
const store = configureStore()

import NavigationRootContainer from './src/containers/navRootContainer'
import { Provider } from 'react-redux'

const App = () => (
  <Provider store={store}>
    <NavigationRootContainer />
  </Provider>
)
AppRegistry.registerComponent('Exp_Nav', () => App)
