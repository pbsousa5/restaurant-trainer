import React, {Component} from 'react'
import AppStyles from '../configs/styles'
import AppUtil from '../configs/util';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native'
import {Icon, NavigationBar, Title} from '@shoutem/ui';
import {List, ListItem, Button, Card, FormLabel, FormInput} from 'react-native-elements'

import {logOutUser, CheckForCompanyExist,
  CompanyCreated, NoCompanyCreated, CompanyExists, UpdateLocalID} from '../actions'
import {connect} from 'react-redux'
import LocalStore from 'react-native-simple-store';

class HomeClass extends Component {

    constructor(props) {
      super(props)
      this._submitCompany = this._submitCompany.bind(this)
      this._deleteCompany = this._deleteCompany.bind(this)
      console.log('home');
    }
    componentDidMount() {
        //Listen for firebase auth change
        console.log('home');
        this.props.CheckForCompanyExist()
        LocalStore.get('localID').then(localID => {
            if (!localID) {
                console.log('localID is null: ' + localID);
                const id = Math.random().toString(36).substring(7);
                LocalStore.save('localID', {value: id});
                this.props.NoCompanyCreated(id)
            } else {
                console.log('localID value: ' + localID.value);
                this.props.CompanyExists(localID.value)
            }
        }).catch(error => {
        console.log(error.message);
      });


    }

    _submitCompany(){
      console.log(this.state.companyName);
      this.props.CompanyCreated(this.props.companyID, this.state.companyName)
    }
    _deleteCompany(){
      LocalStore.delete('localID')
    }
    routeToLogin = () => {
        route = {
            type: 'push',
            route: {
                key: 'login',
                title: 'LOGIN'
            }
        }
        this.props.logOutUser
        this.props._handleNavigate(route)
    }
    render() {
      if(this.props.myCompany){
        //console.log('this.state.company');
      //  console.log(this.props.myCompany);
        return(
          <View style={[AppStyles.pageContainer, AppStyles.backColor]}>
          <Card
            title='WELCOME TO RESTARAUNT TRAINER'>
            <Text style={{marginBottom: 10}}>
              You will need to create a company name so we can start buidling the database.
            </Text>
            <Button
              icon={{name: 'code'}}
              backgroundColor='#03A9F4'
              fontFamily='Lato'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              onPress={this.props.UpdateLocalID}
              title='CREATE ID' />
            <Button
              icon={{name: 'code'}}
              backgroundColor='#03A9F4'
              fontFamily='Lato'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              onPress={this._deleteCompany.bind(this)}
              title='LOGOUT' />
          </Card>
        </View>)
      }else{
        //console.log(this.props.myCompany);
        return(<View style={AppStyles.pageContainer}>
          <Card
            title='WELCOME TO RESTARAUNT TRAINER'>
            <View style={styles.containerForm}>
            <Text style={{marginBottom: 10}}>
              You will need to create a company name so we can start buidling the database.
            </Text>
            <FormLabel>Company ID</FormLabel>
            <Text>{this.props.companyID}</Text>
            <FormLabel>Company Name</FormLabel>
            </View>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, borderRadius:5}}
              placeholder="Enter Company Name"
              onChangeText={(companyName) => this.setState({companyName})}

              />
              <View style={styles.containerForm}>
                <Button
                  backgroundColor='#03A9F4'
                  fontFamily='Lato'
                  buttonStyle={{borderRadius: 30, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title='SUBMIT'
                  onPress={this._submitCompany.bind(this)}/>
                </View>

          </Card>
        </View>)
      }
        return (
            <View style={AppStyles.pageContainer}>
                <View style={AppStyles.pageContainer}>
                    <Text style={styles.welcome}>
                        Welcome to React Native! {this.props.LoggedIn}
                    </Text>
                    <Text style={styles.instructions}>
                        To get started, edit index.ios.js
                    </Text>
                    <Text style={styles.instructions}>
                        Press Cmd+R to reload,{'\n'}
                        Cmd+Control+Z for dev menu
                    </Text>
                    <Text style={styles.instructions}>
                        Test
                    </Text>
                </View>
                <Text style={styles.title}>Home</Text>
                <Button raised onPress={this.routeToLogin} buttonStyle={{
                    borderRadius: 20,
                    marginLeft: 15,
                    marginRight: 15,
                    marginBottom: 10
                }} backgroundColor="#dd4b39" title='LOG OUT'/>
            </View>
        )

    }
}
const mapStateToProps = state => {
    return {
      userLogged: state.userLogged,
      LoggedIn: state.LoggedIn,
      myCompany: state.myCompany.company,
      companyID:state.myCompany.companyID
    };
};

export default connect(mapStateToProps, {
  NoCompanyCreated,
  logOutUser,
  CheckForCompanyExist,
  CompanyCreated,
  CompanyExists,
  UpdateLocalID
})(HomeClass);

const styles = StyleSheet.create({
    title: {
        marginBottom: 20,
        fontSize: 22,
        textAlign: 'center'
    },
    button: {
        position: 'absolute',
        top: 20,
        padding: 10
    },
    caption: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        top: 60
    },
    containerForm: {
        alignItems: 'center',
        marginTop: 10
    },
    inputStyle:{
      flex: 1
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
})
