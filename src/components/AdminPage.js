import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ListView,
  TouchableOpacity
} from 'react-native'
import {
  loadCompanies,
} from '../actions'
import AppStyles from '../configs/styles'
import AppConfig from '../configs/config'
import AppUtil from '../configs/util';
import {connect} from 'react-redux'
import { Tabs, Tab, Icon } from 'react-native-elements'
import Companies from './common/Companies'
import Users from './common/Users'
import { MenuIcon} from './common/menu/MenuIcon'

class AdminPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'companies',
    }
    this.changeTab = this.changeTab.bind(this)

  }
  static navigationOptions = ({ navigation }) => ({
    title: 'ADMIN',
    headerTitleStyle: {
       alignSelf: 'center',
       marginRight: 56,
    },
    headerLeft:
    <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
      <MenuIcon style={AppStyles.menuIcon}/>
    </TouchableOpacity>,

  });
  changeTab (selectedTab) {
    this.setState({selectedTab})
  }


  render() {

    const { selectedTab } = this.state
    return(
      <View style={AppStyles.appContainer}>
        <Tabs>
          <Tab
            titleStyle={[{fontWeight: 'bold', fontSize: 10}]}
            selectedTitleStyle={{marginTop: -1, marginBottom: 6, color:AppConfig.orangeColor}}
            selected={selectedTab === 'companies'}
            title={selectedTab === 'companies' ? 'COMPANIES' : null}
            renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}}
              color={'#5e6977'} name='whatshot' size={33} />}
            renderSelectedIcon={() => <Icon color={AppConfig.orangeColor} name='whatshot' size={30} />}
            onPress={() => this.changeTab('companies')}>
            <Companies />
          </Tab>
          <Tab
            titleStyle={{fontWeight: 'bold', fontSize: 10}}
            selectedTitleStyle={{marginTop: -1, marginBottom: 6,color:AppConfig.orangeColor}}
            selected={selectedTab === 'users'}
            title={selectedTab === 'users' ? 'USERS' : null}
            renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='person' size={33} />}
            renderSelectedIcon={() => <Icon color={AppConfig.orangeColor} name='person' size={30} />}
            onPress={() => this.changeTab('users')}>
            <Users />
          </Tab>
        </Tabs>
      </View>
    )
  }

}

const mapStateToProps = state => {
  const { companies } = state.admin
  return { companies }
}

export default connect(mapStateToProps, {
  loadCompanies
})(AdminPage);
