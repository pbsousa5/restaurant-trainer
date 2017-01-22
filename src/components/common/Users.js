import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ListView
} from 'react-native'
import AppStyles from '../../configs/styles'
import AppUtil from '../../configs/util';
import {connect} from 'react-redux'
import { Card, Tab, Icon } from 'react-native-elements'

class Users extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <View style={AppStyles.appContainer}>
        <Card />
      </View>
    )
  }

}

const mapStateToProps = state => {
  const { companies } = state.admin
  return { companies }
}

export default connect(mapStateToProps, {

})(Users);
