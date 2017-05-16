import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ListView,
  ListViewDataSource,
  Animated,
  ScollView
 } from 'react-native'
 import {
   FieldsContainer,
   Fieldset,
   Form,
   FormGroup,
   Label,
 } from 'react-native-clean-form'

import { connect } from 'react-redux';
import AppStyles from '../../configs/styles'
import AppConfig from '../../configs/config'
import {
  Button,
  SocialIcon,
  FormLabel,
  FormInput,
  Icon,
  Checkbox,
  Card
} from 'react-native-elements'

import  ReviewDetails  from './ReviewDetails'
import Modal from 'react-native-root-modal';
import { wineNoteAdd, wineNoteRemove, toggleModal } from '../../actions';
  class DetailModal extends Component {
  constructor(props){
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this._addWineNote = this._addWineNote.bind(this)
    this._removeWineNote = this._removeWineNote.bind(this)

    this.state = {
        opacity: new Animated.Value(1),
        visible: false,
        scale: new Animated.Value(1),
        x: new Animated.Value(0),
        y: new Animated.Value(0),
    }
  }
  componentDidMount(){
    this.setModalVisible(true)
  }

  slideModal = () => {

      this.state.y.setValue(AppConfig.windowHeight);
      this.state.scale.setValue(1);
      //Animated.spring(this.state.y, {toValue: 0}).start();
      Animated.spring(
      this.state.y,
      {
        toValue: 0,
        velocity: 3,
        tension: 2,
        friction: 8,
      }
    ).start();
      //this.setState({visible: true});
      this.slide = true;
  };

  scaleModal = () => {
      this.state.x.setValue(0);
      this.state.scale.setValue(0);
      Animated.spring(this.state.scale, {toValue: 1}).start();
      //this.setState({visible: true});
      this.slide = false;
  };

  hideModal = () => {
      if (this.slide) {
          Animated.timing(this.state.x, {toValue: -320}).start(() => {
              //this.setState({visible: false});
          });
      } else {
          Animated.timing(this.state.scale, {toValue: 0}).start(() => {
              //this.setState({visible: false});
          });

      }

  }
  setModalVisible(visible) {
      this.setState({visible: visible})
  }

  _addWineNote = (note, id) => {
    this.props.wineNoteAdd(note, id)
  }
  _removeWineNote = (note, id) => {
    this.props.wineNoteRemove(note, id)
  }
  _closeModal = (obj) => {
    this.props.toggleModal(obj, this.props.bottle)
  }

//<Image source={this.props.wines.bottle.image} style={AppStyles.photo}/>
  render(){
    const selectText = 'Select multiple or single Wine tasting notes below.'
    const dataSource = this.ds.cloneWithRows(this.props.reviews);
    if(this.state.visible){
      //this.scaleModal()
      this.slideModal()
    }else{
      this.hideModal()
    }
    //<Image source={{uri: this.props.image}} style={AppStyles.largePhoto}/>
    return(
        <Animated.Modal {...this.props} visible={this.state.visible} style={[
          AppStyles.flex1,
            AppStyles.modal, {
                transform: [
                    {
                        scale: this.state.scale
                    }, {
                        translateY: this.state.y
                    }]}]}>
              <View style={[{paddingTop:20}]}>
              <Card
                titleStyle={AppStyles.h3}
                title={this.props.name.toUpperCase()}
                containerStyle={[AppStyles.topCardWine,AppStyles.containerBorder]}
                wrapperStyle={[{justifyContent: 'flex-start'}]}>
                <View style={AppStyles.row}>
                  <View style={{paddingTop: 20}}>
                    <Image source={{uri: this.props.image}} style={[AppStyles.largePhoto]}/>
                  </View>
                  <View style={[AppStyles.column, {paddingLeft:20}]}>
                    <Text style={AppStyles.h4}>{this.props.winery}</Text>
                    <Text style={AppStyles.h4}>{this.props.varietal}</Text>
                    <Text style={AppStyles.h4}>{this.props.vintage}</Text>
                    <Text style={AppStyles.h4}>{this.props.region}</Text>
                  </View>
                </View>
              </Card>
              </View>

              <Text style={AppStyles.h6}>{selectText.toUpperCase()}</Text>


              <ListView
                 dataSource={dataSource}
                 renderRow={this._renderRow}
               />

           <View style={[AppStyles.row, {paddingTop:10}]}>
             <Button
               raised
               buttonStyle={{
                 marginBottom: 10,
                 marginLeft: 15,
                 marginRight: 15,
             }}
             textStyle={AppStyles.h3}
              backgroundColor={AppConfig.redColor}
              title='CANCEL'
              onPress={this._closeModal.bind(this, false)}/>
              <Button
                raised
                buttonStyle={{
                  marginLeft: 15,
                  marginRight: 15,
                  marginBottom: 10
              }}
              textStyle={AppStyles.h3}
               backgroundColor={AppConfig.greenColor}
               title='SELECT'
               onPress={this._closeModal.bind(this, true)}/>
          </View>
       </Animated.Modal>

    )
  }

  _renderRow = (rowData, sectionID, rowID) => {
    // ignore empty fields and also ones that are too short
    if(rowData.body === "" || rowData.body.length <= 60){
      return null
    }
    //<TouchableOpacity onPress={this._addWineNote.bind(this, rowData.body,rowID)}>
    //</TouchableOpacity>
    return (
      <View style={AppStyles.rowStyle}>
        <ReviewDetails
          _addWineNote={this._addWineNote.bind(this)}
          _removeWineNote={this._removeWineNote.bind(this)}
          { ...rowData }
          id={rowID}
          />
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  const { bottle } = state.modal;

  return { bottle };
};

export default connect(mapStateToProps, { wineNoteAdd, wineNoteRemove, toggleModal })(DetailModal)
