import React, { Component } from 'react'
import {View, Text, Image, ListView } from 'react-native'
import { Card } from 'react-native-elements'
import SearchBarExport from './common/SearchBar'
import { connect } from 'react-redux';
import { loadAppetizers, showAppetizer } from '../actions';

import AppConfig from '../configs/config'
import AppStyles from '../configs/styles'

class Appetizers extends Component {
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
    this.props.showWineSelect(data)
    route = {
        type: 'push',
        route: {
            key: 'editapps',
            title: 'EDIT APPETIZERS'
        }
    }
    this.props._handleNavigate(route)
  }
  convertAppsArrayToMap = () => {
    const appsCategoryMap = {} // Create the blank map
    //console.log('wine ', this.props.wines);
    console.log(this.props.appetizersLoaded);
    const appetziers = this.props.appetziers
    if(this.props.appetizersLoaded == true){
      Object.keys(appetziers).map(function(appItem) {
        //const item = this.props.wines[wineItem]
        //console.log('wineItem ' , wines[wineItem]);
        if (!appsCategoryMap[appetziers[appItem].type]) {
          // Create an entry in the map for the varietal if it hasn't yet been created
          appsCategoryMap[appetziers[appItem].type] = []
        }
        appsCategoryMap[appetziers[appItem].type].push(appetziers[appItem])
      })
    }
    return appsCategoryMap;
  }
  _renderRow(rowData, sectionID, rowID) {
    return (
      <View style={AppStyles.appetizerRowStyle}>
      <TouchableOpacity
        onPress={this._loadAppsScreen.bind(this, rowData)}>
          {// <WineRow {...rowData} />
          }
      </TouchableOpacity>
      </View>
    );
  }
  renderSectionHeader = (sectionData, varietal) => {
    console.log('varietal ', sectionData.varietal);
    return (
      <View style={AppStyles.sectionHeader}>
        <Text style={[AppStyles.h3,AppStyles.centered]}>{varietal.toUpperCase()}</Text>
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

      const dataSource = this.ds.cloneWithRowsAndSections(this.convertWineArrayToMap())
      return(
        <View style={[AppStyles.pageContainer, AppStyles.backColor]}>
            <ListView
              dataSource={dataSource}
              renderRow={this._renderRow.bind(this)}
              renderHeader={this._renderSearchBar}
              renderSectionHeader={this.renderSectionHeader}
            />
         </View>
      )
    }
}

const mapStateToProps = (state) => {
  const { details, appetizersLoaded } = state.appetizer;
  const { companyID } = state.myCompany;
  return { details, appetizersLoaded, companyID };
};

export default connect(mapStateToProps, { loadAppetizers, showAppetizer })(Appetizers);
