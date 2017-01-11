import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ListView,
  ListViewDataSource
 } from 'react-native'
import { toggleModal } from '../../actions';
import { connect } from 'react-redux';
import AppStyles from '../../configs/styles'
import AppConfig from '../../configs/config'
import {
  Button,
  SocialIcon,
  Card,
  FormLabel,
  FormInput,
  Icon,
  Checkbox
} from 'react-native-elements'
import  ReviewDetails  from './ReviewDetails'

export default class DetailModal extends Component {
  constructor(props){
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this._addWineNote = this.props._addWineNote.bind(this)
    this._removeWineNote = this.props._removeWineNote.bind(this)

  }

  componentDidMount(){
    console.log(this.context.store);
  }
//<Image source={this.props.wines.bottle.image} style={AppStyles.photo}/>
  render(){
    const dataSource = this.ds.cloneWithRows(this.props.bottle.reviews);
    return(
      <View style={[AppStyles.modalContainer,{height:AppConfig.windowHeight, width:AppConfig.windowWidth}]}>
        <Icon
          iconStyle={AppStyles.topRight}
          raised
          onPress={this.props.toggleModal}
          name="close"/>
        <View style={AppStyles.row}>
          <Image source={{uri: this.props.bottle.image}} style={AppStyles.largePhoto}/>
          <View style={AppStyles.container, AppStyles.paddingLeft, AppStyles.paddingRight}>
            <Text style={AppStyles.h4}>{this.props.bottle.name}</Text>
            <Text style={AppStyles.h4}>{this.props.bottle.varietal}</Text>
            <Text style={AppStyles.h4}>{this.props.bottle.vintage}</Text>
            <Text style={AppStyles.h4}>{this.props.bottle.region}</Text>
          </View>

        </View>
        <ListView
           dataSource={dataSource}
           renderRow={this._renderRow.bind(this)}
         />
      </View>
    )
  }

  _renderRow(rowData, sectionID, rowID) {
    //console.log(rowID);
    if(rowData.body === ""){
      return null
    }
    return (
      <View style={AppStyles.rowStyle}>
        <ReviewDetails
          {...rowData }
          id={rowID}
          _addWineNote={this._addWineNote.bind(this)}
          _removeWineNote={this._removeWineNote.bind(this)}/>
      </View>
    )
  }
}
DetailModal.contextTypes = {
  store: React.PropTypes.object.isRequired
}
/*
const mapStateToProps = (state) => {
  const { bottle } = state.wines.bottle;
  return { bottle };
};

export default connect(mapStateToProps, { })(DetailModal)
*/
