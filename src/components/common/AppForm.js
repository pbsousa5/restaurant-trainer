import React, { Component } from 'react';
import {
  View,
  Text,
  Picker,
  ListView,
  Animated,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  LayoutAnimation,
  Switch,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Card, Input, CustomSwitch } from './';
import {
  wineUpdate,
  wineCreate,
  searchWine,
  toggleModal,
  wineData,
  wineNoteAdd,
  wineNoteRemove,
  byTheGlass
} from '../../actions';
import {  Icon, Button} from 'react-native-elements'
import Row from './Row';
//import AnimatedList from 'react-native-animated-list';
import DynamicListRow from './DynamicListRow'
import AppStyles from '../../configs/styles'
import AppConfigs from '../../configs/config'
import ImageSelect from './ImageSelect'
//import Modal from 'react-native-root-modal';
import AnimationModal from '../AnimationModal'
import DetailModal from './DetailsModal'
import RootModal from './modalRoot'
import Spinner from 'react-native-loading-spinner-overlay'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import {
  ActionsContainer,
  FieldsContainer,
  Fieldset,
  Form,
  FormGroup,
  Label,
} from 'react-native-clean-form'
import {
  //Input,
  Select,
} from 'react-native-clean-form/redux-form-immutable'
import _ from 'lodash'
import  Lightbox  from 'react-native-lightbox'

class AppForm extends Component {
  constructor(props){
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        opacity: new Animated.Value(0),
        visible: false,
        scale: new Animated.Value(0),
        x: new Animated.Value(0),
        spinner: false
    }
    this.onSearchPress = _.debounce(this.onSearchPress, 300)
    this.props.hideModal = this.hideModal.bind(this)
    this._addWineNote = this._addWineNote.bind(this)
    this._removeWineNote = this._removeWineNote.bind(this)
    const {
      appname, winery
    } = props
  }

  _addWineNote = (note, id) => {
    this.props.wineNoteAdd(note, id)
  }
  _removeWineNote = (note, id) => {
    this.props.wineNoteRemove(note, id)
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
  }
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
  _renderRow(rowData, sectionID, rowID) {
    //<DynamicListRow>  </DynamicListRow>
        return (
              <TouchableOpacity
                onPress={this.props.wineData.bind(this,rowData)}>
              <View style={AppStyles.rowStyle}>
                    <Row {...rowData} />
              </View>
              </TouchableOpacity>
        );
    }
    onSearchPress(search){
      console.log('searching');
      //const { search } = this.props
      this.props.searchWine({search})
    }
    displayNotes = (data) => {
      console.log(data.join('\n','\n'))
      return data.join('\n')
    }
    renderLightBoxImage = (image) => {
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
      //TODO replace this with a local default wine bottle image
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
    this.props.byTheGlass()
  }
  onCreatePress = () => {
    const { appname, winery, varietal, vintage, winenotes, region } = this.props;
    let image = null
    const glass = this.props.glass
    // CHECK IF CUSTOM IMAGE WAS UPLOADED
    this.props.imageAdded ? image = this.props.uploadedImage : image = this.props.details.image
    const link = this.props.details.link
    const code = this.props.details.code
    this.props.wineCreate({ appname, winery, varietal, vintage, winenotes, region, image, glass, link, code });
  }
  setFormFields = () => {
    console.log('setting form values ');
    //TODO this isnt used anymore but is how you can update form from code
    this.props.change("appname", this.props.details.name)
    this.props.change("winery", this.props.details.producer)
    this.props.change("region", this.props.details.region)
    this.props.change("varietal", this.props.details.varietal)
    this.props.change("vintage", this.props.details.vintage)
    this.props.change("winenotes", this.displayNotes(this.props.notes))
  }
  renderLoadingView() {
    return(
      <View style={[AppStyles.flex1, AppStyles.container, {paddingTop:20}]}>

          <Card style={[AppStyles.cardStyle]}>
            <CardSection style={[AppStyles.row, AppStyles.backColor, AppStyles.paddingLeft, AppStyles.paddingBottom]}>
              { //check for local image added
                this.props.image === null ?
              <Lightbox onRequestClose={() => {alert("Modal has been closed.")}}>
                  <Image source={{ uri: this.CheckURI(this.props.details.image)}} style={AppStyles.photo}/>
              </Lightbox> :
              <Lightbox onRequestClose={() => {alert("Modal has been closed.")}}>
                <Image source={this.props.image} style={AppStyles.photo}/>
              </Lightbox>
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
                    defValue={this.props.details.name}
                    myLabelStyle={AppStyles.labelStyle}
                    viewStyle={AppStyles.containerStyle}
                    lineNum= {2}
                    multiline = {true}
                    label="Name" placeholder="Appetizer name"
                    component={ Input }
                    onChangeAction={this.props.onChangeAction}/>
                  <Field name="category" myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    defValue={this.props.details.producer}
                    myLabelStyle={AppStyles.labelStyle}
                    viewStyle={AppStyles.containerStyle}
                    label="Category" placeholder="Category for this appetizer"
                    component={ Input }/>

                  <Field name="allergies"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    myLabelStyle={AppStyles.labelStyle}
                    defValue={this.props.details.vintage}
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
                    defValue={this.displayNotes(this.props.notes)}
                    multiline = {true}
                    lineNum= {10}
                    viewStyle={AppStyles.paraStyle}
                    placeholder="Enter appetizer tasting notes."
                    component={ Input }/>
                </Fieldset>
                <Fieldset label="key ingredients" last>
                  <Field name="appingredients"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    myLabelStyle={AppStyles.labelStyle}
                    defValue={this.displayNotes(this.props.notes)}
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
  form: 'wineDetailsForm'  // a unique identifier for this form
})(AppForm)
const selector = formValueSelector('wineDetailsForm');

const mapStateToProps = (state) => {
  const { name, description, results, loaded, search, details, loadingModal, glass, searching, hasLoaded } = state.wines
  const { notes } = state.notes
  const { image, imageAdded, uploadedImage } = state.image
  const { toggle, bottle } = state.modal
  return {
    appname: selector(state, 'appname'),
    vintage: selector(state, 'vintage'),
    varietal: selector(state, 'varietal'),
    winery: selector(state, 'winery'),
    region: selector(state, 'region'),
    winenotes: selector(state, 'winenotes'),
    name, image, imageAdded, uploadedImage, description, results, loaded, search, toggle, bottle, notes, details, loadingModal, glass, searching, hasLoaded }
};




AppForm =  connect(
  mapStateToProps, {
  wineUpdate,
  searchWine,
  toggleModal,
  wineData,
  wineNoteAdd,
  wineNoteRemove,
  byTheGlass
})(AppForm);

export default AppForm
