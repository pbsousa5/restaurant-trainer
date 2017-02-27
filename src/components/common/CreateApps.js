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
import AppConfig from '../../configs/config'
import { Input } from './'
import { CardSection } from './'
import { connect } from 'react-redux'
import { wineUpdate, wineCreate, searchWine } from '../../actions'
import AppStyles from '../../configs/styles'
import AppForm from './AppForm'


class CreateApps extends Component {

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={[AppStyles.backColor, AppStyles.flex1]}
        contentContainerStyle={AppStyles.createWine}>
      <View  >
          <AppForm {...this.props} />
      </View>
      </ScrollView>
    );
  }
}
export default CreateApps
/*
const mapStateToProps = (state) => {
  const { name, description, type, search, results } = state.wines;
  return { name, description, type, search, results };
};

export default connect(mapStateToProps, {
  wineUpdate, wineCreate, searchWine
})(CreateApps);*/
