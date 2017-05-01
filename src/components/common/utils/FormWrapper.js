import { View, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import AppStyles from '../../../configs/styles'
import AppConfigs from '../../../configs/config'
import {AddIcon} from '../menu/AddIcon'
import { connect } from 'react-redux';
export default function WrapForm(Comp) {
  return class FormWrapper extends Component {
    constructor (props) {
      super(props)
      console.log("props ", this.props);
    }
    static navigationOptions = ({ navigation, state }) => ({
      title: 'WINES',
      headerTitleStyle: {
         alignSelf: 'center',
         marginRight: 56,
      },

      headerRight:
      <TouchableOpacity onPress={null}>
        <AddIcon style={AppStyles.addIcon} type={"ADD"}/>
      </TouchableOpacity>,

    });

    render() {
      const { navigation } = this.props;

      return <Comp navigation={navigation} />;
    }
  }
}
