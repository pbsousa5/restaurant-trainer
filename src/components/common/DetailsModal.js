import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native'
import { toggleModal } from '../../actions';
import { connect } from 'react-redux';
import AppStyles from '../../configs/styles'
import AppConfig from '../../configs/config'
import {
  Button,
  SocialIcon,
  Card,
  FormLabel,
  FormInput,
  Icon
} from 'react-native-elements'

export default class DetailsModal extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={[AppStyles.modalContainer,{height:AppConfig.windowHeight, width:AppConfig.windowWidth}]}>
        <Icon
          iconStyle={AppStyles.topRight}
          raised
          onPress={this.props.toggleModal}
          name="close"/>
        <View style={AppStyles.modalBox}>
        <Card>
          <Text>Some generic modal</Text>
        </Card>
        </View>
      </View>
    )
  }
}
/*
const mapStateToProps = (state) => {
  const { name, description, type, results, loaded, search, toggle } = state.wines;

  return { name, description, type, results, loaded, search, toggle };
};

export default connect(mapStateToProps, { toggleModal })(DetailsModal);*/
