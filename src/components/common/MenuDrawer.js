
import React , { Component, PropTypes  } from 'react'
import Drawer from 'react-native-drawer';
import SideMenuItems from './SideMenu';
import {Actions, DefaultRenderer, ActionConst} from 'react-native-router-flux';

import Menu from './menu/Menu'
export default class MenuDrawer extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired,
  }
  closeDrawer = () => {
    console.log("CLOSE");
    //this._drawer.close()
  }
  openDrawer = () => {
    this._drawer.open()
    console.log("OPEN");
  }
  onMenuItemSelected = (key, title) => {
    const {routes} = this.context
    console.log('menu key: ', key)
    this._drawer.close()
    switch(key){
      case "home":
        return routes.home()
      case "wines":
        return routes.wines()
      case "appetizers":
        return routes.appetizers()
      default:
        return
    }
  }
  render(){
    const state = this.props.navigationState
    const children = state.children

      return (
          <Drawer
            content={<Menu onItemSelected={this.onMenuItemSelected.bind(this)}/>}
            openDrawerOffset={100}
            tapToClose={true}
            tweenHandler={Drawer.tweenPresets.parallax}
            ref={(ref) => this._drawer = ref}
            open={state.open}
            onOpen={()=>Actions.refresh({key:state.key, open: true})}
            onClose={()=>Actions.refresh({key:state.key, open: false})}
            type="displace"
            >
            <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
          </Drawer>
      )
  }
}

const mapStateToProps = state => {
  const {  loaded, clearWineEdit } = state.wines;
  return {myCompany: state.myCompany.company, loaded, clearWineEdit};
};
