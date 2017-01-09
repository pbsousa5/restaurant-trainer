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
  onCreatePress() {
    const { name, description, type } = this.props;

    this.props.wineCreate({ name, description, type });
  }
  onSearchPress(){
    const { search } = this.props
    this.props.searchWine({search})
  }

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps={true}
        style={AppStyles.createWine}>
      <View >
        <WineForm {...this.props} />
        <CardSection>
          <Button
            icon={{name: 'code'}}
            backgroundColor='#03A9F4'
            fontFamily='Lato'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            onPress={this.onCreatePress.bind(this)}
            title='CREATE' />

        </CardSection>
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
