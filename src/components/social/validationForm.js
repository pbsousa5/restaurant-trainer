import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  TextInput,
  ScrollView,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'
import FormValidation from 'tcomb-form-native'
import {
  Button,
  SocialIcon,
  Card,
  FormLabel,
  FormInput
} from 'react-native-elements'
import {
  emailChanged,
  passwordChanged,
  loginUser,
  createCompany,
  companyChanged
} from '../../actions';
import { connect } from 'react-redux';
import ImageSelect from '../common/ImageSelect'
import  Lightbox  from 'react-native-lightbox'
// App Globals
import AppStyles from '../../configs/styles'
import AppUtil from '../../configs/util'

// Components
//import Button from '../components/button'
import Alerts from '../alerts'
import { CardSection } from '../common';

/* Component ==================================================================== */
class Form extends Component {
  static componentName = 'Form';

  constructor(props) {
    super(props);
    this.navigateHome = this.navigateHome.bind(this)
    // Email Validation
    var valid_email = FormValidation.refinement(
      FormValidation.String, function (email) {

        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
      }
    );

    // Password Validation - Must be 6 chars long
    var valid_password = FormValidation.refinement(
      FormValidation.String, function (password) {
        if(password.length < 6) return false;
        return true;
      }
    );

    // Initial state
    this.state = {
      resultMsg: {
        status: '',
        success: '',
        error: '',
      },
      form_fields: FormValidation.struct({
        First_name: FormValidation.String,
        Last_name: FormValidation.String,
        Email: valid_email,
        Password: valid_password,
        Confirm_password: valid_password,
      }),
      empty_form_values: {
        First_name: '',
        Last_name: '',
        Email: '',
        Password: '',
        Confirm_password: '',
      },
      form_values: {},
      options: {
        fields: {
          First_name: { error: 'Please enter your first name' },
          Last_name: { error: 'Please enter your last name' },
          Email: { error: 'Please enter a valid email' },
          Password: {
            error: 'Your new password must be more than 6 characters',
            secureTextEntry: true,
          },
          Confirm_password: {
            error: 'Please repeat your new password',
            secureTextEntry: true,
          },
        }
      },
    }
  }

  /**
    * Executes after all modules have been loaded
    */
  componentDidMount = async () => {
    // Get user data from AsyncStorage to populate fields
    const value = await AsyncStorage.getItem('user');
    if (value !== null) {
      this.setState({ form_values: JSON.parse(value) });
    }
  }

  /**
    * Save Form Data to App
    */
  _saveData = () => {
    let values = JSON.stringify(this.state.form_values);
    return AsyncStorage.setItem('user', values);
  }

  /**
    * Delete Data
    */
  _deleteData = () => {
     AsyncStorage.removeItem('user')
      .then(() => {
        this.setState({ form_values: this.state.empty_form_values });
      }).catch(() => {
        Alert.alert('Oops', 'Something went wrong when deleting');
      });
  }

  /**
    * Sign Up
    */
  _signUp = () => {
    const { email, password, company } = this.props;
    // Get new values and update
    var values = this.refs.form.getValue();

    // Check whether passwords match
    if(values && values.Password != values.Confirm_password) {
      this.setState({
        form_values: {
          ...values
        },
        options: FormValidation.update(this.state.options, {
          fields: {
            Confirm_password: {
              hasError: {'$set': true},
              error: {'$set': 'Passwords don\'t match'}
            }
          }
        })
      });
      return false;
    }

    // Form is valid
    if(values) {
      this.setState({form_values: values}, () => {
        // Persist Data
        this._saveData()
          .then(() => {
            // Scroll to top, to show message
            if (this.refs && this.refs.scrollView) {
              this.refs.scrollView.scrollTo({ y: 0 });
            }
            this.props.loginUser(values.Email, values.Password, values.First_name, values.Last_name );
            //this.props._goBack();
            // GO TO HOME SCREEN ON LOGIN

            /*
            // Show save message
            this.setState({
              resultMsg: { success: 'Awesome, that saved!' }
            });
            */
          }).catch((error) => {
            // Show error message
            this.setState({
              resultMsg: { error: error }
            });
          });
      });
    }
  }
  hideModal(){
    console.log("Hide Modal");
  }
  onEmailChange(text) {
    console.log('email ' + text);
    this.props.emailChanged(text);
  }
  onPasswordChange(text) {
    console.log('password ' + text);
    this.props.passwordChanged(text);
  }
  navigateHome = () => {
    console.log("ERROR navigateHome");
    setTimeout(function(){this.props._handleNavigate(route) }, 500)
  }
  /**
  * RENDER
  */
  render = () => {
    var Form = FormValidation.form.Form;
    
    return (
      <ScrollView automaticallyAdjustContentInsets={false}
        ref={'scrollView'}
        style={[AppStyles.column, AppStyles.appContainer]}
        contentContainerStyle={[AppStyles.containerCentered, AppStyles.emailSignup]}>

        <Card title={this.state.form_values.First_name == '' ? "Sign Up" : "Update Profile"} >
        <View style={[AppStyles.paddingHorizontal]}>
          <CardSection style={[AppStyles.row, AppStyles.backColor, AppStyles.paddingLeft, AppStyles.paddingBottom]}>
            { //check for local image added
              this.props.userImage === null ?
            <Lightbox onRequestClose={null}
              renderContent={this.renderLightBoxImage.bind(this, require('../../../images/user_icon.jpg'))}>
                <Image source={require('../../../images/user_icon.jpg')} style={AppStyles.photo}/>
            </Lightbox> :
            <Lightbox onRequestClose={null}
              renderContent={this.renderLightBoxImage.bind(this, this.props.userImage.uri)}>
              <Image source={this.props.userImage} style={AppStyles.photo}/>
            </Lightbox>

            //END CHECK LOCAL IMAGE
          }
            <ImageSelect type={"user"}/>
          </CardSection>
          <Alerts
            status={this.state.resultMsg.status}
            success={this.state.resultMsg.success}
            error={this.state.resultMsg.error} />

          <View style={AppStyles.spacer_20} />

          <Form
            ref="form"
            type={this.state.form_fields}
            value={this.state.form_values}
            options={this.state.options} />
        </View>

        <View style={[AppStyles.row, AppStyles.spaceBetween, {paddingLeft: 30, paddingRight: 30}]}>
            <Button
              raised
              buttonStyle={{borderRadius: 20, marginLeft: 15, marginRight: 15, marginBottom: 10}}
              backgroundColor="#dd4b39"
              title='CLEAR'
              onPress={this._deleteData}/>
            <Button
              raised
              buttonStyle={{borderRadius: 20, marginLeft: 15, marginRight: 15, marginBottom: 10}}
              backgroundColor="#22a3ed"
              title='SUBMIT'
              onPress={this._signUp}/>

        </View>
      </Card>
      </ScrollView>
    );
  }
  CheckURI(uri){
    if(uri === ""){
      //TODO replace this with a local default wine bottle image
      return "https://static.vecteezy.com/system/resources/previews/000/000/624/original/red-wine-bottle-vector.jpg"
    }else{
      return uri
    }
  }
  renderLightBoxImage = (image) => {
    return(
      <View style={AppStyles.photoContainer}>
        <Image source={{ uri: this.CheckURI(image)}}
          style={[AppStyles.hugePhoto ]}/>
      </View>
    )
  }
}
const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, company, userImage } = auth;
  return { email, password, error, loading, company, userImage };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, createCompany, companyChanged
})(Form);

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    paddingTop: 65,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  backButton: {
    flex: 1,
    alignSelf: 'flex-start'
  },
});

/* Export Component ==================================================================== */
//export default Form
