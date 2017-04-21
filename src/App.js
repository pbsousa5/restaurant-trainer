import React from 'react'
import { AppRegistry } from 'react-native'


import configureStore from './store/configureStore'
const store = configureStore()

import NavigationRootContainer from './containers/navRootContainer'
import { connect, Provider } from 'react-redux'
import { Router } from 'react-native-router-flux';
import NavRouter from './components/NavRouter'
import AppWithNavigationState from './navigators/AppNavigator'
const ConnectedRouter = connect()(Router)
//<NavRouter />
const App = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
)
//<NavigationRootContainer />

AppRegistry.registerComponent('ordr', () => App)
