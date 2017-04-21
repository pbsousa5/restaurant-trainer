import FireAuth from 'react-native-firebase-auth';
import firebase from 'firebase'
import {connect} from 'react-redux';
import {startAuthListener, loginEmail} from '../actions'
import React, {Component, PropTypes} from 'react'
import FormValidation from 'tcomb-form-native'
import ValidationForm from './social/validationForm'
import {
    Text,
    TouchableHighlight,
    StyleSheet,
    Animated,
    View,
    Form,
    AsyncStorage
} from 'react-native'

import {
    Image,
    ListView,
    Tile,
    Title,
    Subtitle,
    Overlay,
    Screen,
    Icon,
    Divider,
    NavigationBar,
    Spinner
} from '@shoutem/ui';
import {Button, SocialIcon, Card, FormLabel, FormInput} from 'react-native-elements'
import Modal from 'react-native-root-modal';
import AppStyles from '../configs/styles'



/*
const LoginNav = ({_handleNavigate}) => (
  <View style={styles.containerNav}>

    <Text style={styles.title}>Home</Text>
    <Button onPress={() => _handleNavigate(route)} label='Go To About' />
  </View>
)*/

class Login extends Component {
    constructor(props) {
        super(props);

        //FireAuth.init({iosClientId: <IOS_CLIENT_ID>});
        this.state = {
            visible: false,
            scale: new Animated.Value(1),
            x: new Animated.Value(0),
            isLoading: false
        }
        this.routeToHome = this.routeToHome.bind(this)

    }


    componentDidMount() {
        //this.props.startAuthListener()
        console.log('this.props.userLogged** ' + this.props.userLogged);

      //  FireAuth.setup(this.onLogin, this.onUserChange, this.onLogout, this.emailVerified, this.onError);
    }
    componentWillUnmount() {}

    register = () => {
        const {email, password, firstName, lastName} = this.state;
        FireAuth.register(email, password, {firstName, lastName});
    }

    login = () => {
        FireAuth.login(this.state.email, this.state.password);
        console.log('name: ' + this.props.firstname);
    }

    facebookLogin() {
        FireAuth.facebookLogin();
    }

    googleLogin() {
        FireAuth.googleLogin();
    }

    logout() {
        FireAuth.logout();
    }
    update (){
      FireAuth.update({
        firstName: this.state.firstName,
        lastName: this.state.lastName
      }).then(() => {
        ///...
      }).catch(err => {
        //...
      });
    }

    slideModal = () => {
        this.state.x.setValue(-320);
        this.state.scale.setValue(1);
        Animated.spring(this.state.x, {toValue: 0}).start();
        this.setState({visible: true});
        this.slide = true;
    };

    scaleModal = () => {
        this.state.x.setValue(0);
        this.state.scale.setValue(0);
        Animated.spring(this.state.scale, {toValue: 1}).start();
        this.setState({visible: true});
        this.slide = false;
    };
    hideModal = () => {
        if (this.slide) {
            Animated.timing(this.state.x, {toValue: -320}).start(() => {
                this.setState({visible: false});
            });
        } else {
            Animated.timing(this.state.scale, {toValue: 0}).start(() => {
                this.setState({visible: false});
            });
        }
    };
    setModalVisible(visible) {
        this.setState({visible: visible})
    }

    routeToHome = () => {
      console.log('ROUTE TO HOME BEING CALLED');
      //this.props._handleNavigate(route)
    }
    render() {
        const {routes} = this.context;
        return (
            <View style={AppStyles.appContainer}>

                <View style={styles.buttonsContainer}>
                    <Card title="CHOOSE A LOGIN METHOD">
                        <Button raised buttonStyle={{
                            borderRadius: 30,
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 10
                        }} backgroundColor="#22a3ed" icon={{
                            name: 'email'
                        }} title='Sign In With Email' onPress={() => this.props.loginEmail()}/>
                        <Button raised buttonStyle={{
                            borderRadius: 30,
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 10
                        }} backgroundColor="#3B5998" icon={{
                            name: 'facebook',
                            type: 'zocial'
                        }} title='Sign In With Facebook' onPress={this.facebookLogin}/>
                        <Button raised buttonStyle={{
                            borderRadius: 30,
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 10
                        }} backgroundColor="#dd4b39" icon={{
                            name: 'google',
                            type: 'zocial'
                        }} title='Sign In With Google' onPress={this.googleLogin}/>
                    </Card>
                </View>
            </View>
        )

    }
}

const mapStateToProps = state => {
    return {userLogged: state.userLogged};
};

export default connect(mapStateToProps, {startAuthListener, loginEmail})(Login);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#22a3ed'
    },
    btnGoogle: {
        backgroundColor: '#dd4b39'
    },
    inputText: {
        height: 40
    },
    backButton: {
        flex: 1,
        alignSelf: 'flex-start'
    },
    buttonsContainer: {
        top: 65
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    containerNav: {
        paddingTop: 60
    },
    modal: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    button: {
        backgroundColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    },
    close: {
        position: 'absolute',
        right: 20,
        top: 40,
        backgroundColor: 'red'
    },
    modalContainer: {
        height: 100,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    text: {
        color: '#fff'
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
