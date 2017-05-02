import React, { Component } from 'react'
import { View } from 'react-native'
import AppStyles from '../../../configs/styles'
import { Icon } from 'react-native-elements'
import AppConfig from '../../../configs/config'
import { connect } from 'react-redux';

class AddIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: this.props.style,
    };
  }

  render(){
    if(!this.props.isAdmin){
      return null
    }
    return (
      <View style={this.state.style} contentContainerStyle={{justifyContent: 'center',alignItems: 'center'}}>
        <Icon
          name='md-add'
          type='ionicon'
          color={AppConfig.blueColor}/>
      </View>
    )
  }

}
const mapStateToProps = (state) => {
  const { isAdmin } = state.admin
  return {  isAdmin }
}

AddIcon = connect(mapStateToProps)(AddIcon)
export {AddIcon}
//export {AddIcon};
