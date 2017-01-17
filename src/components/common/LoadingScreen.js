import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import AppStyles from '../../configs/styles'
import { startAuthListener } from '../../actions'
import firebase from 'firebase'

const routeLogin = {
     type: 'push',

     route: {
         key: 'login',
         title: 'LOGIN'
     }
}
const routeHome = {
   type: 'push',
   route: {
       key: 'home',
       title: 'HOME'
   }
}


class LoadingScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      animating: true,
      hasRedirected: false,
    }


  }

  componentWillReceiveProps(nextProps){
    if(nextProps.hasResponded && !this.state.hasRedirected){
      if(nextProps.LoggedIn){
        console.log('routing home');
        this.props._handleNavigate(routeHome)
        this.setState({hasRedirected: true})
      }else{
        console.log('routing login');
        this.props._handleNavigate(routeLogin)
        this.setState({hasRedirected: true})
      }
    }
  }

  render(){
    return(
      <View style={[AppStyles.container, AppStyles.modalBox, AppStyles.backColor]}>
        <ActivityIndicator
        animating={this.state.animating}
        style={[styles.centering, {height: 200}]}
        size="large"
      />
        <Text style={AppStyles.h1}>Loading...</Text>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  const { LoggedIn, hasResponded } = state.userLogged;
  return { LoggedIn, hasResponded };
};

export default connect(mapStateToProps, { startAuthListener })(LoadingScreen);

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
});