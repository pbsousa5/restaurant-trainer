import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ListView
} from 'react-native'
import AppStyles from '../../configs/styles'
import AppUtil from '../../configs/util';
import {connect} from 'react-redux'
import { Card, Tab, Icon, List, ListItem } from 'react-native-elements'

class Companies extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }
  renderRow (rowData, sectionID) {
    return (
      <ListItem
        roundAvatar
        key={sectionID}
        title={rowData.name}
        subtitle={rowData.subtitle}
        avatar={{uri:rowData.avatar_url}}
      />
    )
  }
  render(){
    const dataSource = this.ds.cloneWithRows(this.props.companies);
    return(
      <View style={AppStyles.appContainer}>
        <List>
          <ListView
            renderRow={this.renderRow}
            dataSource={dataSource}
          />
        </List>
      </View>
    )
  }

}
const mapStateToProps = state => {
  const { companies } = state.admin
  return { companies }
}

export default connect(mapStateToProps, {

})(Companies);
