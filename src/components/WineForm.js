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
  Switch
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Card, Input, CustomSwitch } from './common';
import {
  wineUpdate,
  wineCreate,
  searchWine,
  toggleModal,
  wineData,
  wineNoteAdd,
  wineNoteRemove,
  byTheGlass } from '../actions';
import { SearchBar, Icon, Button} from 'react-native-elements'
import Row from './common/Row';
//import AnimatedList from 'react-native-animated-list';
import DynamicListRow from './common/DynamicListRow'
import AppStyles from '../configs/styles'
import AppConfigs from '../configs/config'
//import Modal from 'react-native-root-modal';
import AnimationModal from './AnimationModal'
import DetailModal from './common/DetailsModal'
import RootModal from './common/modalRoot'
import Spinner from 'react-native-loading-spinner-overlay'
import { reduxForm, Field, formValueSelector } from 'redux-form/immutable'
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

  //renderRow={(data) => <Row {...data} />}
  render() {
    if (!this.props.loaded) {
      //console.log("NOT LOADED");
      return this.renderLoadingView();
    }else{
      const dataSource = this.ds.cloneWithRows(this.props.results.wines);
      if(this.props.toggle){
        this.scaleModal()
      }else{
        this.hideModal()
      }
      return (
        <View style={[AppStyles.fullWindowWidth]}>
            <View style={AppStyles.flex1}>
              <RootModal {...this.props} />
            </View>
            <View style={AppStyles.searchBar}>
              <SearchBar
                round
                containerStyle={AppStyles.searchBarBox}
                onChangeText={value => this.onSearchPress(value)}
                placeholder='Search For Wines Here...' />
            </View>

            <View style={{ flex: 1 }}>
              <Spinner visible={this.props.loadingModal}
                textContent={"Loading..."}
                color={AppConfigs.orangeColor}
                textStyle={{color: AppConfigs.orangeColor}}></Spinner>
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
    const glass = this.props.glass
    const image = this.props.details.image
    const link = this.props.details.link
    const code = this.props.details.code
    this.props.wineCreate({ winename, winery, varietal, vintage, winenotes, region, image, glass, link, code });
  }
  setFormFields = () => {
    console.log('setting form values ');
    //TODO this isnt used anymore but is how you can update form from code
    this.props.change("winename", this.props.details.name)
    this.props.change("winery", this.props.details.producer)
    this.props.change("region", this.props.details.region)
    this.props.change("varietal", this.props.details.varietal)
    this.props.change("vintage", this.props.details.vintage)
    this.props.change("winenotes", this.displayNotes(this.props.notes))
  }
  renderLoadingView() {
    {this.props.details.hasLoaded ? this.setFormFields() : null}
    return (
      <View style={[AppStyles.flex1, AppStyles.container]}>
          <View style={[AppStyles.searchBar]}>
            <SearchBar
              round
              containerStyle={AppStyles.searchBarBox}
              onChangeText={value => this.onSearchPress(value)}
              placeholder='Search For Wines Here...' />
          </View>
          {this.props.details.hasLoaded ? <View style={AppStyles.paddingTop}/> :
            <Text style={[AppStyles.paddedText, AppStyles.h4]}>
               You can search for wines first to populate the fields.
              If you cannot find the wine you can always enter the info below to create a new wine.
            </Text>

          }

          <Card style={[AppStyles.cardStyle]}>
            <CardSection style={[AppStyles.backColor, AppStyles.paddingLeft, AppStyles.paddingBottom]}>
              <Image source={{ uri: this.CheckURI(this.props.details.image)}} style={AppStyles.photo}/>
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
                title='CREATE' />
            </CardSection>
          </Card>
      </View>
    );
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
  const { name, description, results, loaded, search, details, loadingModal, glass } = state.wines
  const { notes } = state.notes
  const { toggle, bottle } = state.modal
  return {
    winename: selector(state, 'winename'),
    vintage: selector(state, 'vintage'),
    varietal: selector(state, 'varietal'),
    winery: selector(state, 'winery'),
    region: selector(state, 'region'),
    winenotes: selector(state, 'winenotes'),
    name, description, results, loaded, search, toggle, bottle, notes, details, loadingModal, glass }
};




WineForm =  connect(
  mapStateToProps, {
  wineUpdate,
  searchWine,
  toggleModal,
  wineData,
  wineNoteAdd,
  wineNoteRemove,
  byTheGlass
})(WineForm);

export default WineForm
