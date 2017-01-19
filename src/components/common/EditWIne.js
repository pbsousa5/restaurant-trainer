import React, { Component } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { reduxForm, Field, formValueSelector } from 'redux-form/immutable'
import AppStyles from '../../configs/styles'
import AppConfigs from '../../configs/config'
import { connect } from 'react-redux';
import {
  FieldsContainer,
  Fieldset,
  Form,
} from 'react-native-clean-form'
import {
  wineEdit,
  wineUpdate
} from '../../actions';
import { CardSection, Card, Input, CustomSwitch } from './';

class EditWine extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <ScrollView>
      <View style={[AppStyles.flex1, AppStyles.container, AppStyles.backColor, {paddingTop:70}]}>
          <Card style={[AppStyles.cardStyle]}>
            <CardSection style={[AppStyles.backColor,
              AppStyles.paddingLeft, AppStyles.paddingBottom,{paddingTop:10}]}>
              <Image source={{ uri: this.CheckURI(this.props.details.image)}} style={AppStyles.photo}/>
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
                      <Text style={[AppStyles.displayText, AppStyles.topBotPadding, {color: AppConfigs.greenColor}]}>YES</Text>
                    </View>
                  </View>
                </Fieldset>
                <Fieldset label="Wine tasting notes" last>
                  <View style={AppStyles.flex1}>
                    <Text style={AppStyles.flex1} numberOfLines={20}>{this.props.details.winenotes}</Text>
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
  _renderEditView = () => {
    return(
      <View style={[AppStyles.flex1, AppStyles.container, {paddingTop:70}]}>
          <Card style={[AppStyles.cardStyle]}>
            <CardSection style={[AppStyles.backColor, AppStyles.paddingLeft, AppStyles.paddingBottom]}>
              <Image source={{ uri: this.CheckURI(this.props.details.image)}} style={AppStyles.photo}/>
            </CardSection>
            <Form>
              <FieldsContainer style={AppStyles.fieldContainer}>
                <Fieldset label="Bottle details">
                  <Field
                    name="winename"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    defValue={this.props.details.name}
                    myLabelStyle={AppStyles.labelStyle}
                    viewStyle={AppStyles.containerStyle}
                    label="Bottle name" placeholder="Bottle name"
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
                  <CustomSwitch label="By the glass" value={false}
                    onSwitchChange={this.onSwitchChange.bind(this)}
                    myLabelStyle={AppStyles.labelStyle}/>
                </Fieldset>
                <Fieldset label="Wine tasting notes" last>
                  <Field name="winenotes"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    myLabelStyle={AppStyles.labelStyle}
                    defValue={this.displayNotes(this.props.notes)}
                    multiline = {true}
                    lineNum= {10}
                    viewStyle={AppStyles.paraStyle}
                    placeholder="Enter wine tasting notes."
                    component={ Input }/>
                </Fieldset>
              </FieldsContainer>
            </Form>
            <CardSection>
              <Button
                icon={{name: 'add'}}
                backgroundColor= {AppConfigs.greenColor}
                fontFamily= {AppConfigs.baseFont}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                onPress={this.onCreatePress.bind(this)}
                title='UPDATE' />
            </CardSection>
          </Card>
      </View>
    )
  }
  CheckURI(uri){
    if(uri === ""){
      //TODO replace this with a local default wine bottle image
      return "https://static.vecteezy.com/system/resources/previews/000/000/624/original/red-wine-bottle-vector.jpg"
    }else{
      return uri
    }
  }
  displayNotes = (data) => {
    return data.join('\n')
  }

}

EditWine = reduxForm({
  form: 'wineDetailsForm'  // a unique identifier for this form
})(EditWine)
const selector = formValueSelector('wineDetailsForm');

const mapStateToProps = (state) => {
  const { name, description, results, loaded, search, details, loadingModal, glass } = state.wines


  return {
    winename: selector(state, 'winename'),
    vintage: selector(state, 'vintage'),
    varietal: selector(state, 'varietal'),
    winery: selector(state, 'winery'),
    region: selector(state, 'region'),
    winenotes: selector(state, 'winenotes'),
    name, description, results, loaded, search, details, loadingModal, glass }
};




EditWine =  connect(
  mapStateToProps, {
  wineUpdate
})(EditWine);

export default EditWine
