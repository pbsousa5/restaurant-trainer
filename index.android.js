import React from 'react'
import { AppRegistry } from 'react-native'

import configureStore from './src/store/configureStore'
const store = configureStore()

import NavigationRootContainer from './src/containers/navRootContainer'
import { connect, Provider } from 'react-redux'
import { Router } from 'react-native-router-flux';
import NavRouter from './src/components/NavRouter'

const App = () => (
  <Provider store={store}>
      <NavRouter />
  </Provider>
)
//<NavigationRootContainer />

AppRegistry.registerComponent('ordr', () => App)
