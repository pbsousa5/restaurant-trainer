import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import {Image, StyleSheet} from 'react-native'
import { StackNavigator, addNavigationHelpers, DrawerNavigator } from 'react-navigation'
import Home from '../components/Home'
import About from '../components/About'
import Login from '../components/Login'
import MenuDrawer from '../components/common/MenuDrawer'
import ImageSelect from '../components/common/ImageSelect'
import LoadingScreen from '../components/common/LoadingScreen'
import AnimatedModal from '../components/AnimationModal'
import ValidationForm from '../components/social/validationForm'
import CreateWine from '../components/CreateWine'
import CreateApps from '../components/common/CreateApps'
import AdminPage from '../components/AdminPage'
import EditWine from '../components/common/EditWine'
import EditApps from '../components/common/EditApps'
import Appetizers from '../components/Appetizers'
import Wines from '../components/Wines'


const HomeStack = StackNavigator({
  	Home: {screen: Home},
	},
	{
    headerMode: 'screen',
  },
);

const WinesStack = StackNavigator({
  Wines: { screen: Wines },
  CreateWine: { screen: CreateWine },
  ViewWine: {screen: EditWine },
});

const AppStack = StackNavigator({
  Appetizers: { screen: Appetizers },
  CreateApp: { screen: CreateApps },
  ViewApp: { screen: EditApps },
});

const InnerNavigator = DrawerNavigator ({
      Home: { screen: HomeStack },
			Wines: {screen: WinesStack},
			Appetizers: { screen: AppStack },
})
const LoginStack = StackNavigator ({
  initialRouteName: {screen: Login},
  EmailLogin:{screen: ValidationForm},
})

export const AppNavigator = StackNavigator(
  {
    Loading: { screen: LoadingScreen },
		LoginStart: { screen: LoginStack },
    Home: { screen: InnerNavigator },
  },
  {
    headerMode: 'none'
  }
);

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);





AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  nav: state.nav,
  hasResponded: state.userLogged,
  LoggedIn:  state.userLogged,
  loaded: state.wines,
  clearWineEdit: state.wines,
  myCompany: state.myCompany.company,
})

export default connect(mapStateToProps)(AppWithNavigationState)
const styles = StyleSheet.create({
	icon: {
		width: 24,
		height: 24,
	},
})
