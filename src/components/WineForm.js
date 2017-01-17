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
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Card, Input } from './common';
import {
  wineUpdate,
  wineCreate,
  searchWine,
  toggleModal,
  wineData,
  wineNoteAdd,
  wineNoteRemove } from '../actions';
import { SearchBar, Icon} from 'react-native-elements'
import Row from './common/Row';
//import AnimatedList from 'react-native-animated-list';
import DynamicListRow from './common/DynamicListRow'
import AppStyles from '../configs/styles'
//import Modal from 'react-native-root-modal';
import AnimationModal from './AnimationModal'
import DetailModal from './common/DetailsModal'
import RootModal from './common/modalRoot'
import { reduxForm } from 'redux-form/immutable'
import {
  ActionsContainer,
  Button,
  FieldsContainer,
  Fieldset,
  Form,
  FormGroup,
  Label,
} from 'react-native-clean-form'
import {
  //Input,
  Select,
  Switch
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
    }
    this.onSearchPress = _.debounce(this.onSearchPress, 300)
    this.props.hideModal = this.hideModal.bind(this)
    this._addWineNote = this._addWineNote.bind(this)
    this._removeWineNote = this._removeWineNote.bind(this)

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

            <RootModal {...this.props} />
            <View style={AppStyles.searchBar}>
              <SearchBar
                round
                containerStyle={AppStyles.searchBarBox}
                onChangeText={value => this.onSearchPress(value)}
                placeholder='Search For Wines Here...' />
            </View>


            <ListView
              dataSource={dataSource}
              renderRow={this._renderRow.bind(this)}
            />
            <CardSection>
              <Input
                label="Name"
                refName="wineName"
                placeholder="Enter Wine Name"
                value={this.props.name}
                onChangeText={value => this.props.wineUpdate({ prop: 'name', value })}
              />
            </CardSection>

            <CardSection>
              <Input
                label="Description"
                placeholder="Enter a wine description here."
                value={this.props.description}
                onChangeText={value => this.props.wineUpdate({ prop: 'description', value })}
              />
            </CardSection>

            <CardSection style={{ flexDirection: 'column', height: 100 }}>
              <Text style={styles.pickerTextStyle}>Varietal</Text>
              <Picker
                style={{ flex: 1 }}
                selectedValue={this.props.type}
                onValueChange={value => this.props.wineUpdate({ prop: 'type', value })}
              >
                <Picker.Item label="White" value="White" />
                <Picker.Item label="Red" value="Red" />
                <Picker.Item label="Sparkling" value="Sparkling" />
                <Picker.Item label="Rose" value="Rose" />
              </Picker>
            </CardSection>

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
    console.log('subnmit');
  }
  renderLoadingView() {
    //this.refs.myTextInput.value = this.state.myTextInputInitialValue;
    //{//value={this.props.name}}
    /*
    <Animated.Modal visible={this.props.toggle} style={[
        AppStyles.modal, {
            transform: [
                {
                    scale: this.state.scale
                }, {
                    translateX: this.state.x
                }]}]}>
        <DetailModal {...this.props}/>
    </Animated.Modal>
    */
    return (
      <View style={[AppStyles.flex1, AppStyles.container]}>
        <View style={[AppStyles.rowStyle]}>
          <View style={AppStyles.searchBar}>
            <SearchBar
              round
              containerStyle={AppStyles.searchBarBox}
              onChangeText={value => this.onSearchPress(value)}
              placeholder='Search For Wines Here...' />
          </View>
           </View>
          <Text style={[AppStyles.paddedText, AppStyles.h4]}>
            You can search for wines first to populate the fields.  If you cannot find the wine you can always enter the info below to create a new wine.
          </Text>

          <Card style={AppStyles.cardStyle}>

            <CardSection style={[AppStyles.backColor, AppStyles.paddingLeft]}>
              <Image source={{ uri: this.CheckURI(this.props.details.image)}} style={AppStyles.photo}/>
            </CardSection>
            <Form>
              <FieldsContainer style={AppStyles.fieldContainer}>
                <Fieldset label="Bottle details">
                  <Input myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    value={this.props.details.name}
                    myLabelStyle={AppStyles.labelStyle}
                    name="bottle_name" label="Bottle name" placeholder="Bottle name" />
                  <Input myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    value={this.props.details.producer}
                    myLabelStyle={AppStyles.labelStyle}
                    name="winery" label="Winery" placeholder="Winery" />
                  <Input myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    lable="Region"
                    myLabelStyle={AppStyles.labelStyle}
                    value={this.props.details.region}
                    name="region" label="Region" placeholder="Region" />
                  <Input myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    myLabelStyle={AppStyles.labelStyle}
                    value={this.props.details.varietal}
                    name="varietal" label="Varietal" placeholder="Varietal" />
                  <Input myStyle={[AppStyles.inputStyle, AppStyles.inputText]}
                    myLabelStyle={AppStyles.labelStyle}
                    value={this.props.details.vintage}
                    name="vintage" label="Vintage" placeholder="Vintage" />
                  <Switch label="By the glass" border={false} name="by_glass" />
                </Fieldset>
                <Fieldset label="Wine tasting notes" last>
                  <TextInput
                    value={this.displayNotes(this.props.notes)}
                    style={[AppStyles.inputStyle, AppStyles.inputText]}
                    {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                    editable = {true}
                    multiline = {true}
                    numberOfLines= {10}
                    placeholderTextColor="grey"
                    placeholder="Enter wine tasting notes."
                  />
                </Fieldset>
              </FieldsContainer>
            </Form>

          </Card>
      </View>
/*
<CardSection style={AppStyles.smallCard}>
  <Input
    label="Name"
    refName="wineName"
    placeholder="Enter Wine Name"
    value={this.props.details.name}
    onChangeText={value => this.props.wineUpdate({ prop: 'name', value })}
  />
</CardSection>
<CardSection style={AppStyles.smallCard}>
  <Input
    label="Winery"
    refName="wineProducer"
    placeholder="Enter Winery"
    value={this.props.details.producer}
    onChangeText={value => this.props.wineUpdate({ prop: 'producer', value })}
  />
</CardSection>
<CardSection style={AppStyles.smallCard}>
  <Input
    label="Region"
    refName="wineRegion"
    placeholder="Enter Wine Region"
    value={this.props.details.region}
    onChangeText={value => this.props.wineUpdate({ prop: 'region', value })}
  />
</CardSection>
<CardSection style={[AppStyles.largeCard, AppStyles.flex5]}>

  <Input
    label="Wine Notes"
    placeholder="Enter a wine description."
    value={this.displayNotes(this.props.notes)}
    onChangeText={value => this.props.wineUpdate({ prop: 'description', value })}
  />
</CardSection>
<CardSection style={AppStyles.smallCard}>
<Text style={styles.pickerTextStyle}>Varietal</Text>
<Input
  placeholder="Enter a wine varietal."
  value={this.props.details.varietal}
  onChangeText={value => this.props.wineUpdate({ prop: 'type', value })}
/>
</CardSection>
<Picker
  style={{ flex: 1 }}
  selectedValue={this.props.type}
  onValueChange={value => this.props.wineUpdate({ prop: 'type', value })}
>
*/
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

const mapStateToProps = (state) => {
  const { name, description, type, results, loaded, search, details } = state.wines
  const { notes } = state.notes
  const { toggle, bottle } = state.modal
  return { name, description, type, results, loaded, search, toggle, bottle, notes, details }
};
WineForm = reduxForm({
  form: 'initializeFromState'  // a unique identifier for this form
})(WineForm)
export default connect(

  mapStateToProps, {
  wineUpdate,
  searchWine,
  toggleModal,
  wineData,
  wineNoteAdd,
  wineNoteRemove
})(WineForm);
