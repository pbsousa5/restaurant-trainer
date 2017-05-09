import React, { Component } from 'react';
import {
  View,
  Animated,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Card, Input, CustomSwitch } from '../common';
import {  Icon, Button} from 'react-native-elements'
import AppStyles from '../../configs/styles'
import AppConfigs from '../../configs/config'
import ImageSelect from '../common/ImageSelect'
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
  entCreate,
  glutenFree
} from '../../actions';

class EntreeForm extends Component {
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
      entname
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
    const {  entname, category, allergies, entnotes, ingredients } = this.props;
    let image = null
    const gluten = this.props.gluten
    // CHECK IF CUSTOM IMAGE WAS UPLOADED
    this.props.imageAdded ? image = this.props.uploadedImage : image = this.CheckURI("")
    console.log("SUBMIT FIELDS: ", entname, category, allergies, entnotes, ingredients);
    this.props.entCreate({ entname, category,
      allergies, gluten, entnotes, ingredients, image });
  }
  setFormFields = () => {
    //console.log("SETTING FORM FIELDS APPS");
    // set fields to default values
    // in case of this appfrom they should be empty
    this.props.change("entname", this.props.details.name)
    this.props.change("category", this.props.details.category)
    this.props.change("allergies", this.props.details.allergies)
    this.props.change("entnotes", this.props.details.entnotes)
    this.props.change("ingredients", this.props.details.ingredients)
  }
  renderLoadingView() {
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
                <Fieldset label="Entree details" style={{color:AppConfigs.greenColor}}>
                  <Field
                    name="entname"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    defValue={""}
                    myLabelStyle={AppStyles.labelStyle}
                    viewStyle={AppStyles.containerStyle}
                    lineNum= {2}
                    multiline = {true}
                    label="Name" placeholder="Entree name"
                    component={ Input }
                    />
                  <Field name="category" myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    defValue={""}
                    myLabelStyle={AppStyles.labelStyle}
                    viewStyle={AppStyles.containerStyle}
                    label="Category" placeholder="Category for this entree"
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
                  <Field name="entnotes"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    myLabelStyle={AppStyles.labelStyle}
                    defValue={""}
                    multiline = {true}
                    lineNum= {10}
                    viewStyle={AppStyles.paraStyle}
                    placeholder="Enter entree tasting notes."
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
                    placeholder="Enter entree key ingredients."
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



EntreeForm = reduxForm({
  form: 'entDetailsForm'  // a unique identifier for this form
})(EntreeForm)
const selector = formValueSelector('entDetailsForm');

const mapStateToProps = (state) => {

  const { gluten, hasLoaded, details } = state.entrees
  const { image, imageAdded, uploadedImage } = state.image
  const { toggle } = state.modal
  return {
    entname: selector(state, 'entname'),
    category: selector(state, 'category'),
    allergies: selector(state, 'allergies'),
    entnotes: selector(state, 'entnotes'),
    ingredients: selector(state, 'ingredients'),
    image, imageAdded, uploadedImage, toggle, gluten, hasLoaded, details }
};


EntreeForm =  connect(
  mapStateToProps, {
  entCreate,
  glutenFree,
})(EntreeForm);

export default EntreeForm
