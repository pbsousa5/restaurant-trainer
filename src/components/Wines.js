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
import SearchBarExport from './common/SearchBar'
import { connect } from 'react-redux';
import { loadWines } from '../actions';
import DynamicListRow from './common/DynamicListRow'
import WineRow from './common/WineRow';
import AppConfig from '../configs/config'
class Wines extends Component {
  constructor (props) {
    super(props)
    // PASS IN A REFERENCE TO THE LOCAL companyID
    // THIS MAY CHANGE LATER IF THE USER IS A MEMBER OF MULTIPLE COMPANIES
    this.props.loadWines(this.props.companyID)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }
  _renderRow(rowData, sectionID, rowID) {
    return (
      <View style={styles.rowStyle}>
      <TouchableOpacity
        onPress={this.props.toggleModal}>
            <WineRow {...rowData} />
      </TouchableOpacity>
      </View>
    );
  }
  _renderSearchBar() {
    return(
      <SearchBarExport />
    )
  }
  _defaultView(){
    return(
      <View style={styles.container}>
           <View style={styles.container}>
           <Text style={styles.welcome}>
             Welcome to the Wines page!
           </Text>
           <Text style={styles.instructions}>
             We will populate this with database items List.
           </Text>
           <Text style={styles.instructions}>
             Click on the + icon in the {'\n'}
             top right to get started!
           </Text>
           <Text style={styles.instructions}>
             Wines
           </Text>
         </View>
       </View>
    )
  }
  render(){
    if(!this.props.wines){
      return this._defaultView()
    }
    const dataSource = this.ds.cloneWithRows(this.props.wines);
    return(
      <View style={styles.container}>
          <ListView
            dataSource={dataSource}
            renderRow={this._renderRow.bind(this)}
            renderHeader={this._renderSearchBar}
          />
       </View>
    )
  }
}
const mapStateToProps = (state) => {
  const { wines } = state.wines;
  const { companyID} = state.myCompany;
  return { wines, companyID };
};

export default connect(mapStateToProps, { loadWines })(Wines);


const styles = StyleSheet.create({
  rowStyle : {
        backgroundColor   : '#000000',
        paddingVertical   : 1,
        paddingHorizontal : 1,
        width: AppConfig.windowWidth,
        borderBottomColor : '#000000',
        borderBottomWidth : 1,
        flexDirection     : 'row'
    },
  title: {
    marginBottom: 20,
    fontSize: 22,
    textAlign: 'center'
  },
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 70,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
