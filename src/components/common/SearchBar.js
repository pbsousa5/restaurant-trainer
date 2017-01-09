import React, { Component } from 'react'
import { View, Text, Image } from 'react-native';
import {Button, SearchBar, Icon} from 'react-native-elements'
import { connect } from 'react-redux'
import { SearchWines } from '../../actions'
class SearchBarExport extends Component{
  _handleSearch(){

  }
  render(){
    return(
      <SearchBar
        round
        onChangeText={this._handleSearch}
        placeholder='Filter Wines...' />
    )
  }
}

const mapStateToProps = (state) => {
  const { wines } = state.wines;
  const { companyID} = state.myCompany;
  return { wines, companyID };
};

export default connect(mapStateToProps, { SearchWines })(SearchBarExport);
