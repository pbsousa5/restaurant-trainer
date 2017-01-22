import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import AppStyles from '../../configs/styles'
import { connect } from 'react-redux'
import AppConfig from '../../configs/config'
import  { CheckBox } from 'react-native-elements'
//import CheckBox from 'react-native-check-box'
import { wineNoteAdd, wineNoteRemove } from '../../actions'

export default class ReviewDetails extends Component {
  constructor(props){
    super(props)
    this.state = {
      checked: false,
    }
    this._onCheckPressed = this._onCheckPressed.bind(this)
  //  this._addWineNote = this.props._addWineNote.bind(this)
    //this._removeWineNote = this.props._removeWineNote.bind(this)
  }
  componentDidMount(){
    //console.log(this.myProps);
  }

  _onCheckPressed(){
    this.setState({ checked: !this.state.checked }, function afterStateSet () {
      this.submitNotes()
    })

  }

  submitNotes(){
    if(this.state.checked){
      this.props._addWineNote(this.props.body, this.props.id)
      //this.props._addWineNote(this.props.body, this.props.id);
    }else{
      this.props._removeWineNote(this.props.body, this.props.id)
    }
  }

  render(){
    return(
      <CheckBox
        title={this.props.body}
        checked={this.state.checked}
        onPress={this._onCheckPressed.bind(this)}
      />
    )
    /*
    return(
      <View style={[AppStyles.leftAligned, AppStyles.backColor, AppStyles.fullWindowWidth, AppStyles.flex1]}>
        <View style={AppStyles.row}>
          <CheckBox
              style={{paddingRight: 10, paddingLeft:10, paddingTop: 5, flex:0.1}}
              onClick={this._onCheckPressed.bind(this)}
              isChecked={this.state.checked}
          />
          <View style={{paddingLeft:10,paddingRight:10, flex:3}}>

            <View style={[AppStyles.paddingLeft, AppStyles.container, AppStyles.wrapText]}>
              <Text style={AppStyles.h5}>{this.props.body}</Text>
            </View>
          </View>
        </View>

      </View>
    )*/
  }
}
