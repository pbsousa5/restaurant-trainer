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
import { Actions, Router, Scene, Switch, Modal, Schema, Reducer, ActionConst } from 'react-native-router-flux';
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
        this._handleBackAction = this._handleBackAction.bind(this)
        this._toggleSideMenu = this._toggleSideMenu.bind(this)
        this._handleNavigate = this._handleNavigate.bind(this)
    }
    componentDidMount() {

      BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)
    }
    componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction)
    }
    _handleBackAction = () =>{
      return null
    }
    _toggleSideMenu = () => {
        Actions.refresh({key: 'drawer', open: value => !value });
        //console.log('toggle side menu');
    }
    _handleNavigate(action) {
      //console.log("NAVIGATE ",action);
      switch (action) {
        case "editwine":
          return Actions.editWine()
        case "editapps":
          return Actions.editApp()
        default: return
      }
    }

    _renderMenuButton(){
      return(
        <TouchableOpacity onPress={() => this._toggleSideMenu()}>
          <Icon name='menu' size={30} iconStyle={[AppStyles.iconColor, {paddingBottom:20}]}  />
        </TouchableOpacity>
      )
    }
    _routeToCreateWine = () => {
      this.props.refreshingWines()
      Actions.createWine()
    }
    _routeToCreateApps = () => {
      this.props.refreshingApps()
      Actions.createApp()
    }
    _createButton(loc){
      switch(loc){
        case "wine":
          return(
            <TouchableOpacity onPress={() => this._routeToCreateWine()}>
              <Icon name='add' size={30} iconStyle={[AppStyles.iconColor, {paddingBottom:20}]} />
            </TouchableOpacity>
          )
        case "appetizer":
          return(
            <TouchableOpacity onPress={() => this._routeToCreateApps()}>
              <Icon name='add' size={30} iconStyle={[AppStyles.iconColor, {paddingBottom:20}]} />
            </TouchableOpacity>
          )
        case "editWine":
          return(
            <TouchableOpacity onPress={() => this.props.wineEditSwitch()}>
              <Icon type='ionicon' name="md-clipboard" size={30} iconStyle={[AppStyles.iconColor, {paddingBottom:20}]} />
            </TouchableOpacity>
          )
        case "editApp":
          return(
            <TouchableOpacity onPress={() => this.props.appEditSwitch()}>
              <Icon type='ionicon' name="md-clipboard" size={30} iconStyle={[AppStyles.iconColor, {paddingBottom:20}]} />
            </TouchableOpacity>
          )
      }

    }
    _renderBackButton(loc){
      switch(loc){
        case "wine":
          return(
            <TouchableOpacity onPress={() => Actions.wines({type:"replace"})}>
              <Icon name='arrow-back' size={30} iconStyle={[AppStyles.iconColor, {paddingBottom:20}]} />
            </TouchableOpacity>
          )
        case "appetizer":
          return(
            <TouchableOpacity onPress={() => Actions.appetizers({type:"replace"})}>
              <Icon name='arrow-back' size={30} iconStyle={[AppStyles.iconColor, {paddingBottom:20}]} />
            </TouchableOpacity>
          )
        default: return
      }

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
              <Scene
                key="root"
                hideNavBar={true}
                component={connect(state=>({LoggedIn:state.userLogged}))(Switch)}
                selector={props=>this.props.LoggedIn ? "drawer" : "login"} >
                <Scene
                  key="drawer"
                  component={MenuDrawer}
                  open={false}>
                  <Scene
                   key="main" type="replace">
                    <Scene
                      key="home"
                      component={Home}
                      title="HOME"
                      renderBackButton={this._renderMenuButton.bind(this)}
                      />
                    <Scene
                      key="wines"
                      renderRightButton={this._createButton.bind(this, "wine")}
                      component={Wines}
                      _handleNavigate={this._handleNavigate.bind(this)}
                      renderBackButton={this._renderMenuButton.bind(this)}
                      title="WINES"/>
                      <Scene
                        key="createWine"
                        renderBackButton={this._renderBackButton.bind(this, "wine")}
                        component={CreateWine}
                        title="ADD WINE"/>
                      <Scene
                        key="editWine"
                        renderBackButton={this._renderBackButton.bind(this, "wine")}
                        renderRightButton={this._createButton.bind(this, "editWine")}
                        component={EditWine}
                        title="EDIT WINE"/>

                      <Scene
                        key="appetizers"
                        _handleNavigate={this._handleNavigate.bind(this)}
                        renderBackButton={this._renderMenuButton.bind(this)}
                        renderRightButton={this._createButton.bind(this, "appetizer")}
                        component={Appetizers}
                        title="APPETIZERS"/>
                      <Scene
                        key="createApp"
                        renderBackButton={this._renderBackButton.bind(this, "appetizer")}
                        component={CreateApps}
                        title="ADD APPETIZER"/>
                      <Scene
                        key="editApp"
                        renderBackButton={this._renderBackButton.bind(this, "appetizer")}
                        renderRightButton={this._createButton.bind(this, "editApp")}
                        component={EditApps}
                        title="EDIT APPETIZER"/>
                  </Scene>
                </Scene>
                <Scene key="login" direction="vertical" >
                  <Scene key="loginDefault"  component={Login} title="LOGIN" schema="modal" initial={true}/>
                  <Scene key="validation"  component={ValidationForm} title="EMAIL"/>
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
