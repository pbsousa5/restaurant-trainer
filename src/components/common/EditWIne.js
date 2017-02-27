import React, { Component, PropTypes  } from 'react'
import { View, Text, Image, ScrollView, Linking, TouchableOpacity, Alert } from 'react-native'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import AppStyles from '../../configs/styles'
import AppConfigs from '../../configs/config'
import { connect } from 'react-redux';
import { Lightbox } from '@shoutem/ui'
import { Icon, Button} from 'react-native-elements'
import ImageSelect from './ImageSelect'
import {
  FieldsContainer,
  Fieldset,
  Form,
} from 'react-native-clean-form'
import {
  wineEdit,
  wineUpdate,
  byTheGlass,
  wineDelete,
  disableWine
} from '../../actions';
import { CardSection, Card, Input, CustomSwitch } from './';

class EditWine extends Component {

  constructor(props){
    super(props)
    this._renderNormalView = this._renderNormalView.bind(this)
    this._renderEditView = this._renderEditView.bind(this)
    this._goToURL = this._goToURL.bind(this);
    this.deleteWine = this.deleteWine.bind(this)
    this.onUpdatePress = this.onUpdatePress.bind(this)
    this.onDisablePressed = this.onDisablePressed.bind(this)
    this._resetScrollView = this._resetScrollView.bind(this)
  }

  componentDidMount(){
    if(this.props.details.glass == true){
      console.log("TRUE!!")
    }else{
      console.log("FALSE!!")
    }
    console.log("this.props.details.glass ", this.props.details.glass);
  }
  renderLightBoxImage = (image) => {
    return(
      <View style={AppStyles.photoContainer}>
        {this.props.imageAdded ?
          <Image source={image} style={[AppStyles.hugePhoto ]}/>
            :
          <Image source={{ uri: this.CheckURI(image)}}
            style={[AppStyles.hugePhoto ]}/>
          }

      </View>
    )
  }
  onSwitchChange = () => {
    console.log('switch');
    this.props.byTheGlass()
  }
  onUpdatePress = () => {
    const { winename, winery, varietal, vintage, winenotes, region,  winelink } = this.props;
    //{ winename, winery, varietal, vintage, winenotes, region, image, glass, key, link }
    let image = null
    const key = this.props.details.key
    // ADD CUSTOM IMAGE URL IF ONE WAS SELECTED
    this.props.imageAdded ? image = this.props.uploadedImage : image = this.props.details.image
    const glass = this.props.details.glass
    //this._resetScrollView() // this somehow breaks the wineUpdate
    this.props.wineUpdate({ winename, winery, varietal, vintage, winenotes, region, image, glass, key, winelink });
  }
  _resetScrollView = () => {
     //_scrollView.scrollTo({y: 0});
  }
  onDisablePressed = () => {
    this.props.disableWine()
  }
  onDeletePress = () => {
    Alert.alert(
      'WARNING',
      'Are you sure you want to permanently delete this wine?',
      [
        {text: 'OK', onPress: () => this.props.wineDelete(this.props.details.key)},
        {text: 'CANCEL', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ]
    )
  }
  deleteWine = () => {
    console.log('DELETE WINE')
  }
  _goToURL() {
    Linking.canOpenURL(this.props.details.link).then(supported => {
      if (supported) {
        Linking.openURL(this.props.details.link);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.details.link);
      }
    });
  }

  _renderNormalView = () => {

    return(
      <ScrollView style={AppStyles.backColor}
        ref={(scrollView) => { _scrollView = scrollView; }} >
      <View style={[AppStyles.flex1, AppStyles.container, AppStyles.backColor, {paddingTop:70}]}>
          <Card style={[AppStyles.cardStyle]}>
            <CardSection style={[AppStyles.backColor,
              AppStyles.paddingLeft, AppStyles.paddingBottom,{paddingTop:10}, AppStyles.row]}>
              <Lightbox onRequestClose={null} renderContent={this.renderLightBoxImage.bind(this, this.props.details.image)}>
                <Image source={{ uri: this.CheckURI(this.props.details.image)}}
                  style={AppStyles.photo}/>
              </Lightbox>
              <View style={[AppStyles.row, AppStyles.flex1, {paddingLeft:30, justifyContent: "space-around", alignItems: 'center'}]}>
                <Button
                  icon={{name: 'link'}}
                  raised
                  textStyle={AppStyles.h2}
                  backgroundColor= {AppConfigs.blueColor}
                  buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, height: 40, width: 100}}
                  onPress={this._goToURL}
                  title='INFO' />

              </View>
            </CardSection>
            <Form>
              <FieldsContainer style={AppStyles.fieldContainer}>
                <Fieldset label="Bottle details">
                  <View style={[AppStyles.row, {justifyContent: 'flex-start', paddingLeft: 0}]}>
                    <View style={[AppStyles.column, AppStyles.flex1]}>
                      <Text style={[AppStyles.labelStyle, AppStyles.topBotPadding]}>BOTTLE NAME</Text>
                      <Text style={[AppStyles.labelStyle, AppStyles.topBotPadding]}>WINERY</Text>
                      <Text style={[AppStyles.labelStyle, AppStyles.topBotPadding]}>REGION</Text>
                      <Text style={[AppStyles.labelStyle, AppStyles.topBotPadding]}>VARIETAL</Text>
                      <Text style={[AppStyles.labelStyle, AppStyles.topBotPadding]}>VINTAGE</Text>
                      <Text style={[AppStyles.labelStyle, AppStyles.topBotPadding]}>BY THE GLASS</Text>
                    </View>
                    <View style={[AppStyles.column,{ paddingLeft: 0}, AppStyles.flex2]}>
                      <Text style={[AppStyles.displayText, AppStyles.topBotPadding]}
                        numberOfLines={1}>{this.props.details.name}</Text>
                      <Text style={[AppStyles.displayText, AppStyles.topBotPadding]}>{this.props.details.producer}</Text>
                      <Text numberOfLines={1} style={[AppStyles.displayText, AppStyles.topBotPadding]}>{this.props.details.region}</Text>
                      <Text style={[AppStyles.displayText, AppStyles.topBotPadding]}>{this.props.details.varietal}</Text>
                      <Text style={[AppStyles.displayText, AppStyles.topBotPadding]}>{this.props.details.vintage}</Text>
                      {this.props.details.glass == true ? <Text style={[AppStyles.displayText, AppStyles.topBotPadding, {color: AppConfigs.greenColor}]}>YES</Text> :
                    <Text style={[AppStyles.displayText, AppStyles.topBotPadding, {color: AppConfigs.redColor}]}>NO</Text>}

                    </View>
                  </View>
                </Fieldset>
                <Fieldset label="Wine tasting notes" >
                  <View style={AppStyles.flex1}>
                    <Text style={[AppStyles.flex1, AppStyles.inputText]} numberOfLines={20}>{this.props.details.winenotes}</Text>
                  </View>
                  <View style={AppStyles.flex1}></View>
                </Fieldset>
              </FieldsContainer>
            </Form>

          </Card>
      </View>
      </ScrollView>
    )
  }
  render(){
    return(
      this.props.wineEdit ? this._renderEditView() : this._renderNormalView()
    )
  }
  setFormFields = () => {
    console.log('setting form values ');
    //TODO populate form state
    this.props.change("winelink", this.props.details.link)
    this.props.change("winename", this.props.details.name)
    this.props.change("winery", this.props.details.producer)
    this.props.change("region", this.props.details.region)
    this.props.change("varietal", this.props.details.varietal)
    this.props.change("vintage", this.props.details.vintage)
    this.props.change("winenotes", this.props.details.winenotes)
  }
  _renderEditView = () => {
    // set the default values in the form
    // ONLY ONCE!!!
    // the timeout stops setState errors from firing
    if(this.props.details.hasLoaded){
      setTimeout(
      () => { this.setFormFields() },
      500
      )
      this.props.details.hasLoaded = false
    }

    return(
      <ScrollView style={AppStyles.backColor}>
      <View style={[AppStyles.flex1, AppStyles.container, AppStyles.backColor, {paddingTop:70}]}>
          <Card style={[AppStyles.cardStyle]}>
            <CardSection style={[AppStyles.backColor,
              AppStyles.paddingLeft, AppStyles.paddingBottom,{paddingTop:10}, AppStyles.row]}>
              { // IF CUSTOM IMAGE SELECTED DISPLAY THAT
                this.props.imageAdded ?
                <Lightbox onRequestClose={null} renderContent={this.renderLightBoxImage.bind(this, this.props.image)}>
                  <Image source={this.props.image}
                  style={AppStyles.photo}/></Lightbox>
                   :
                <Lightbox onRequestClose={null} renderContent={this.renderLightBoxImage.bind(this, this.props.details.image)}>
                 <Image source={{ uri: this.CheckURI(this.props.details.image)}}
                 style={AppStyles.photo}/></Lightbox>
              }
              <View style={[AppStyles.row, AppStyles.flex1, {paddingLeft:30, justifyContent: "space-around", alignItems: 'center'}]}>
                <ImageSelect />
              </View>
            </CardSection>

            <Form>
              <FieldsContainer style={AppStyles.fieldContainer}>
                <Fieldset label="Bottle details">
                  <Field
                    name="winelink"
                    lineNum= {2}
                    multiline = {true}
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    defValue={this.props.details.link}
                    myLabelStyle={AppStyles.labelStyle}
                    viewStyle={AppStyles.paraStyle}
                    label="Wine link"
                    component={ Input } />
                  <Field
                    name="winename"
                    lineNum= {2}
                    multiline = {true}
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    defValue={this.props.details.name}
                    myLabelStyle={AppStyles.labelStyle}
                    viewStyle={AppStyles.paraStyle}
                    label="Bottle name"
                    component={ Input } />

                  <Field name="winery" myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    defValue={this.props.details.producer}
                    myLabelStyle={AppStyles.labelStyle}
                    viewStyle={AppStyles.containerStyle}
                    label="Winery" placeholder="Winery"
                    component={ Input }/>
                  <Field name="region"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    lable="Region"
                    myLabelStyle={AppStyles.labelStyle}
                    defValue={this.props.details.region}
                    viewStyle={AppStyles.containerStyle}
                    label="Region" placeholder="Region"
                    component={ Input }/>
                  <Field
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    myLabelStyle={AppStyles.labelStyle}
                    defValue={this.props.details.varietal}
                    viewStyle={AppStyles.containerStyle}
                    label="Varietal" placeholder="Varietal"
                    name="varietal" component={ Input }/>
                  <Field name="vintage"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    myLabelStyle={AppStyles.labelStyle}
                    defValue={this.props.details.vintage}
                    viewStyle={AppStyles.containerStyle}
                    label="Vintage" placeholder="Vintage"
                    component={ Input }/>
                  <CustomSwitch label="By the glass" value={this.props.details.glass == true ? true : false}
                    onSwitchChange={this.onSwitchChange.bind(this)}
                    myLabelStyle={AppStyles.labelStyle}/>
                </Fieldset>
                <Fieldset label="Wine tasting notes" last>
                  <Field name="winenotes"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    myLabelStyle={AppStyles.labelStyle}
                    defValue={this.props.details.winenotes}
                    multiline = {true}
                    lineNum= {10}
                    viewStyle={AppStyles.paraStyle}
                    placeholder="Enter wine tasting notes."
                    component={ Input }/>
                </Fieldset>
              </FieldsContainer>
            </Form>
            <CardSection style={[AppStyles.row, AppStyles.backColor, {paddingLeft:10, paddingRight: 10, paddingBottom: 10, justifyContent:"space-between"}]}>
              <Button
                icon={{name: 'add'}}
                raised
                textStyle={AppStyles.h3}
                backgroundColor= {AppConfigs.greenColor}
                fontFamily= {AppConfigs.baseFont}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                onPress={this.onUpdatePress.bind(this)}
                title='UPDATE' />
              <Button
                icon={{name: 'not-interested'}}
                raised
                textStyle={AppStyles.h3}
                backgroundColor= {AppConfigs.orangeColor}
                fontFamily= {AppConfigs.baseFont}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                onPress={this.onDisablePressed.bind(this)}
                title='DISABLE' />
              <Button
                icon={{name: 'delete-forever'}}
                raised
                textStyle={AppStyles.h3}
                backgroundColor= {AppConfigs.redColor}
                fontFamily= {AppConfigs.baseFont}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                onPress={this.onDeletePress.bind(this)}
                title='DELETE' />
            </CardSection>
          </Card>
      </View>
    </ScrollView>
    )
  }
  CheckURI(uri){
    if(uri === "" ){
      //TODO replace this with a local default wine bottle image
      return "https://static.vecteezy.com/system/resources/previews/000/000/624/original/red-wine-bottle-vector.jpg"
    }else{
      return uri
    }
  }

}

EditWine = reduxForm({
  form: 'wineUpdateForm'  // a unique identifier for this form
})(EditWine)
const selector = formValueSelector('wineUpdateForm');

const mapStateToProps = (state) => {
  const { name, description, results, loaded, search, details, loadingModal, glass, wineEdit } = state.wines
  const { image, imageAdded, uploadedImage } = state.image
  return {
    winelink: selector(state, 'winelink'),
    winename: selector(state, 'winename'),
    vintage: selector(state, 'vintage'),
    varietal: selector(state, 'varietal'),
    winery: selector(state, 'winery'),
    region: selector(state, 'region'),
    winenotes: selector(state, 'winenotes'),
    name, description, results, loaded, search, details, loadingModal, glass, wineEdit, image, imageAdded, uploadedImage }
};




EditWine =  connect(
  mapStateToProps, {
  wineUpdate,
  disableWine,
  wineDelete,
  byTheGlass
})(EditWine);

export default EditWine
