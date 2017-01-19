import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ListView,
  ListViewDataSource,
  Animated
 } from 'react-native'

import { connect } from 'react-redux';
import AppStyles from '../../configs/styles'
import AppConfig from '../../configs/config'
import {
  Button,
  SocialIcon,
  Card,
  FormLabel,
  FormInput,
  Icon,
  Checkbox
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
    }
  }
  componentDidMount(){
    this.setModalVisible(true)
  }
  slideModal = () => {

      this.state.x.setValue(-320);
      this.state.scale.setValue(1);
      Animated.spring(this.state.x, {toValue: 0}).start();
      this.setState({visible: true});
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
    const dataSource = this.ds.cloneWithRows(this.props.reviews);
    if(this.state.visible){
      this.scaleModal()
    }else{
      this.hideModal()
    }
    return(
      <View style={[AppStyles.modalContainer]}>
        <Animated.Modal {...this.props} visible={this.state.visible} style={[
            AppStyles.modal, {
                transform: [
                    {
                        scale: this.state.scale
                    }, {
                        translateX: this.state.x
                    }]}]}>

        <View style={AppStyles.row}>
          <Image source={{uri: this.props.image}} style={AppStyles.largePhoto}/>
          <View style={AppStyles.container, AppStyles.paddingLeft, AppStyles.paddingRight}>
            <Text style={AppStyles.h4}>{this.props.name}</Text>
            <Text style={AppStyles.h4}>{this.props.varietal}</Text>
            <Text style={AppStyles.h4}>{this.props.vintage}</Text>
            <Text style={AppStyles.h4}>{this.props.region}</Text>
          </View>

        </View>

          <Text style={AppStyles.h5}>Select multiple or single Wine tasting notes below</Text>
          <Text style={AppStyles.h5}>You can edit these on the next page</Text>
          <ListView
             dataSource={dataSource}
             renderRow={this._renderRow}
           />
           <View style={AppStyles.row}>
           <Button
             raised
             buttonStyle={{
               marginBottom: 10,
               marginLeft: 15,
               marginRight: 15,
           }}
            backgroundColor={AppConfig.redColor}
            title='Cancel'
            onPress={this._closeModal.bind(this, false)}/>
            <Button
              raised
              buttonStyle={{

                marginLeft: 15,
                marginRight: 15,
                marginBottom: 10
            }}
             backgroundColor={AppConfig.greenColor}
             title='Select'
             onPress={this._closeModal.bind(this, true)}/>
          </View>
       </Animated.Modal>
      </View>
    )
  }

  _renderRow = (rowData, sectionID, rowID) => {
    //console.log(rowID);
    if(rowData.body === ""){
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
