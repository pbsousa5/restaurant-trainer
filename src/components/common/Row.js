import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import AppStyles from '../../configs/styles'
import AppConfig from '../../configs/config'
import LinearGradient from 'react-native-linear-gradient'

const Row = (props) => (
  <View style={[AppStyles.rowHeight, AppStyles.leftAligned, AppStyles.backColor, AppStyles.fullWindowWidth]}>
    <LinearGradient colors={AppConfig.blueGradient} style={[styles.paddingBottom]}>
    <View style={[AppStyles.wineRow,AppStyles.fullWindowWidth]}>
      <View style={AppStyles.leftAligned}>
        <Image source={{ uri: CheckURI(props.image)}} style={AppStyles.photo} />
      </View>
      <View style={AppStyles.paddingLeft}>
        <View style={AppStyles.paddingLeft, AppStyles.container, AppStyles.wrapText, AppStyles.paddingRight}>
          <Text style={AppStyles.h4}>{`${props.name}`}</Text>
          <Text style={AppStyles.h5}>{props.vintage}</Text>
        </View>
      </View>
    </View>
  </LinearGradient>
  </View>)
function CheckURI(uri){
  if(uri === ""){
    //TODO replace this with a local default wine bottle image
    return "https://static.vecteezy.com/system/resources/previews/000/000/624/original/red-wine-bottle-vector.jpg"
  }else{
    return uri
  }

}
/*
  <Animated.View style={[styles.wrapper, {opacity: this.state.opacity}]}>
      <Image source={{ uri: props.Labels[0].Url}} style={styles.image}/>
      <Text style={styles.text}>
          {`${props.Name}`}
      </Text>
  </Animated.View>
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        height: 40,
        width: 40,
        marginRight: 16,
        backgroundColor: '#C9D5E6',
        borderRadius: 20,
    },
    text: {
        fontSize: 20
    }
});

  <View style={styles.container}>
    <Image source={{ uri: props.Labels[0].Url}} style={styles.photo} />
    <Text style={styles.text}>
      {`${props.Name}`}
    </Text>
  </View>

);


*/
export default Row

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  aBorder: {

  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 80 ,
    width: 80,
    borderRadius: 20,
  },
  paddingBottom: {
    paddingBottom: 10,
  },
});
