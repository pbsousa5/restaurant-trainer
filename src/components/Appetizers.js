import React, { Component } from 'react'
import {View, Text, Image, ListView, TouchableOpacity, SectionList } from 'react-native'
import { Card } from 'react-native-elements'
import SearchBarExport from './common/SearchBar'
import AppsRow from './common/AppsRow'
import { connect } from 'react-redux';
import { loadAppetizers, showAppetizer, showAppSelect } from '../actions';

import AppConfig from '../configs/config'
import AppStyles from '../configs/styles'
import { MenuIcon} from './common/menu/MenuIcon'
import { AddIcon } from './common/menu/AddIcon'
import _ from 'lodash'

class Appetizers extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'APPETIZERS',
    headerTitleStyle: {
       alignSelf: 'center',
    },
    headerLeft:
    <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
      <MenuIcon style={AppStyles.menuIcon}/>
    </TouchableOpacity>,
    headerRight:
    <TouchableOpacity onPress={() => navigation.navigate('CreateApp')}>
      <AddIcon style={AppStyles.addIcon} type={"ADD"}/>
    </TouchableOpacity>,

  });

  constructor(props){
    super(props)
    this.props.loadAppetizers(this.props.companyID)
    this.ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
  }

  _loadAppsScreen = (data) => {
    console.log('load apps screen ' , data);
    // navigation now handles inside REDUX and the action
    this.props.showAppSelect(data)

    //this.props._handleNavigate("editapps")
  }
  convertFBObj = (firebaseObj) => {
    return Object.keys(firebaseObj).map((key)=> {
        return Object.assign(firebaseObj[key], {key});
    })
  }
  convertAppsArrayToMap = () => {
    const appsCategoryMap = {} // Create the blank map
    //console.log('wine ', this.props.wines);
    console.log(this.props.appetizersLoaded);
    const appetizers = this.props.appetizers
    if(this.props.appetizersLoaded == true){
      Object.keys(appetizers).map(function(appItem) {
        if (!appsCategoryMap[appetizers[appItem].category]) {
          // Create an entry in the map for the category if it hasn't yet been created
          appsCategoryMap[appetizers[appItem].category] = []
        }
        appsCategoryMap[appetizers[appItem].category].push(appetizers[appItem])
      })
    }
    return appsCategoryMap;
  }
  _renderHeader = (headerItem) => {
    console.log("headerItem ", headerItem);
    return (
      <View style={AppStyles.sectionHeader}>
        <Text style={[AppStyles.h3,AppStyles.centered]}>{headerItem.section.key.toUpperCase()}</Text>
      </View>
    )
  }
  _renderSectionRow = ({item, index}) => {
    console.log("item ", item);
    return (
      <View style={AppStyles.appetizerRowStyle}>
      <TouchableOpacity
        onPress={this._loadAppsScreen.bind(this, item)}>
            <AppsRow {...item} />
      </TouchableOpacity>
      </View>
    )
  }
  _renderRow(rowData, sectionID, rowID) {
    return (
      <View style={AppStyles.appetizerRowStyle}>
        <TouchableOpacity
          onPress={this._loadAppsScreen.bind(this, rowData)}>
          <AppsRow {...rowData} />
        </TouchableOpacity>
      </View>
    );
  }
  renderSectionHeader = (sectionData, categories) => {
    return (
      <View style={AppStyles.sectionHeader}>
        <Text style={[AppStyles.h3,AppStyles.centered]}>{categories.toUpperCase()}</Text>
      </View>
    )
  }
  _renderSearchBar() {
    return(
      <SearchBarExport />
    )
  }
  _defaultView(){
    return(
      <View style={[AppStyles.pageContainer, AppStyles.backColor]}>
        <Card>
           <Text style={AppStyles.h4}>
             Welcome to the Appetizers page!
           </Text>
           <Text style={AppStyles.h5}>
             Click on the + icon in the {'\n'}
             top right to get started!
           </Text>
           <Text style={AppStyles.h5}>
             Wines
           </Text>
        </Card>
       </View>
    )
  }
  render(){
    if(!this.props.appetizers){
      return this._defaultView()
    }
    //if(this.props.wineListLoaded == true){
    let sectionData = this.convertFBObj(this.props.appetizers)
    // group by our category
    sectionData = _.groupBy(sectionData, d => d.category)
    // populate the array
    sectionData = _.reduce(sectionData, (acc, next, index) => {
      acc.push({
        key: index,
        data: next
      })
      return acc
    }, [])
    // order app list alphabeitally
    sectionData = _.sortBy(sectionData, d => {
      return [d.key.toUpperCase()];
    })
      return(
        <View style={[AppStyles.pageContainer, AppStyles.backColor]}>
          <SectionList
            renderItem={this._renderSectionRow}
            sections={sectionData}
            onRefresh={() => alert('onRefresh: nothing to refresh :P')}
            refreshing={false}
            renderSectionHeader={this._renderHeader}
            keyExtractor={(item) => item.key}
          />
         </View>
      )
    }
}
/*
old listview way
<ListView
  dataSource={dataSource}
  renderRow={this._renderRow.bind(this)}
  //renderHeader={this._renderSearchBar}
  renderSectionHeader={this.renderSectionHeader}
/>
*/
const mapStateToProps = (state) => {
  const { details, appetizersLoaded, appetizers } = state.appetizer;
  const { companyID } = state.myCompany;
  return { details, appetizersLoaded, companyID, appetizers };
};

export default connect(mapStateToProps, { loadAppetizers, showAppetizer, showAppSelect })(Appetizers);
