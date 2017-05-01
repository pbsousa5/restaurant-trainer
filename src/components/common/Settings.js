import React, {
  Component
} from 'react'
import {
  StyleSheet,
  View,
  Text,
  ListView,
  FlatList,
  ListViewDataSource,
  TouchableOpacity
} from 'react-native'
import AppConfig from '../../configs/config'
import AppStyles from '../../configs/styles'
import { MenuIcon} from './menu/MenuIcon'
import { connect } from 'react-redux';

class Settings extends Component{
  constructor (props) {
    super(props)
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'SETTINGS',
    headerTitleStyle: {
       alignSelf: 'center',
       marginRight: 56,
    },
    headerLeft:
    <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
      <MenuIcon style={AppStyles.menuIcon}/>
    </TouchableOpacity>,

  });

  render() {
    return(
      <View style={AppStyles.appContainer}>
        <Text>Settings Page</Text>
      </View>
      )
    }
}

const mapStateToProps = (state) => {
  const { isAdmin } = state.admin;
  return { isAdmin };
};

export default connect(mapStateToProps)(Settings);
