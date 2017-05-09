import React, {
  Component
} from 'react'
import {
  StyleSheet,
  View,
  Text,
  SectionList,
  ListViewDataSource,
  TouchableOpacity
} from 'react-native'
import { Card } from 'react-native-elements'
import SearchBarExport from '../common/SearchBar'
import { connect } from 'react-redux';
import { loadEntrees, showEntSelect } from '../../actions';
import EntreeRow from './EntreeRow';
import AppConfig from '../../configs/config'
import AppStyles from '../../configs/styles'
import { MenuIcon} from '../common/menu/MenuIcon'
import {AddIcon} from '../common/menu/AddIcon'
import _ from 'lodash'

class Entrees extends Component {

  constructor (props) {
    super(props)
    // PASS IN A REFERENCE TO THE LOCAL companyID
    // TODO THIS MAY CHANGE LATER IF THE USER IS A MEMBER OF MULTIPLE COMPANIES
    this.props.loadEntrees(this.props.companyID)

  }
  static navigationOptions = ({ navigation }) => ({
    title: 'ENTREES',
    headerTitleStyle: {
       alignSelf: 'center',
    },
    headerLeft:
    <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
      <MenuIcon style={AppStyles.menuIcon}/>
    </TouchableOpacity>,
    headerRight:
    <TouchableOpacity onPress={() => navigation.navigate('CreateEntree')}>
      <AddIcon style={AppStyles.addIcon} type={"ADD"}/>
    </TouchableOpacity>,

  });
  _loadEntreescreen = (data) => {
    //console.log('load wine screen ' , data);
    this.props.showEntSelect(data)
  }
  convertFBObj = (firebaseObj) => {
  //  console.log("firebaseObj ", firebaseObj  );
    return Object.keys(firebaseObj).map((key)=> {
        return Object.assign(firebaseObj[key], {key});
    })
  };

   _renderSectionRow = ({item, index}) => {
     console.log("item ", item);
     return (
       <View style={AppStyles.appetizerRowStyle}>
       <TouchableOpacity
         onPress={this._loadEntreescreen.bind(this, item)}>
             <EntreeRow {...item} />
       </TouchableOpacity>
       </View>
     )
   }

  renderSectionHeader = (sectionData) => {
    //console.log('varietal ', sectionData.varietal);
    return (
      <View style={AppStyles.sectionHeader}>
        <Text style={[AppStyles.h3,AppStyles.centered]}>{sectionData.varietal.toUpperCase()}</Text>
      </View>
    )
  }
  _renderHeader = (headerItem) => {
    console.log("headerItem ", headerItem);
    return (
      <View style={AppStyles.sectionHeader}>
        <Text style={[AppStyles.h3,AppStyles.centered]}>{headerItem.section.key.toUpperCase()}</Text>
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
             Welcome to the Entrees page!
           </Text>
           <Text style={AppStyles.h5}>
             We will populate this with database items List.
           </Text>
           <Text style={AppStyles.h5}>
             Click on the + icon in the {'\n'}
             top right to get started!
           </Text>
           <Text style={AppStyles.h5}>
             Entrees
           </Text>
        </Card>
       </View>
    )
  }
  render(){
    if(!this.props.entrees){
      return this._defaultView()
    }
    let sectionData = this.convertFBObj(this.props.entrees)
    // group by our varietals
    sectionData = _.groupBy(sectionData, d => d.category)
    // populate the array
    sectionData = _.reduce(sectionData, (acc, next, index) => {
      acc.push({
        key: index,
        data: next
      })
      return acc
    }, [])
    // order wine list alphabeitally
    sectionData = _.sortBy(sectionData, d => {
      return [d.key.toUpperCase()];
    })
    //console.log("sectionData wines ", sectionData);
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
const mapStateToProps = (state) => {
  const { entrees, entreeListLoaded } = state.entrees;
  const { companyID } = state.myCompany;
  const { isAdmin } = state.admin;
  return { entrees, companyID, entreeListLoaded, isAdmin };
};

export default connect(mapStateToProps, { loadEntrees, showEntSelect })(Entrees);
