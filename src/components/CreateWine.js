import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native'

import {
  Button,
  SocialIcon,
  Card,
  FormLabel,
  FormInput
} from 'react-native-elements'
import AppConfig from '../configs/config'
import { Input } from './common'
import { CardSection } from './common'
import { connect } from 'react-redux'
import { wineUpdate, wineCreate, searchWine } from '../actions'
import AppStyles from '../configs/styles'
import WineForm from './WineForm'


class CreateWine extends Component {

  onSearchPress(){
    const { search } = this.props
    this.props.searchWine({search})
  }

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={[AppStyles.backColor, AppStyles.flex1]}
        contentContainerStyle={AppStyles.createWine}>
      <View  >
          <WineForm {...this.props} />
      </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, description, type, search, results } = state.wines;

  return { name, description, type, search, results };
};

export default connect(mapStateToProps, {
  wineUpdate, wineCreate, searchWine
})(CreateWine);
