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
import { Input, CardSection } from '../common'
import { connect } from 'react-redux'
import AppStyles from '../../configs/styles'
import SaladForm from './SaladForm'

class CreateSalad extends Component {

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={[AppStyles.backColor, AppStyles.flex1]}
        contentContainerStyle={AppStyles.createWine}>
      <View  >
          <SaladForm {...this.props} />
      </View>
      </ScrollView>
    );
  }
}
export default CreateSalad
