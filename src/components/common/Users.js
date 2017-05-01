import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native'
import AppStyles from '../../configs/styles'
import AppUtil from '../../configs/util';
import {connect} from 'react-redux'
import { Card, Tab, Icon, List, ListItem } from 'react-native-elements'
import AppConfig from '../../configs/config'
import { loadCompanyUsers } from '../../actions';
import { MenuIcon} from './menu/MenuIcon'


class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'USERS',
    headerTitleStyle: {
       alignSelf: 'center',
       marginRight: 56,
    },
    headerLeft:
    <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
      <MenuIcon style={AppStyles.menuIcon}/>
    </TouchableOpacity>,

  });
  componentDidMount() {
   this.makeRemoteRequest();
 }

 makeRemoteRequest = () => {
   // load users from firebase
   this.props.loadCompanyUsers(this.props.companyID)
   const { page, seed } = this.state;
   const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
   this.setState({ loading: true });
   fetch(url)
     .then(res => res.json())
     .then(res => {
       this.setState({
         data: page === 1 ? res.results : [...this.state.data, ...res.results],
         error: res.error || null,
         loading: false,
         refreshing: false
       });
     })
     .catch(error => {
       this.setState({ error, loading: false });
     });
 };
 _renderItem({ item, index }) {
  console.log("WTF!!");
  console.log('users ', item);
  return(
    <ListItem
      roundAvatar
      title={"Title"}
      subtitle={`Email:  ${item.email}`}
    />
  )

  }
  convertFBObj = (firebaseObj) => {
    return Object.keys(firebaseObj).map((key)=> {
        return Object.assign(firebaseObj[key], {key});
    })
  };

  render(){
    console.log("this.state.data ", this.state.data);
    //console.log("this.props.users ", this.convertFBObj(this.props.users));
    if(this.props.users){
      var users = this.convertFBObj(this.props.users)
      return(
        <View style={AppStyles.appContainer}>
          <List>
           <FlatList
             data={users}
             renderItem={this._renderItem}
           />
         </List>
        </View>
      )
    }
    else{
      return <View style={AppStyles.appContainer}></View>
    }

  }
/*

<ListItem
  roundAvatar
  title={`${item.admin} ${item.name.last}`}
  subtitle={item.email}
  avatar={{ uri: item.picture.thumbnail }}

/>
*/

}

const mapStateToProps = state => {
  const { isAdmin, users } = state.admin
  const { companyID } = state.myCompany
  return { isAdmin, companyID, users }
}

export default connect(mapStateToProps, {
  loadCompanyUsers
})(Users);
