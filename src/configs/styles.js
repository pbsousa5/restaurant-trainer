/**
 * Global App Styles
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

// App Globals
import AppConfig from './config';

/* Styles ==================================================================== */
module.exports = StyleSheet.create({
	appContainer: {
    backgroundColor: AppConfig.ltBlueColor,
    flex:1,
	},
  iconColor: {
      color: '#ffc100'
  },
  appetizerRowStyle : {
        backgroundColor   : '#000000',
        paddingVertical   : 1,
        paddingHorizontal : 1,
        width: AppConfig.windowWidth,
        borderBottomColor : '#000000',
        borderBottomWidth : 1,
        flexDirection     : 'row'
    },
	/* Default */
	container: {
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  emailSignup: {
    alignItems: 'stretch',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
    flex: 1,
  },

  pageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',


  },
  photoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageButton: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,

  },
  containerStyle: {
    height: 50,
    flex: 1,
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  paraStyle: {
    flex: 1,
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  linkStyle: {
    color: AppConfig.redColor,
    fontFamily: AppConfig.baseFont,
    fontWeight: '800',
    fontSize: AppConfig.baseFontSize * 1.1,
    lineHeight: parseInt((AppConfig.baseFontSize * 1.1) + (AppConfig.baseFontSize * 0.5)),
    margin: 0,
    marginTop: 4,
    marginBottom: 4,
    left: 0,
    right: 0,
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 1,
    textShadowColor: '#000000'
  },
  multilineTitle: {
    flex: 1,
  },
  sectionHeader:{
    backgroundColor: AppConfig.blueColor,
    flex: 1,
  },
  containerBorder: {
    borderWidth: 2,
    borderColor:AppConfig.whiteColor,
    borderRadius: 20,
  },
  cardStyle: {
    borderWidth: 0,
    backgroundColor: AppConfig.blueColor,
    flexDirection: 'column',
    justifyContent: 'center',
    //'flex-start' || 'flex-end' || 'center' || 'space-around' || 'space-between'
  },
  topCardWine:{
    borderWidth: 0,
    width: AppConfig.percentWidth,
    backgroundColor: AppConfig.blueColor,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  smallCard: {
    flex: 0.5,
  },
  mediumCard: {
    flex: 2,
  },
  largeCard: {
    flex: 3,
  },
  modal: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: AppConfig.ltBlueColor
  },
  modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  createWine: {
    paddingLeft:2,
    paddingRight:2,
    backgroundColor: AppConfig.ltBlueColor,
    justifyContent: 'space-between',

  },
  labelStyle: {
    color: AppConfig.darkGrey,
    fontSize: 13,
    paddingLeft: 0,
    flex: 1,
    fontFamily: AppConfig.baseFont,
    fontWeight: '800',
  },
  displayText: {
    color: AppConfig.darkGrey,
    fontSize: 13,
    paddingLeft: 0,
    flex: 1,
    /*
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: '#000000',
    */
    fontFamily: AppConfig.baseFont,
    fontWeight: '800',
  },
  inputStyle: {
    borderRadius: 5,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: AppConfig.whiteColor,
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    backgroundColor: AppConfig.blueColor,
    fontSize: 18,
    lineHeight: 46,
    flex: 2,
    flexDirection: 'column',

  },
  paddingInvis: {
    flex: 0.1
  },
  paddedText: {
    paddingTop:10,
    paddingBottom: 10,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor: AppConfig.ltBlueColor,
  },
  topBotPadding: {
    paddingTop:10,
    paddingBottom: 10,
  },
  backColor:{
    backgroundColor: AppConfig.ltBlueColor,
  },
  divider:{
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: AppConfig.blackColor,
    borderBottomWidth: 1,
    borderBottomColor: AppConfig.blackColor,
  },
  modalBox: {
    paddingLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalTop: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  topRight: {
    justifyContent: 'flex-end',
  },
  containerCentered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForm: {
      alignItems: 'center',
      marginTop: 10
  },
  windowSize: {
    height: AppConfig.windowHeight,
    width: AppConfig.windowWidth,
  },
  fullWindowWidth: {
    width: AppConfig.windowWidth,
  },

  /* Aligning items */
  rightAligned: {
    alignItems: 'flex-end',
  },
  leftAligned: {
    alignItems: 'flex-start'
  },

  /* Text Styles */
  wrapText: {
    flexWrap: "wrap",
  },
  baseText: {
    fontFamily: AppConfig.baseFont,
    fontWeight: '500',
    color: AppConfig.textColor,
    fontSize: AppConfig.baseFontSize,
    lineHeight: parseInt(AppConfig.baseFontSize + (AppConfig.baseFontSize * 0.5)),
  },
  placeholderColor: {
    color: AppConfig.whiteColor,
  },
  inputText: {
    fontFamily: AppConfig.baseFont,
    fontWeight: '500',
    color: AppConfig.blackColor,
    fontSize: AppConfig.baseFontSize,
    lineHeight: parseInt(AppConfig.baseFontSize + (AppConfig.baseFontSize * 0.5)),
  },
  fieldText: {
    fontFamily: AppConfig.baseFont,
    fontWeight: '500',
    color: AppConfig.yellowColor,
    fontSize: AppConfig.baseFontSize,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: '#000000',
    lineHeight: parseInt(AppConfig.baseFontSize + (AppConfig.baseFontSize * 0.5)),
  },
  h1: {
    fontFamily: AppConfig.baseFont,
    fontSize: AppConfig.baseFontSize * 3,
    lineHeight: parseInt((AppConfig.baseFontSize * 3) + (AppConfig.baseFontSize * 0.5)),
    color: AppConfig.whiteColor,
    fontWeight: '800',
    margin: 0,
    marginTop: 4,
    marginBottom: 4,
    left: 0,
    right: 0,
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 2,
    textShadowColor: '#000000',
  },
  h2: {
    fontFamily: AppConfig.baseFont,
    fontWeight: '800',
    color: AppConfig.whiteColor,
    fontSize: AppConfig.baseFontSize * 1,
    lineHeight: parseInt((AppConfig.baseFontSize * 1) + (AppConfig.baseFontSize * 0.5)),
    margin: 0,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
    left: 0,
    right: 0,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: '#000000'
  },
  h3: {
    fontFamily: AppConfig.baseFont,
    fontWeight: '500',
    color: AppConfig.whiteColor,
    fontSize: AppConfig.baseFontSize * 1.20,
    lineHeight: parseInt((AppConfig.baseFontSize * 1.20) + (AppConfig.baseFontSize * 0.5)),
    margin: 0,
    marginTop: 4,
    marginBottom: 4,
    left: 0,
    right: 0,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: '#000000',
  },
  h4: {
    fontFamily: AppConfig.baseFont,
    fontWeight: '800',
    color: AppConfig.darkGrey,
    fontSize: AppConfig.baseFontSize * 1.1,
    lineHeight: parseInt((AppConfig.baseFontSize * 1.1) + (AppConfig.baseFontSize * 0.5)),
    margin: 0,
    marginTop: 4,
    marginBottom: 4,
    left: 0,
    right: 0,

  },
  /*
  textShadowOffset: {width: 1, height: 1},
  textShadowRadius: 1,
  textShadowColor: '#000000'
  */
  h5: {
    fontFamily: AppConfig.baseFont,
    fontWeight: '800',
    color: AppConfig.whiteColor,
    fontSize: AppConfig.baseFontSize * 1,
    lineHeight: parseInt((AppConfig.baseFontSize * 1) + (AppConfig.baseFontSize * 0.5)),
    margin: 0,
    marginTop: 4,
    marginBottom: 4,
    left: 0,
    right: 0,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: '#000000'
  },
  h6: {
    fontFamily: AppConfig.baseFont,
    fontWeight: '800',
    color: AppConfig.orangeColor,
    fontSize: AppConfig.baseFontSize * 1,
    lineHeight: parseInt((AppConfig.baseFontSize * 1) + (AppConfig.baseFontSize * 0.5)),
    margin: 0,
    marginTop: 4,
    marginBottom: 4,
    left: 0,
    right: 0,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: '#000000'
  },
  p: {
    fontFamily: AppConfig.baseFont,
    marginBottom: 8,
    fontWeight: '500',
    color: AppConfig.textColor,
    fontSize: AppConfig.baseFontSize,
    lineHeight: parseInt(AppConfig.baseFontSize + (AppConfig.baseFontSize * 0.5)),
  },
  strong: {
    fontWeight: '900',
  },
  fieldContainer: {
    backgroundColor: AppConfig.ltBlueColor,
    borderWidth: 0,
  },
  imageContainer: {
    flex: 1,
    width: AppConfig.windowWidth,
    height: AppConfig.windowHeight,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* MENU STYLES */
  menuIcon:{
    paddingLeft: 10,

  },
  addIcon:{
    paddingRight: 10,

  },
  sideMenu: {
    flex: 1,
    backgroundColor: AppConfig.menuColor,
    paddingTop: 0
  },
  sideMenu2: {
    marginBottom: 20,
    backgroundColor: AppConfig.menuColor,
  },
  sideMenu3: {
    flex: 1,
    width: window.width,
    height: window.height,
    padding: 0,
    //marginTop: 45,
    backgroundColor: AppConfig.menuColor,
  },
  menuText: {
    fontFamily: AppConfig.baseFont,
    fontWeight: '500',
    fontSize: AppConfig.baseFontSize * 1.1,
    lineHeight: parseInt((AppConfig.baseFontSize * 1.1) + (AppConfig.baseFontSize * 0.5)),
    color: AppConfig.whiteColor,
  },
  menuSubText: {
    fontFamily: AppConfig.baseFont,
    fontWeight: '500',
    fontSize: AppConfig.baseFontSize * 1,
    lineHeight: parseInt((AppConfig.baseFontSize * 1) + (AppConfig.baseFontSize * 0.5)),
    color: AppConfig.secondaryTextColor,
  },
  /* Helper Text Styles */
  centered: {
    textAlign: 'center',
  },
  textRightAligned: {
    textAlign: 'right',
  },
  stretchWidth: {
    alignSelf: "stretch",
  },
  /* Give me padding */
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  paddingLeft: {
    paddingLeft: 20,
  },
  paddingRight: {
    paddingRight: 80,
  },
  searchBar: {
    flex:1,
    backgroundColor   : '#000000',
    paddingVertical   : 1,
    paddingHorizontal : 1,
    paddingLeft: 0,
    paddingRight: 0,
    width: AppConfig.windowWidth,
    borderBottomColor : '#000000',
    borderBottomWidth : 1,
  },
  searchIcon: {
    flex: 0.25,
    backgroundColor: AppConfig.greyBack,
  },
  searchBarBox: {
    backgroundColor: AppConfig.greyBack,
    flex:3,
  },

  paddingVertical: {
    paddingVertical: 20,
  },
  paddingTop: {
    paddingTop: 20,
  },
  listTopPadding: {
    paddingTop: 10,
  },
  paddingTopWine: {
    paddingTop: 80,
  },
  paddingBottom: {
    paddingBottom: 20,
  },
  paddingBott3: {
    paddingBottom: 3,
  },
  paddingHorizontalSml: {
    paddingHorizontal: 10,
  },
  paddingLeftSml: {
    paddingLeft: 10,
  },
  paddingRightSml: {
    paddingRight: 10,
  },
  paddingVerticalSml: {
    paddingVertical: 10,
  },
  paddingTopSml: {
    paddingTop: 10,
  },
  paddingBottomSml: {
    paddingBottom: 10,
  },

  /* General Spacing */
  hr: {
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: AppConfig.borderColor,
    height: 1,
    backgroundColor: 'transparent',
    marginTop: 20,
    marginBottom: 20,
  },
  spacer_5: {
    left: 0, right: 0, height: 1,
    marginTop: 5,
  },
  spacer_10: {
    left: 0, right: 0, height: 1,
    marginTop: 10,
  },
  spacer_15: {
    left: 0, right: 0, height: 1,
    marginTop: 15,
  },
  spacer_20: {
    left: 0, right: 0, height: 1,
    marginTop: 20,
  },
  spacer_25: {
    left: 0, right: 0, height: 1,
    marginTop: 25,
  },
  spacer_30: {
    left: 0, right: 0, height: 1,
    marginTop: 30,
  },
  spacer_40: {
    left: 0, right: 0, height: 1,
    marginTop: 40,
  },

  /* Grid */
  row: {
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  rowHeight: {
    height: 100,
  },
  rowStyle : {
        backgroundColor   : '#000000',
        paddingVertical   : 1,
        paddingHorizontal : 1,
        width: AppConfig.windowWidth,
        //borderBottomColor : '#000000',
        //borderBottomWidth : 1,
    },
  photo: {
    height: 80,
    width: 80,
    borderRadius: 20,
    borderWidth:1,
    borderColor: AppConfig.orangeColor,
  },
  roundImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth:1,
    borderColor: AppConfig.orangeColor,
  },
  largePhoto: {
    height: 100,
    width: 100,
    borderRadius: 20,
    borderWidth:3,
    borderColor: AppConfig.orangeColor,
  },
  hugePhoto:{
    height: 300,
    width: 300,
    borderRadius: 20,
    borderWidth:1,
    borderColor: AppConfig.orangeColor,
  },
  checkIcon: {
    height: 50,
    width: 50,
  },
  colorBorder:{
    borderColor: '#FF0000',
    borderWidth: 2,
  },
  wineRow: {
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  wineText: {
    width: 200,
  },
  wineBackground:{
    backgroundColor: '#444b4b',
  },
  flex08:{
    flex: 0.8,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex5: {
    flex: 5,
  },
  flex6: {
    flex: 6,
  },

  /* Forms */
  formLabel: {
    textAlign: 'left',
    marginBottom: 10,
  },
  formInputText: {
    height: 36,
    borderColor: '#cccccc',
    borderWidth: 0.75,
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});
