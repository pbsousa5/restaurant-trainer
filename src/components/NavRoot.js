import React, {Component} from 'react'
import Home from './Home'
import About from './About'
import Login from './Login'
//import UploadImage from './common/UploadImage'
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
import Menu from './common/menu/Menu';
import AppStyles from '../configs/styles'

const {CardStack: NavigationCardStack} = NavigationExperimental

class NavRoot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            selectedItem: 'Home'
        }
        this._renderScene = this._renderScene.bind(this)
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

    _toggleSideMenu() {
        this.setState({
            isOpen: !this.state.isOpen
        })

        console.log('toggle ' + this.state.isOpen);
    }
    updateMenuState(isOpen) {
        this.setState({isOpen});
    }

    onMenuItemSelected = (key, title) => {
      //console.log('menu key: ', key);
        this.setState({isOpen: false, selectem: key});
        route = {
            index:0,
            type: 'push',
            route: {
                key: key,
                title: title
            }
        }
        this._handleNavigate(route)
        //console.log('menu ' + key);
    }
    _sceneNavigateEdits = (go) => {

      //console.log('_sceneNavigate ', go);

      switch(go){
        case "createwine":
          this.props.refreshingWines()
          this.onMenuItemSelected('createwine', 'ADD WINE')
        case "beers":
          return
        case "createapps":
          this.props.refreshingApps()
          this.onMenuItemSelected('createapps', 'ADD APPETIZER')
      }

    }

    _renderScene(props) {

        const {route} = props.scene
        const menu = <Menu onItemSelected={this.onMenuItemSelected.bind(this)}/>
        //console.log('_renderScene route: ', route.key);
        switch (route.key) {
            case 'loading':
              return (<LoadingScreen  _handleNavigate={this._handleNavigate.bind(this)}/>)
            case 'home':
                return (<View style={styles.container}>
                    <SideMenu menu={menu} isOpen={this.state.isOpen} onChange={(isOpen) => this.updateMenuState(isOpen)}>
                        <Home _handleNavigate={this._handleNavigate.bind(this)}/>
                    </SideMenu>
                </View>)

            case 'wines':
                return (
                    <View style={styles.container}>
                        <SideMenu menu={menu} isOpen={this.state.isOpen}
                          onChange={(isOpen) => this.updateMenuState(isOpen)}>
                            <Wines _handleNavigate={this._handleNavigate.bind(this)}/>
                        </SideMenu>
                    </View>

                )
            case 'appetizers':
                return (
                    <View style={styles.container}>
                        <SideMenu menu={menu} isOpen={this.state.isOpen}
                          onChange={(isOpen) => this.updateMenuState(isOpen)}>
                            <Appetizers _handleNavigate={this._handleNavigate.bind(this)}/>
                        </SideMenu>
                    </View>
                )
            case 'beers':
              return(
                <View style={styles.container}>
                    <SideMenu menu={menu} isOpen={this.state.isOpen}
                      onChange={(isOpen) => this.updateMenuState(isOpen)}>
                        <ImageSelect />
                    </SideMenu>
                </View>
              )
            case 'about':
                return (<About _goBack={this._handleBackAction.bind(this)}/>)
            case 'login':
                return (<Login _handleNavigate={this._handleNavigate.bind(this)}/>)
            case 'modal':
                return (<AnimatedModal/>)
            case 'validate':
                return <ValidationForm _goBack={this._handleBackAction.bind(this)}
                  _handleNavigate={this._handleNavigate.bind(this)}/>
            case 'createwine':
                  if(this.props.clearWineEdit){
                    console.log("CLEAR WINE EDIT");
                    return ( null )
                    this.props.clearWineEdit = false
                  }else{
                    return (<CreateWine/>)
                  }
            case 'createapps':
                return (<CreateApps/>)
            case 'editwine':
                return (<EditWine _handleNavigate={this._handleNavigate.bind(this)}/>)
            case 'editapps':
                return (<EditApps _handleNavigate={this._handleNavigate.bind(this)}/>)
            case 'admin':
                return (<View style={styles.container}>
                    <SideMenu menu={menu} isOpen={this.state.isOpen} onChange={(isOpen) => this.updateMenuState(isOpen)}>
                        <AdminPage _handleNavigate={this._handleNavigate.bind(this)}/>
                    </SideMenu>
                </View>)
            default:
                return null
        }
    }

    _renderNavBar(props) {
        const {route} = props.scene

        const titleConfig = {
            title: route.title
        }
        // certain screens dont need a navbar
        switch (route.key) {

            case 'home':
              if(!this.props.myCompany){
                // company is not created yet
                // do not show side menu until it exists
                return <NavigationBar styleName="light" centerComponent={< Title > HOME < /Title>}/>
              }else{
                // company is created so show side menu
                return <NavigationBar styleName="fade" leftComponent={(
                    <TouchableOpacity onPress={() => this._toggleSideMenu()}>
                        <Icon type='ionicon' name="md-menu" iconStyle={AppStyles.iconColor}/>
                    </TouchableOpacity>
                )} centerComponent={< Title >HOME< /Title>}/>
              }
            case "beers":
              return <NavigationBar leftComponent={(
                  <TouchableOpacity onPress={() =>this._toggleSideMenu()}>
                      <Icon type='ionicon' name="md-menu" iconStyle={AppStyles.iconColor}/>
                  </TouchableOpacity>
              )} centerComponent={< Title >BEERS< /Title>} rightComponent={(
                  <TouchableOpacity onPress={() =>this._sceneNavigateEdits('beers')}>
                      <Icon type='ionicon' name="md-add" iconStyle={AppStyles.iconColor}/>
                  </TouchableOpacity>
              )}/>
            case 'wines':
                return <NavigationBar leftComponent={(
                    <TouchableOpacity onPress={() =>this._toggleSideMenu()}>
                        <Icon type='ionicon' name="md-menu" iconStyle={AppStyles.iconColor}/>
                    </TouchableOpacity>
                )} centerComponent={< Title >WINES< /Title>} rightComponent={(
                    <TouchableOpacity onPress={() =>this._sceneNavigateEdits('createwine')}>
                        <Icon type='ionicon' name="md-add" iconStyle={AppStyles.iconColor}/>
                    </TouchableOpacity>
                )}/>
            case 'appetizers':
                return <NavigationBar leftComponent={(
                    <TouchableOpacity onPress={() =>this._toggleSideMenu()}>
                        <Icon type='ionicon' name="md-menu" iconStyle={AppStyles.iconColor}/>
                    </TouchableOpacity>
                )} centerComponent={< Title >APPETIZERS< /Title>} rightComponent={(
                    <TouchableOpacity onPress={() =>this._sceneNavigateEdits('createapps')}>
                        <Icon type='ionicon' name="md-add" iconStyle={AppStyles.iconColor}/>
                    </TouchableOpacity>
                )}/>
            case 'about':
                return <NavigationBar centerComponent={< Title >ABOUT< /Title>}/>
            case 'login':
                return <NavigationBar centerComponent={< Title >LOGIN< /Title>}/>
            case 'validate':
                return <NavigationBar leftComponent={(<Icon name='md-arrow-round-back' type='ionicon' iconStyle={AppStyles.iconColor} onPress={this._handleBackAction}/>)} title="SIGNUP"></NavigationBar>
            case 'createwine':
                return <NavigationBar leftComponent={(
                  <Icon name='md-arrow-round-back'
                    type='ionicon' iconStyle={AppStyles.iconColor}
                    onPress={() =>this._handleBackAction()}/>)}
                    title="ADD WINE"></NavigationBar>
            case 'createapps':
                return <NavigationBar leftComponent={(
                  <Icon name='md-arrow-round-back'
                    type='ionicon' iconStyle={AppStyles.iconColor}
                    onPress={() =>this._handleBackAction()}/>)}
                    title="ADD APPETIZER"></NavigationBar>

            case 'editwine':
              return <NavigationBar leftComponent={(
                  <TouchableOpacity onPress={() => this._handleBackAction()}>
                      <Icon type='ionicon' name="md-arrow-round-back" iconStyle={AppStyles.iconColor}/>
                  </TouchableOpacity>
              )} centerComponent={< Title >VIEW WINE< /Title>} rightComponent={(
                  <TouchableOpacity onPress={() =>this.props.wineEditSwitch()}>
                      <Icon type='ionicon' name="md-clipboard" iconStyle={AppStyles.iconColor}/>
                  </TouchableOpacity>
              )}/>
            case 'editapps':
              return <NavigationBar leftComponent={(
                  <TouchableOpacity onPress={() => this._handleBackAction()}>
                      <Icon type='ionicon' name="md-arrow-round-back" iconStyle={AppStyles.iconColor}/>
                  </TouchableOpacity>
              )} centerComponent={< Title >VIEW APPETIZER< /Title>} rightComponent={(
                  <TouchableOpacity onPress={() =>this.props.appEditSwitch()}>
                      <Icon type='ionicon' name="md-clipboard" iconStyle={AppStyles.iconColor}/>
                  </TouchableOpacity>
              )}/>
            case "admin":
              return <NavigationBar leftComponent={(
                  <TouchableOpacity onPress={() =>this._toggleSideMenu()}>
                      <Icon type='ionicon' name="md-menu" iconStyle={AppStyles.iconColor}/>
                  </TouchableOpacity>
              )} centerComponent={< Title >ADMIN< /Title>} />
            default:
                return null
        }
    }
    _handleBackAction() {

      // clear list for wine search
      if(this.props.loaded){
        this.props.refreshingWines()
      }
      console.log(this.props.navigation.index);
      if (this.props.navigation.index === 0) {
          return false
      }
      this.props.popRoute()
      return true
    }
    _handleNavigate(action) {
        console.log("navigate " + action.route);
        switch (action && action.type) {
            case 'push':
              this.props.pushRoute(action.route);
              return true
            case 'back':
              return this._handleBackAction()
            case 'pop':
              return this.props.popRoute(action.route)
            case 'replace':
              return this.props.replaceRoute(action.route)
            case 'jump':
              return this.props.jumpRoute(action.route)
            default:
              return false
        }
    }
    render() {
        return (
          <NavigationCardStack
          direction='horizontal'
          navigationState={this.props.navigation}
          onNavigate={this._handleNavigate.bind(this)}
          renderScene={this._renderScene}
          renderHeader={this._renderNavBar.bind(this)}/>)
    }
}

const mapStateToProps = state => {
  const {  loaded, clearWineEdit } = state.wines;
  return {myCompany: state.myCompany.company, loaded, clearWineEdit};
};
export default connect(mapStateToProps, { refreshingWines, wineEditSwitch, appEditSwitch, refreshingApps })(NavRoot);
// Define a theme for the NAVBAR
const theme = {
  'shoutem.ui.NavigationBar': {
    '.dark': {
      backgroundColor: '#000'
    },

    '.light': {
      backgroundColor: '#fff'
    },
  },
};
const styles = StyleSheet.create({
    iconColor: {
        color: '#ffc100'
    },
    title: {
        marginBottom: 20,
        fontSize: 22,
        textAlign: 'center'
    },
    button: {
        position: 'absolute',
        top: 20,
        padding: 10
    },
    caption: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 60
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
})
