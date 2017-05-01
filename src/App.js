import React from 'react'
import { AppRegistry } from 'react-native'
import configureStore from './store/configureStore'
import { connect, Provider } from 'react-redux'
import AppWithNavigationState from './navigators/AppNavigator'

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
)

AppRegistry.registerComponent('ordr', () => App)
