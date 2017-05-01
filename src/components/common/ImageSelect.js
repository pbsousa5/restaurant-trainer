import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import { Icon, Button} from 'react-native-elements'
import AppStyles from '../../configs/styles'
import AppConfigs from '../../configs/config'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { addImage, UploadImage, UploadImage_notworking } from '../../actions'
class ImageSelect extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    avatarSource: null,
    videoSource: null
  };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else if(this.props.type == "user") {
        console.log("Wait for user to login before upload");
      }
      else {
        var source;

        // You can display the image using either:
        // source = { uri: 'data:image/jpeg;base64,' + response.data };

        // Or:
        if (Platform.OS === 'android') {
          source = { uri: response.uri };
        } else {
          source = { uri: response.uri.replace('file://', '') };
        }
        console.log('uri source: ', source);
        this.props.addImage(source)
        //this.props.UploadImage_notworking(source)
        this.props.UploadImage(source)
        this.setState({
          avatarSource: source
        });
      }
    });
  }

  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium'
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }

      else {
        this.setState({
          videoSource: response.uri
        });
      }
    });
  }

  render() {
    console.log("type: ",this.props.type);
    return (
      <View style={AppStyles.addImageButton}>
        <Button
          icon={{name: 'image'}}
          raised
          textStyle={AppStyles.h2}
          backgroundColor= {AppConfigs.redColor}
          buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, height: 40, width: 100}}
          onPress={this.selectPhotoTapped.bind(this)}
          title='EDIT' />
      </View>
    );
  }

}
/*

        <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            <Text>Select a Video</Text>
          </View>
        </TouchableOpacity>

        { this.state.videoSource &&
          <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
        }
*/
const mapStateToProps = (state) => {
  const { image } = state.image
  return { image }
}

ImageSelect =  connect(
  mapStateToProps, {
    addImage, UploadImage, UploadImage_notworking
})(ImageSelect);

export default ImageSelect
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
});
