import { View, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import AppStyles from '../../../configs/styles'
import AppConfigs from '../../../configs/config'
import {AddIcon} from '../menu/AddIcon'
import CustomButton from '../menu/CustomButton'
import { connect } from 'react-redux';
import {
  wineEditSwitch
} from '../../../actions';
export function WrapForm(Comp) {
  return class FormWrapper extends Component {
    constructor (props) {
      super(props)
    }

    static navigationOptions = ({ navigation, state }) => ({
      title: navigation.state.params.title,
      headerTitleStyle: {
         alignSelf: 'center',
      },
      headerRight:
      <CustomButton nav={navigation.state.params.place}/>

    });
/*
<TouchableOpacity onPress={navigation.dispatch({type:"WINE_EDIT_SWITCH"})}>
  <AddIcon style={AppStyles.addIcon} type={"ADD"}/>
</TouchableOpacity>,
*/

    render() {
      const { navigation } = this.props;


      return <Comp navigation={navigation} />;
    }
  }
  const mapStateToProps = (state) => {
    const { name, description, type, search, results } = state.wines;
    return { name, description, type, search, results };
  };

  FormWrapper = connect(mapStateToProps, {
    wineEditSwitch
  })(FormWrapper);
}

export default WrapForm
