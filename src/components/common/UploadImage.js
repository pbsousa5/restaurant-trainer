import React, { Component } from ' react'
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  PixelRatio,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import RNFetchBlob from 'react-native-fetch-blob'
import  ImagePicker  from 'react-native-image-picker'
import { Icon, Button} from 'react-native-elements'
import AppStyles from '../../configs/styles'
import AppConfigs from '../../configs/config'

const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const dirs = RNFetchBlob.fs.dirs
const prefix = ((Platform.OS === 'android') ? 'file://' : '')

const options = {
  title: 'Select Image',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}
class UploadImage extends Component{
  constructor(props){
    super(props)
    this.state = {
      avatarSource: null,
      videoSource: null
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            <Text>Select a Video</Text>
          </View>
        </TouchableOpacity>

        { this.state.videoSource &&
          <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
        }
      </View>
    )
  }
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      let source;

      // You can display the image using either data...
      source = { uri: 'data:image/jpeg;base64,' + response.data };

      // Or a reference to the platform specific asset location
      if (Platform.OS === 'android') {
        source = { uri: response.uri };
      } else {
        source = { uri: response.uri.replace('file://', '') };
      }

      this.setState({
        avatarSource: source
      });
    }
  });

}
