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
import EntreeForm from './EntreeForm'

class CreateEntree extends Component {

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={[AppStyles.backColor, AppStyles.flex1]}
        contentContainerStyle={AppStyles.createWine}>
      <View  >
          <EntreeForm {...this.props} />
      </View>
      </ScrollView>
    );
  }
}
export default CreateEntree
