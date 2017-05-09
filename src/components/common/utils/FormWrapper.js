import { View, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import AppStyles from '../../../configs/styles'
import AppConfigs from '../../../configs/config'
import {AddIcon} from '../menu/AddIcon'
import CustomButton from '../menu/CustomButton'
import { connect } from 'react-redux';

export function WrapForm(Comp) {
  return class FormWrapper extends Component {
    constructor (props) {
      super(props)
    }
    // place is passed in from navigation props
    // inside the reducer index
    static navigationOptions = ({ navigation, state }) => ({
      title: navigation.state.params.title,
      headerTitleStyle: {
         alignSelf: 'center',
      },
      headerRight:
      <CustomButton nav={navigation.state.params.place}/>
    });

    render() {
      const { navigation } = this.props;
      return <Comp navigation={navigation} />;
    }
  }
  const mapStateToProps = (state) => {
    return { state };
  };

  FormWrapper = connect(mapStateToProps, {

  })(FormWrapper);
}

export default WrapForm
