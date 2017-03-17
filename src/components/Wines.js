import React, {
  Component
} from 'react'
import {
  StyleSheet,
  View,
  Text,
  ListView,
  ListViewDataSource,
  TouchableOpacity
} from 'react-native'
import { Card } from 'react-native-elements'
import SearchBarExport from './common/SearchBar'
import { connect } from 'react-redux';
import { loadWines, showWineSelect } from '../actions';
import DynamicListRow from './common/DynamicListRow'
import WineRow from './common/WineRow';
import AppConfig from '../configs/config'
import AppStyles from '../configs/styles'
class Wines extends Component {
  constructor (props) {
    super(props)
    // PASS IN A REFERENCE TO THE LOCAL companyID
    // THIS MAY CHANGE LATER IF THE USER IS A MEMBER OF MULTIPLE COMPANIES
    this.props.loadWines(this.props.companyID)
    this.ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
  }
  _loadWineScreen = (data) => {
    //console.log('load wine screen ' , data);
    this.props.showWineSelect(data)
    //TODO remove these routes since navigtion method has changed
    route = {
        type: 'push',
        route: {
            key: 'editwine',
            title: 'EDIT WINE'
        }
    }
    this.props._handleNavigate("editwine")
  }
  convertWineArrayToMap = () => {
    const wineCategoryMap = {} // Create the blank map
    //console.log('wine ', this.props.wines);
    //console.log(this.props.wineListLoaded);
    const wines = this.props.wines
    if(this.props.wineListLoaded == true){
      Object.keys(wines).map(function(wineItem) {
        //const item = this.props.wines[wineItem]
        //console.log('wineItem ' , wines[wineItem]);
        if (!wineCategoryMap[wines[wineItem].varietal]) {
          // Create an entry in the map for the varietal if it hasn't yet been created
          wineCategoryMap[wines[wineItem].varietal] = []
        }
        wineCategoryMap[wines[wineItem].varietal].push(wines[wineItem])
      })
    }
    return wineCategoryMap;
  }
  _renderRow(rowData, sectionID, rowID) {
    return (
      <View style={AppStyles.appetizerRowStyle}>
      <TouchableOpacity
        onPress={this._loadWineScreen.bind(this, rowData)}>
            <WineRow {...rowData} />
      </TouchableOpacity>
      </View>
    );
  }
  renderSectionHeader = (sectionData, varietal) => {
    //console.log('varietal ', sectionData.varietal);
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
             Welcome to the Wines page!
           </Text>
           <Text style={AppStyles.h5}>
             We will populate this with database items List.
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
    if(!this.props.wines){
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
  const { wines, wineListLoaded } = state.wines;
  const { companyID} = state.myCompany;
  return { wines, companyID, wineListLoaded };
};

export default connect(mapStateToProps, { loadWines, showWineSelect })(Wines);
