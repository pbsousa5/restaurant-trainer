import React, { Component } from 'react';
import {
  View,
  Text,
  Picker,
  ListView,
  Animated,
  TouchableOpacity,
  Image,
  Alert,
  AlertIOS, ListViewDataSource, StyleSheet,
  InteractionManager, RefreshControl, Platform, Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Input } from './common';
import { wineUpdate, wineCreate, searchWine, toggleModal } from '../actions';
import {Button, SearchBar, Icon} from 'react-native-elements'
import Row from './common/Row';
import AnimatedList from 'react-native-animated-list';
import DynamicListRow from './common/DynamicListRow'
import AppStyles from '../configs/styles'
import Modal from 'react-native-root-modal';
import AnimationModal from './AnimationModal'
import DetailModal from './common/DetailsModal'
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
                onPress={this.props.toggleModal}>
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
//{value => this.props.wineUpdate({ prop: 'search', value }
  /*
  <AnimatedList
    animation="scale"
    items={dataSource}
    duration={dataSource}
    renderRow={(data) => <Row {...data} />}
    onRemove={(item) => this._removeItem(item)}
/>
  <ListView
    style={styles.container}
    dataSource={dataSource}
    renderRow={(data) => <Row {...data} />}
  />
  */
  //renderRow={(data) => <Row {...data} />}
  render() {
    if (!this.props.loaded) {
      //console.log("NOT LOADED");
      return this.renderLoadingView();
    }
    //console.log("LOADED");
    const dataSource = this.ds.cloneWithRows(this.props.results.wines);
    if(this.props.toggle){
      this.scaleModal()
    }else{
      this.hideModal()
    }
    return (
      /*
      <Animated.Modal visible={this.props.toggle} style={[
          styles.modal, {
              transform: [
                  {
                      scale: this.state.scale
                  }, {
                      translateX: this.state.x
                  }]}]}>
          <DetailModal {...this.props}/>
      </Animated.Modal>
      <CardSection>
        <Input
          label="Name"
          placeholder="Enter Wine Name"
          value={this.props.name}
          onChangeText={value => this.props.wineUpdate({ prop: 'name', value })}
        />
      </CardSection>

      <CardSection style={{ height: 200 }}>
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
      */
      <View style={[AppStyles.colorBorder, AppStyles.fullWindowWidth]}>


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
              placeholder="Enter Wine Name"
              value={this.props.name}
              onChangeText={value => this.props.wineUpdate({ prop: 'name', value })}
            />
          </CardSection>

          <CardSection style={{ height: 200 }}>
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
/*
<Button
  icon={{name: 'search'}}
  backgroundColor='#03A9F4'
  fontFamily='Lato'
  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
  onPress={this.onSearchPress.bind(this)}
   />
*/
  renderLoadingView() {
    return (
      <View style={styles.removePadding}>
        <Animated.Modal visible={this.props.toggle} style={[
            AppStyles.modal, {
                transform: [
                    {
                        scale: this.state.scale
                    }, {
                        translateX: this.state.x
                    }]}]}>
            <DetailModal/>
        </Animated.Modal>
        <View style={[AppStyles.rowStyle]}>
          <View style={AppStyles.searchBar}>
            <SearchBar
              round
              containerStyle={AppStyles.searchBarBox}
              onChangeText={value => this.onSearchPress(value)}
              placeholder='Search For Wines Here...' />
          </View>


           </View>
          <Text>
            You can search for wines first to populate the fields.  If you cannot find the wine you can always enter the info below to create a new wine.
          </Text>
        <CardSection>
          <Input
            label="Name"
            placeholder="Enter Wine Name"
            value={this.props.name}
            onChangeText={value => this.props.wineUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection style={{ height: 200 }}>
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
 }
};

const mapStateToProps = (state) => {
  const { name, description, type, results, loaded, search, toggle } = state.wines;
  return { name, description, type, results, loaded, search, toggle };
};

export default connect(mapStateToProps, { wineUpdate, searchWine, toggleModal })(WineForm);
