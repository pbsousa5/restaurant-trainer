import React, { Component } from 'react';
import {
  View,
  Animated,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Card, Input, CustomSwitch } from './';
import {  Icon, Button} from 'react-native-elements'
import AppStyles from '../../configs/styles'
import AppConfigs from '../../configs/config'
import ImageSelect from './ImageSelect'
import Spinner from 'react-native-loading-spinner-overlay'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import {
  FieldsContainer,
  Fieldset,
  Form,
} from 'react-native-clean-form'

import _ from 'lodash'
import  Lightbox  from 'react-native-lightbox'
import {
  appCreate,
  glutenFree
} from '../../actions';

class AppForm extends Component {
  constructor(props){
    super(props)
    this.state = {
        opacity: new Animated.Value(0),
        visible: false,
        scale: new Animated.Value(0),
        x: new Animated.Value(0),
        spinner: false
    }

    const {
      appname
    } = props
  }

  setModalVisible(visible) {
      this.setState({visible: visible})
  }


  renderLightBoxImage = (image) => {
    console.log("IMAGE ", image);
    return(
      <View style={AppStyles.photoContainer}>
        <Image source={{ uri: this.CheckURI(image)}}
          style={[AppStyles.hugePhoto ]}/>
      </View>
    )
  }
  render() {
    return this.renderLoadingView();
  }
  CheckURI(uri){
    if(uri === ""){
      //TODO replace this with a local default image
      return "https://cdn4.iconfinder.com/data/icons/chef-s-kitchen/256/icon-appetizer-512.png"
    }else{
      return uri
    }

  }
  handleSubmit = () => {
    console.log('submit');
  }
  onSwitchChange = () => {
    console.log('switch');
    this.props.glutenFree()
  }
  onCreatePress = () => {
    const {  appname, category, allergies, appnotes, ingredients } = this.props;
    let image = null
    const gluten = this.props.gluten
    // CHECK IF CUSTOM IMAGE WAS UPLOADED
    this.props.imageAdded ? image = this.props.uploadedImage : image = this.CheckURI("")
    console.log("SUBMIT FIELDS: ", appname, category, allergies, appnotes, ingredients);
    this.props.appCreate({ appname, category,
      allergies, gluten, appnotes, ingredients, image });
  }
  setFormFields = () => {
    //console.log("SETTING FORM FIELDS APPS");
    // set fields to default values
    // in case of this appfrom they should be empty
    this.props.change("appname", this.props.details.name)
    this.props.change("category", this.props.details.category)
    this.props.change("allergies", this.props.details.allergies)
    this.props.change("appnotes", this.props.details.appnotes)
    this.props.change("ingredients", this.props.details.ingredients)
  }
  renderLoadingView() {
    //console.log("SHOULD BE RESETTING FIELDS ", this.props.hasLoaded);
    /*if(this.props.hasLoaded){
      setTimeout(
      () => { this.setFormFields() },
      200
      )
      this.props.hasLoaded = false
    }*/
    return(
      <View style={[AppStyles.flex1, AppStyles.container, {paddingTop:20}]}>

          <Card style={[AppStyles.cardStyle]}>
            <CardSection style={[AppStyles.row, AppStyles.backColor, AppStyles.paddingLeft, AppStyles.paddingBottom]}>
              { //check for local image added
                this.props.imageAdded ?
                <Lightbox onRequestClose={null}
                  renderContent={this.renderLightBoxImage.bind(this, this.props.image.uri)}>
                  <Image source={this.props.image}
                  style={AppStyles.photo}/></Lightbox>
                   :
                <Lightbox onRequestClose={null}
                  renderContent={this.renderLightBoxImage.bind(this, this.props.details.image)}>
                 <Image source={{ uri: this.CheckURI(this.props.details.image)}}
                 style={AppStyles.photo}/></Lightbox>
              //END CHECK LOCAL IMAGE
            }
              <ImageSelect />
            </CardSection>
            <Form>
              <FieldsContainer style={AppStyles.fieldContainer}>
                <Fieldset label="Appetizer details" style={{color:AppConfigs.greenColor}}>
                  <Field
                    name="appname"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    defValue={""}
                    myLabelStyle={AppStyles.labelStyle}
                    viewStyle={AppStyles.containerStyle}
                    lineNum= {2}
                    multiline = {true}
                    label="Name" placeholder="Appetizer name"
                    component={ Input }
                    />
                  <Field name="category" myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    defValue={""}
                    myLabelStyle={AppStyles.labelStyle}
                    viewStyle={AppStyles.containerStyle}
                    label="Category" placeholder="Category for this appetizer"
                    component={ Input }/>

                  <Field name="allergies"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    myLabelStyle={AppStyles.labelStyle}
                    defValue={""}
                    viewStyle={AppStyles.containerStyle}
                    label="Allergies" placeholder="Any allergy notes?"
                    component={ Input }/>
                  <CustomSwitch label="Gluten Free" value={false}
                    onSwitchChange={this.onSwitchChange.bind(this)}
                    myLabelStyle={AppStyles.labelStyle}/>
                </Fieldset>
                <Fieldset label="food tasting notes" last>
                  <Field name="appnotes"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    myLabelStyle={AppStyles.labelStyle}
                    defValue={""}
                    multiline = {true}
                    lineNum= {10}
                    viewStyle={AppStyles.paraStyle}
                    placeholder="Enter appetizer tasting notes."
                    component={ Input }/>
                </Fieldset>
                <Fieldset label="key ingredients" last>
                  <Field name="ingredients"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    myLabelStyle={AppStyles.labelStyle}
                    defValue={""}
                    multiline = {true}
                    lineNum= {10}
                    viewStyle={AppStyles.paraStyle}
                    placeholder="Enter appetizer key ingredients."
                    component={ Input }/>
                </Fieldset>
              </FieldsContainer>
            </Form>
            <CardSection>
              <Button
                icon={{name: 'add'}}
                backgroundColor= {AppConfigs.greenColor}
                fontFamily= {AppConfigs.baseFont}
                textStyle={AppStyles.h3}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                onPress={this.onCreatePress.bind(this)}
                title='CREATE' />
            </CardSection>
          </Card>
      </View>
    )
  }

}



AppForm = reduxForm({
  form: 'appDetailsForm'  // a unique identifier for this form
})(AppForm)
const selector = formValueSelector('appDetailsForm');

const mapStateToProps = (state) => {

  const { gluten, hasLoaded, details } = state.appetizer
  const { image, imageAdded, uploadedImage } = state.image
  const { toggle } = state.modal
  return {
    appname: selector(state, 'appname'),
    category: selector(state, 'category'),
    allergies: selector(state, 'allergies'),
    appnotes: selector(state, 'appnotes'),
    ingredients: selector(state, 'ingredients'),
    image, imageAdded, uploadedImage, toggle, gluten, hasLoaded, details }
};


AppForm =  connect(
  mapStateToProps, {
  appCreate,

  glutenFree,

})(AppForm);

export default AppForm
