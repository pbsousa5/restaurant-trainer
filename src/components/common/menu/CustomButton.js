import { View, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import AppStyles from '../../../configs/styles'
import AppConfigs from '../../../configs/config'
import {wineEditSwitch, appEditSwitch, entEditSwitch, saladEditSwitch} from '../../../actions/'
import {AddIcon} from './AddIcon'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class CustomButton extends Component {
  constructor(props){
    super(props)
  }
  render(){
    //console.log("SWITH PROPS ", this.props);
    //only show the edit button for admins
    //console.log("this.props.nav ",this.props.nav);
    // we get props from the index navigation reducer
    // this tells us which page we are on
    if(this.props.isAdmin){
    return(
      <TouchableOpacity onPress={() => this.switchEdit(this.props.nav)}>
        <AddIcon style={AppStyles.addIcon} type={"EDIT"}/>
      </TouchableOpacity>
    )
    }else{
        return null
      }
  }
  switchEdit(nav){
    // switching edit mode depending on page/screen
    switch(nav){
      case "WINE":
        return this.props.wineEditSwitch();
      case "APP":
        return this.props.appEditSwitch();
      case "ENT":
        return this.props.entEditSwitch();
      case "SALAD":
        return this.props.saladEditSwitch();
      default:
        return null
    }
  }
}


const mapStateToProps = (state) => {
  const {isAdmin} = state.admin
  return {isAdmin}
}


CustomButton =  connect( mapStateToProps, {saladEditSwitch, wineEditSwitch, appEditSwitch, entEditSwitch})(CustomButton);


export default CustomButton
