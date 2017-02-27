import React, {Component} from 'react'
import Home from './Home'
import About from './About'
import Login from './Login'
import MenuDrawer from './common/MenuDrawer'
import ImageSelect from './common/ImageSelect'
import LoadingScreen from './common/LoadingScreen'
import AnimatedModal from './AnimationModal'
import ValidationForm from './social/validationForm'
import CreateWine from './CreateWine'
import CreateApps from './common/CreateApps'
import AdminPage from './AdminPage'
import EditWine from './common/EditWine'
import EditApps from './common/EditApps'
import Appetizers from './Appetizers'
import Wines from './Wines'
import {connect} from 'react-redux'
import { refreshingWines, wineEditSwitch, appEditSwitch, refreshingApps } from '../actions'
import { Actions, Router, Scene, Switch, Modal, Schema, Reducer } from 'react-native-router-flux';
import {BackAndroid, NavigationExperimental, View, StyleSheet, TouchableOpacity} from 'react-native'
//import { NavigationBar } from '@shoutem/ui/navigation';
import {
    Image,
    ListView,
    Tile,
    Title,
    Subtitle,
    Overlay,
    Screen,
    NavigationBar,
    Button
} from '@shoutem/ui';
import { StyleProvider } from '@shoutem/theme';
import {SideMenu, List, Icon, ListItem} from 'react-native-elements'

import AppStyles from '../configs/styles'


const RouterWithRedux = connect()(Router)
const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
}

class NavRouter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            selectedItem: 'Home',
        }
        //this._renderScene = this._renderScene.bind(this)
        //this._handleBackAction = this._handleBackAction.bind(this)
        this._toggleSideMenu = this._toggleSideMenu.bind(this)
        //this._handleNavigate = this._handleNavigate.bind(this)
    }
    /*
    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)
    }
    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction)
    }*/

    _toggleSideMenu() {
        Actions.refresh({key: 'drawer', open: value => !value });
        console.log('toggle side menu');
    }
    updateMenuState(isOpen) {
        this.setState({isOpen});
    }
    onMenuItemSelected = (key, title) => {
      //console.log('menu key: ', key);
      this.setState({isOpen: false, selectem: key});
      // TODO NAVIGATE
    }

    _renderNavBar = () => {
      return (
        <NavigationBar styleName="fade" leftComponent={(
            <TouchableOpacity onPress={() => {this._toggleSideMenu()}}>
                <Icon type='ionicon' name="md-menu" iconStyle={AppStyles.iconColor}/>
            </TouchableOpacity>
        )} centerComponent={< Title >HOME< /Title>}/>
      )
    }
    navBarButton(){
      return(
        <TouchableOpacity onPress={() => {this._toggleSideMenu()}}>
          <Icon name='ios-menu' size={40} iconStyle={AppStyles.iconColor} />
        </TouchableOpacity>
      )
    }
    render() {

      // wait for response from firebase to check if user is logged in or not
      if(!this.props.hasResponded){
        return(
          <LoadingScreen />
        )
      }else{
        return (
          <RouterWithRedux createReducer={reducerCreate}>
             <Scene key="modal" component={Modal} hideNavBar={true}>
              <Scene
                key="root"
                hideNavBar={true}
                component={connect(state=>({LoggedIn:state.userLogged}))(Switch)}
                tabs={true}
                selector={props=>this.props.LoggedIn ? "drawer" : "login"} >
                <Scene key="drawer" component={MenuDrawer}
                   open={false} hideNavBar={true}>
                  <Scene key="navbar"
                    renderBackButton={()=>{ return null; }}
                    renderLeftButton={this.navBarButton} >
                    <Scene key="home" component={Home} title="HOME" initial tabs={true} />
                    <Scene key="wines" component={Wines} title="WINES" renderBackButton={()=>{ return null; }} renderLeftButton={this.navBarButton}/>
                    <Scene key="appetizers" component={Appetizers} title="APPETIZERS" renderBackButton={()=>{ return null; }} renderLeftButton={this.navBarButton}/>
                  </Scene>
                </Scene>
                <Scene key="login" direction="vertical" >
                  <Scene key="loginDefault"  component={Login} title="LOGIN" schema="modal" initial={true}/>
                  <Scene key="validation"  component={ValidationForm} title="EMAIL"/>
                </Scene>
              </Scene>
            </Scene>
          </RouterWithRedux>
        )
      }
  }
}

const mapStateToProps = state => {
  const {  loaded, clearWineEdit } = state.wines;
  const { hasResponded, LoggedIn } = state.userLogged;
  return {myCompany: state.myCompany.company, loaded, clearWineEdit, hasResponded, LoggedIn};
}


export default connect(mapStateToProps,
  { refreshingWines, wineEditSwitch, appEditSwitch, refreshingApps })(NavRouter);
