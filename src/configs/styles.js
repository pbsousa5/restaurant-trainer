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
    backgroundColor: "#000",
	},

	/* Default */
	container: {
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardStyle: {
    borderWidth: 1,
    backgroundColor: AppConfig.lightGrey,

    flexDirection: 'column',
    justifyContent: 'center',
    //'flex-start' || 'flex-end' || 'center' || 'space-around' || 'space-between'
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
      backgroundColor: 'rgba(255, 0, 0, 0.2)'
  },
  modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  createWine: {
    paddingTop:70,
    paddingLeft:2,
    paddingRight:2,
    backgroundColor: AppConfig.greyBack,
    justifyContent: 'space-between',

  },
  labelStyle: {
    color: AppConfig.secondaryColor,
    fontSize: 13,
    paddingLeft: 0,
    flex: 0.7,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: '#000000',
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
    backgroundColor: AppConfig.greyBack,
  },
  backColor:{
    backgroundColor: AppConfig.greyBack,
  },
  modalBox: {
    paddingLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  topRight: {
    justifyContent: 'flex-end',
  },
  containerCentered: {
    justifyContent: 'center',
    alignItems: 'center',
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
    color: AppConfig.whiteColor,
    fontSize: AppConfig.baseFontSize,
    lineHeight: parseInt(AppConfig.baseFontSize + (AppConfig.baseFontSize * 0.5)),
  },
  h1: {
    fontFamily: AppConfig.baseFont,
    fontSize: AppConfig.baseFontSize * 2,
    lineHeight: parseInt((AppConfig.baseFontSize * 2) + (AppConfig.baseFontSize * 0.5)),
    color: AppConfig.primaryColor,
    fontWeight: '800',
    margin: 0,
    marginTop: 4,
    marginBottom: 4,
    left: 0,
    right: 0,
  },
  h2: {
    fontFamily: AppConfig.baseFont,
    color: AppConfig.primaryColor,
    fontSize: AppConfig.baseFontSize * 1.5,
    lineHeight: parseInt((AppConfig.baseFontSize * 1.5) + (AppConfig.baseFontSize * 0.5)),
    margin: 0,
    marginTop: 4,
    marginBottom: 4,
    left: 0,
    right: 0,
  },
  h3: {
    fontFamily: AppConfig.baseFont,
    fontWeight: '500',
    color: AppConfig.primaryColor,
    fontSize: AppConfig.baseFontSize * 1.25,
    lineHeight: parseInt((AppConfig.baseFontSize * 1.25) + (AppConfig.baseFontSize * 0.5)),
    margin: 0,
    marginTop: 4,
    marginBottom: 4,
    left: 0,
    right: 0,
  },
  h4: {
    fontFamily: AppConfig.baseFont,
    fontWeight: '800',
    color: AppConfig.whiteColor,
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
    textShadowOffset: {width: 2, height: 2},
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
    backgroundColor: AppConfig.greyBack,
  },
  /* MENU STYLES */
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
    backgroundColor: 'gray',
    padding: 0,
    marginTop: 45,
    backgroundColor: AppConfig.menuColor,
  },
  menuText: {
    fontFamily: AppConfig.baseFont,
    fontWeight: '500',
    fontSize: AppConfig.baseFontSize * 1.1,
    lineHeight: parseInt((AppConfig.baseFontSize * 1.1) + (AppConfig.baseFontSize * 0.5)),
    color: AppConfig.whiteColor,
    fontSize: AppConfig.baseFontSize,
  },
  menuSubText: {
    fontFamily: AppConfig.baseFont,
    fontWeight: '500',
    fontSize: AppConfig.baseFontSize * 1,
    lineHeight: parseInt((AppConfig.baseFontSize * 1) + (AppConfig.baseFontSize * 0.5)),
    color: AppConfig.secondaryTextColor,
    fontSize: AppConfig.baseFontSize,
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
  },
  searchBarBox: {
    backgroundColor: AppConfig.greyBack,
  },
  searchIcon: {
    paddingRight: 5,
    flex:0.2,
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
  wineRow:{
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: AppConfig.menuColor,
  },
  rowStyle : {
        backgroundColor   : '#000000',
        paddingVertical   : 1,
        paddingHorizontal : 1,
        width: AppConfig.windowWidth,
        borderBottomColor : '#000000',
        borderBottomWidth : 1,

    },
  photo: {
    height: 80,
    width: 80,
    borderRadius: 20,
    borderWidth:1,
    borderColor: '#ffffff',
  },
  largePhoto: {
    height: 150,
    width: 150,
    borderRadius: 20,
    borderWidth:1,
    borderColor: '#ffffff',
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
