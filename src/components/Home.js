import React, {Component} from 'react'
import AppStyles from '../configs/styles'
import AppUtil from '../configs/util';
import * as firebase from 'firebase';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native'
import {Icon, NavigationBar, Title} from '@shoutem/ui';
import {List, ListItem, Button, Card, FormLabel, FormInput} from 'react-native-elements'

import {logOutUser, CheckForCompanyExist, CheckName, DisplayFirebaseImage,
  createCompanyName, NoCompanyCreated, CompanyExists, UpdateLocalID, DeleteCompany, LocalCompanyCheck } from '../actions'
import {connect} from 'react-redux'
import LocalStore from 'react-native-simple-store';
import ImageSelect from './common/ImageSelect'
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
        // this.props.CheckForCompanyExist()
        // FIRST CHECK IF USER HAS ADDED A LOCAL COMPANY
        // THIS IS SO WE CAN SHOW THE ADD NAME FIELD IF THE
        // APP CRASHES DURING SIGN IN
        this.props.CheckName()
        // check for company ID
        // WILL CREATE IF DOESNT EXIST
        this.props.LocalCompanyCheck()
    }

    _submitCompany(){
      console.log('this.props.companyID ',this.props.companyID);
      const coID = this.props.companyID
      const coName = this.state.companyName
      const image = this.props.uploadedImage
      this.props.createCompanyName({coID, coName, image})

    }
    _deleteCompany(){
      this.props.DeleteCompany()
      //TODO reroute to login for testing
      this.routeToLogin()

    }
    //TODO remove this is for testing uploaded image
    renderUploadedImage = () =>{
      return(
        <Image source={{uri: this.props.uploadedImage}} style={AppStyles.roundImage}/>
      )
    }
    routeToLogin = () => {
        route = {
            type: 'push',
            route: {
                key: 'login',
                title: 'LOGIN'
            }
        }
        this.props.logOutUser()
        this.props._handleNavigate(route)
    }

    render() {
      //TODO better way to handle companyID creation currently I just check
      // if it has not been created yet.  This only comes into effect
      // after logging out and deleting the user.
      !this.props.companyID ? this.props.LocalCompanyCheck() : null
      if(this.props.localName == true){
        return(
          <View style={[AppStyles.pageContainer, AppStyles.backColor]}>
          <Image style={AppStyles.imageContainer} source={require('../images/lights-bokeh-small.jpg')}>
          <Card
            title='WELCOME TO RESTARAUNT TRAINER'>

            <Text style={{marginBottom: 10}}>
              Start adding items to your database by selecting a section in the menu under the top left icon.
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
              title='DELETE COMPANY' />
          </Card>
          </Image>
        </View>)
      }else{
        //console.log(this.props.myCompany);
        return(<View style={AppStyles.pageContainer}>
          <Image style={AppStyles.imageContainer} source={require('../images/lights-bokeh-small.jpg')}>

          <Card
            title='WELCOME TO RESTARAUNT TRAINER'>

            <View style={AppStyles.containerForm}>
            <Text style={{marginBottom: 10}}>
              You will need to create a company name so we can start buidling the database. Any information entered below can be changed later.
            </Text>
            <FormLabel>Your Company ID</FormLabel>
            <Text>{this.props.companyID}</Text>
            <FormLabel>Upload an image for your restaurant</FormLabel>
            <View>
              {//TODO remove this is for testing and displaying uploaded image
              }
              {this.props.imageAdded ? this.renderUploadedImage() : null}
            </View>
            <View style={AppStyles.row}>
              {
                this.props.image === null ?
              <Image source={require('../../images/res5.jpg')} style={AppStyles.roundImage}/>
              :
              <Image source={this.props.image} style={AppStyles.roundImage}/>
            }
              <ImageSelect />
            </View>
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
          </Image>
        </View>)
      }


    }
}
const mapStateToProps = state => {
  const { userLogged, LoggedIn, company, companyID, localName } = state.myCompany
  const { image, imageAdded, uploadedImage } = state.image
  return { userLogged, LoggedIn, company, companyID, localName, imageAdded, image, uploadedImage }
}

export default connect(mapStateToProps, {
  NoCompanyCreated,
  DeleteCompany,
  logOutUser,
  CheckForCompanyExist,
  createCompanyName,
  CompanyExists,
  LocalCompanyCheck,
  UpdateLocalID,
  CheckName,
  DisplayFirebaseImage
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
    },
    imageContainer: {
      flex: 1,
      width: undefined,
      height: undefined,
      backgroundColor:'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
})
