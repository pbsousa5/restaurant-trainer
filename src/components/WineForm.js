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
import { connect, reset } from 'react-redux';

import { CardSection, Card, Input, CustomSwitch } from './common';
import {
  wineUpdate,
  wineCreate,
  searchWine,
  toggleModal,
  wineData,
  wineNoteAdd,
  wineNoteRemove,
  byTheGlass,
  stopLoading
  } from '../actions';
import { SearchBar, Icon, Button} from 'react-native-elements'
import Row from './common/Row';
//import AnimatedList from 'react-native-animated-list';
import DynamicListRow from './common/DynamicListRow'
import AppStyles from '../configs/styles'
import AppConfigs from '../configs/config'
import ImageSelect from './common/ImageSelect'
//import Modal from 'react-native-root-modal';
import AnimationModal from './AnimationModal'
import DetailModal from './common/DetailsModal'
import RootModal from './common/modalRoot'
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

class WineForm extends Component {
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
    this._clearFormFields = this._clearFormFields.bind(this)
    const {
      winename, winery
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
      this.state.scale.setValue(0);
      Animated.spring(this.state.x, {toValue: 0}).start();
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
    //console.log("search: ", this.props.searching);
    if (!this.props.loaded) {
      console.log("LOADING VIEW");
      return this.renderLoadingView();
    }
    //renderRow={(data) => <Row {...data} />}
    else{
      console.log("RESULTS: ", this.props.results.wines);
      const dataSource = this.ds.cloneWithRows(this.props.results.wines);
      if(this.props.toggle){
        //this.scaleModal()
        this.slideModal()
      }else{
        this.hideModal()
      }
      return (
        <View style={[AppStyles.fullWindowWidth]}>
            <View style={AppStyles.flex1}>
              <RootModal {...this.props} />
            </View>
            <View style={[AppStyles.searchBar, AppStyles.row]}>
              <View style={AppStyles.searchIcon}/>
              <SearchBar
                round
                containerStyle={[AppStyles.searchBarBox]}
                onChangeText={value => this.onSearchPress(value)}
                placeholder='Search For Wines Here...' />
                <View style={AppStyles.searchIcon}>
                <ActivityIndicator
                  color={AppConfigs.whiteColor}
                  style={[AppStyles.searchIcon, {opacity: this.props.searching ? 1.0 : 0.0}]}
                  size="small"/>
                </View>
            </View>

            <View style={{ flex: 1 }}>
              <Spinner visible={this.props.loadingModal}
                textContent={"LOADING..."}
                color={AppConfigs.whiteColor}
                textStyle={AppStyles.h1}></Spinner>
            </View>
            <View style={[AppStyles.backColor, AppStyles.flex1]}>
            <ListView
              dataSource={dataSource}
              renderRow={this._renderRow.bind(this)}
            />
            </View>
            <View>{/*HAD TO ADD THIS TO PUSH LISTVIEW UP FOR SOME REASON */}</View>
        </View>
      );
    }
    //console.log("LOADED");

  }
  CheckURI(uri){
    if(uri === ""){
      //TODO replace this with a local default wine bottle image
      return "https://static.vecteezy.com/system/resources/previews/000/000/624/original/red-wine-bottle-vector.jpg"
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
    const { winename, winery, varietal, vintage, winenotes, region } = this.props;
    let image = null
    const glass = this.props.details.glass
    // CHECK IF CUSTOM IMAGE WAS UPLOADED
    this.props.imageAdded ? image = this.props.uploadedImage : image = this.props.details.image
    image === "" ? image = this.CheckURI("") : null
    const link = this.props.details.link
    const code = this.props.details.code
    console.log("SUBMIT WINE NAME: ", winename);
    this.props.wineCreate({ winename, winery, varietal, vintage, winenotes, region, image, glass, link, code });
    //this._clearFormFields()
    return dispatch => {
      // RESET THE WINE FORM TO DEFAULT
      dispatch(reset('wineDetailsForm'));
    }

  }
  setFormFields = () => {
    // stopLoading forces the hasLoaded to false
    this.props.stopLoading()

    //TODO this isnt used anymore but is how you can update form from code
    this.props.change("winename", this.props.details.name)
    this.props.change("winery", this.props.details.producer)
    this.props.change("region", this.props.details.region)
    this.props.change("varietal", this.props.details.varietal)
    this.props.change("vintage", this.props.details.vintage)
    this.props.change("winenotes", this.displayNotes(this.props.notes))
  }
  _clearFormFields = () => {
    console.log("CLEAR FORM FIELDS");
    this.props.change("winename", "")
    this.props.change("winery", "")
    this.props.change("region", "")
    this.props.change("varietal", "")
    this.props.change("vintage", "")
    this.props.change("winenotes", "")
  }
  changedText(val){
      console.log("C ",val);
  }
  renderLoadingView() {
    // set the default values in the form
    // ONLY ONCE!!!
    // the timeout stops setState errors from firing

    //THIS BREAKS THE SUBMISSION FOR SOME REASON
    //IT WILL RESET THE VALUES TO DETAILS results
    //EVERYTIME YOU TYPE?

    if(this.props.hasLoaded){
      setTimeout(
      () => { this.setFormFields() },
      200
      )
    }

    return(
      <View style={[AppStyles.flex1, AppStyles.container]}>
        <View style={[AppStyles.searchBar, AppStyles.row]}>
          <View style={AppStyles.searchIcon}/>
          <SearchBar
            round
            containerStyle={[AppStyles.searchBarBox]}
            onChangeText={value => this.onSearchPress(value)}
            placeholder='Search For Wines Here...' />
            <View style={AppStyles.searchIcon}>
            <ActivityIndicator
              color={AppConfigs.whiteColor}
              style={[AppStyles.searchIcon, {opacity: this.props.searching ? 1.0 : 0.0}]}
              size="small"/>
            </View>
        </View>
          {this.props.showHelp == false ? <View style={AppStyles.paddingTop}/> :
            <Text style={[AppStyles.paddedText, AppStyles.h4]}>
               You can search for wines first to populate the fields.
              If you cannot find the wine you can always enter the info below to create a new wine.
            </Text>
          }

          <Card style={[AppStyles.cardStyle]}>
            <CardSection style={[AppStyles.row, AppStyles.backColor, AppStyles.paddingLeft, AppStyles.paddingBottom]}>
              { //check for local image added
                this.props.image === null ?
              <Lightbox onRequestClose={null}
                renderContent={this.renderLightBoxImage.bind(this, this.CheckURI(""))}>
                  <Image source={{ uri: this.CheckURI("")}} style={AppStyles.photo}/>
              </Lightbox> :
              <Lightbox onRequestClose={null}
                renderContent={this.renderLightBoxImage.bind(this, this.props.image.uri)}>
                <Image source={this.props.image} style={AppStyles.photo}/>
              </Lightbox>

              //END CHECK LOCAL IMAGE
            }
              <ImageSelect />
            </CardSection>
            <Form>
              <FieldsContainer style={AppStyles.fieldContainer}>
                <Fieldset label="Bottle details" style={{color:AppConfigs.greenColor}}>

                  <Field
                    name="winename"
                    myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    defValue={this.props.details.name}
                    myLabelStyle={AppStyles.labelStyle}
                    viewStyle={AppStyles.containerStyle}
                    lineNum= {2}
                    multiline = {true}
                    label="Bottle name" placeholder="Bottle name"
                    component={ Input }
                    onChangeText={value => this.changedText(value)}
                    />
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

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  },
  removePadding: {
    paddingLeft: 0,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    paddingTop: 50
  },

  deleteWrapper : {
     paddingVertical : 10,
     width           : 80,
     alignSelf       : 'flex-end'
 },

};

WineForm = reduxForm({
  form: 'wineDetailsForm'  // a unique identifier for this form
})(WineForm)
const selector = formValueSelector('wineDetailsForm');

const mapStateToProps = (state) => {
  const { name, description, results, loaded,
    search, details, loadingModal, searching, hasLoaded, showHelp } = state.wines
  const { notes } = state.notes
  const { image, imageAdded, uploadedImage } = state.image
  const { toggle, bottle } = state.modal
  return {
    winename: selector(state, 'winename'),
    vintage: selector(state, 'vintage'),
    varietal: selector(state, 'varietal'),
    winery: selector(state, 'winery'),
    region: selector(state, 'region'),
    winenotes: selector(state, 'winenotes'),
    name, image, imageAdded, uploadedImage, description, results,
    loaded, search, toggle, bottle, notes, details, loadingModal,
   searching, hasLoaded, showHelp }
};




WineForm =  connect(
  mapStateToProps, {
  wineUpdate,
  searchWine,
  toggleModal,
  wineData,
  wineNoteAdd,
  wineNoteRemove,
  byTheGlass,
  stopLoading
})(WineForm);

export default WineForm
