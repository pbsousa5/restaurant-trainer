import React, { Component, PropTypes  } from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux';
import AppStyles from '../../configs/styles'
import AppConfigs from '../../configs/config'
import { CardSection, Card, Input, CustomSwitch } from '../common';
//import { Lightbox } from '@shoutem/ui'
import  Lightbox  from 'react-native-lightbox'
import {  Icon, Button} from 'react-native-elements'
import ImageSelect from '../common/ImageSelect'
import {
  ActionsContainer,
  FieldsContainer,
  Fieldset,
  Form,
  FormGroup,
  Label,
} from 'react-native-clean-form'
import { View, Text, Image, ScrollView, Linking, TouchableOpacity, Alert } from 'react-native'
import {
  saladDelete,
  saladUpdate,
  glutenFree,
  disableSalad
} from '../../actions'
import FormWrapper from '../common/utils/FormWrapper'

class EditSalad extends Component{
  constructor(props){
    super(props)
    this.onDeletePress = this.onDeletePress.bind(this)
    this.onUpdatePress = this.onUpdatePress.bind(this)
    this.onDisablePressed = this.onDisablePressed.bind(this)
    this._renderNormalView = this._renderNormalView.bind(this)
  }

  onUpdatePress = () => {
    const {  saladname, category, allergies, saladnotes, ingredients, } = this.props;
    let image = null
    const gluten = this.props.gluten
    const key = this.props.details.key
    // CHECK IF CUSTOM IMAGE WAS UPLOADED
    this.props.imageAdded ? image = this.props.uploadedImage : image = this.CheckURI("")

    this.props.saladUpdate({ saladname, category,
      allergies, gluten, saladnotes, ingredients, image, key });
  }
  onDisablePressed = () => {
    this.props.disableSalad()
  }
  onDeletePress = () => {
    Alert.alert(
      'WARNING',
      'Are you sure you want to permanently delete this Salad?',
      [
        {text: 'OK', onPress: () => this.props.saladDelete(this.props.details.key)},
        {text: 'CANCEL', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ]
    )
  }
  CheckURI(uri){
    if(uri === ""){
      //TODO replace this with a local default wine bottle image
      return "https://cdn4.iconfinder.com/data/icons/chef-s-kitchen/256/icon-appetizer-512.png"
    }else{
      return uri
    }

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
    this.props.glutenFree()
  }

  render(){
    return(
      this.props.saladEdit ? this.renderEditView() : this._renderNormalView()
    )

  }
  _renderNormalView = () => {
    return(
      <ScrollView style={AppStyles.backColor}>
      <View style={[AppStyles.flex1, AppStyles.container, AppStyles.backColor]}>
          <Card style={[AppStyles.cardStyle]}>
            <CardSection style={[AppStyles.backColor,
              AppStyles.paddingLeft, AppStyles.paddingBottom,{paddingTop:10}, AppStyles.row]}>
              <Lightbox onRequestClose={null}
                renderContent={this.renderLightBoxImage.bind(this, this.props.details.image)}>
                <Image source={{ uri: this.CheckURI(this.props.details.image)}}
                  style={AppStyles.photo}/>
              </Lightbox>

            </CardSection>
            <Form>
              <FieldsContainer style={AppStyles.fieldContainer}>
                <Fieldset label="Salad Details" >
                  <View style={[AppStyles.row, {justifyContent: 'flex-start', paddingLeft: 0}]}>
                    <View style={[AppStyles.column, AppStyles.flex1]}>
                      <Text style={[AppStyles.labelStyle, AppStyles.topBotPadding]}>NAME</Text>
                      <Text style={[AppStyles.labelStyle, AppStyles.topBotPadding]}>CATEGORY</Text>
                      <Text style={[AppStyles.labelStyle, AppStyles.topBotPadding]}>ALLERGIES</Text>
                      <Text style={[AppStyles.labelStyle, AppStyles.topBotPadding]}>GLUTEN FREE</Text>
                    </View>
                    <View style={[AppStyles.column,{ paddingLeft: 0}, AppStyles.flex2]}>
                      <Text style={[AppStyles.displayText, AppStyles.topBotPadding]}
                        numberOfLines={1}>{this.props.details.name}</Text>
                      <Text style={[AppStyles.displayText, AppStyles.topBotPadding]}>{this.props.details.category}</Text>
                      <Text numberOfLines={1}
                        style={[AppStyles.displayText, AppStyles.topBotPadding]}>
                        {this.props.details.allergies}</Text>
                      {this.props.details.gluten == true ?
                        <Text style={[AppStyles.displayText, AppStyles.topBotPadding, {color: AppConfigs.greenColor}]}>YES</Text> :
                    <Text style={[AppStyles.displayText, AppStyles.topBotPadding, {color: AppConfigs.redColor}]}>NO</Text>}
                    </View>
                  </View>
                </Fieldset>
                <Fieldset label="description" >
                  <View style={AppStyles.flex1}>
                    <Text style={[AppStyles.flex1, AppStyles.inputText]} numberOfLines={20}>{this.props.details.saladnotes}</Text>
                  </View>
                  <View style={AppStyles.flex1}></View>
                </Fieldset>
                <Fieldset label="ingredients" >
                  <View style={AppStyles.flex1}>
                    <Text style={[AppStyles.flex1, AppStyles.inputText]} numberOfLines={20}>{this.props.details.ingredients}</Text>
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
  renderDisplayView(){
    return(
      <View >
        <Text>{this.props.details.name}</Text>
      </View>
    )
  }
  setFormFields = () => {
    console.log('setting form values ');
    //TODO populate form state
    this.props.change("saladname", this.props.details.name)
    this.props.change("category", this.props.details.category)
    this.props.change("allergies", this.props.details.allergies)
    this.props.change("saladnotes", this.props.details.saladnotes)
    this.props.change("ingredients", this.props.details.ingredients)
  }
  renderEditView(){
    if(this.props.details.hasLoaded){
      setTimeout(
      () => { this.setFormFields() },
      500
      )
      this.props.details.hasLoaded = false
    }
    return(
      <ScrollView style={AppStyles.backColor}>
        <View style={[AppStyles.flex1, AppStyles.container, AppStyles.backColor]}>
            <Card style={[AppStyles.cardStyle]}>
              <CardSection style={[AppStyles.backColor,
                AppStyles.paddingLeft, AppStyles.paddingBottom,{paddingTop:10}, AppStyles.row]}>
                { // IF CUSTOM IMAGE SELECTED DISPLAY THAT
                  this.props.imageAdded ?
                  <Lightbox onRequestClose={null}
                    renderContent={this.renderLightBoxImage.bind(this, this.props.image)}>
                    <Image source={this.props.image}
                    style={AppStyles.photo}/></Lightbox>
                     :
                  <Lightbox onRequestClose={null}
                    renderContent={this.renderLightBoxImage.bind(this, this.props.details.image)}>
                   <Image source={{ uri: this.CheckURI(this.props.details.image)}}
                   style={AppStyles.photo}/></Lightbox>
                }
                <View style={[AppStyles.row, AppStyles.flex1, {paddingLeft:30, justifyContent: "space-around", alignItems: 'center'}]}>
                  <ImageSelect />
                </View>
              </CardSection>
            <Form>
              <FieldsContainer style={AppStyles.fieldContainer}>
                <Fieldset label="Salad details" style={{color:AppConfigs.greenColor}}>
                  <Field
                    name="saladname"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    defValue={this.props.details.name}
                    myLabelStyle={AppStyles.labelStyle}
                    viewStyle={AppStyles.containerStyle}
                    lineNum= {2}
                    multiline = {true}
                    label="Name" placeholder="Salad name"
                    component={ Input }
                    onChangeAction={this.props.onChangeAction}/>
                  <Field name="category" myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    defValue={this.props.details.category}
                    myLabelStyle={AppStyles.labelStyle}
                    viewStyle={AppStyles.containerStyle}
                    label="Category" placeholder="Category for this Salad"
                    component={ Input }/>

                  <Field name="allergies"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    myLabelStyle={AppStyles.labelStyle}
                    defValue={this.props.details.allergies}
                    viewStyle={AppStyles.containerStyle}
                    label="Allergies" placeholder="Any allergy notes?"
                    component={ Input }/>
                  <CustomSwitch label="Gluten Free" value={false}
                    onSwitchChange={this.onSwitchChange.bind(this)}
                    myLabelStyle={AppStyles.labelStyle}/>
                </Fieldset>
                <Fieldset label="food tasting notes" last>
                  <Field name="saladnotes"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    myLabelStyle={AppStyles.labelStyle}
                    defValue={this.props.details.saladnotes}
                    multiline = {true}
                    lineNum= {10}
                    viewStyle={AppStyles.paraStyle}
                    placeholder="Enter Salad tasting notes."
                    component={ Input }/>
                </Fieldset>
                <Fieldset label="key ingredients" last>
                  <Field name="ingredients"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    myLabelStyle={AppStyles.labelStyle}
                    defValue={this.props.details.ingredients}
                    multiline = {true}
                    lineNum= {10}
                    viewStyle={AppStyles.paraStyle}
                    placeholder="Enter Salad key ingredients."
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
}


const selector = formValueSelector('saladEditForm');

const mapStateToProps = (state) => {
  const { gluten, saladEdit, details } = state.salads
  const { image, imageAdded, uploadedImage } = state.image
  const { toggle } = state.modal
  return {
    saladname: selector(state, 'saladname'),
    category: selector(state, 'category'),
    allergies: selector(state, 'allergies'),
    saladnotes: selector(state, 'saladnotes'),
    ingredients: selector(state, 'ingredients'),
    image, imageAdded, uploadedImage, toggle, gluten, saladEdit, details }
};

EditSalad = FormWrapper(reduxForm({
  form: 'saladEditForm',
  enableReinitialize: true
})(connect(
  mapStateToProps, {
  glutenFree,
  saladDelete,
  saladUpdate,
  disableSalad
})(EditSalad)));

export default EditSalad
