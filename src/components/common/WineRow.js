import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
//<Image source={{ uri: props.Labels[0].Url}} style={styles.photo} />
import {  Subtitle, Caption } from '@shoutem/ui'
import AppStyles from '../../configs/styles'
import AppConfig from '../../configs/config'
import { Card } from 'react-native-elements'
import Gradient from './GradientImage'
import LinearGradient from 'react-native-linear-gradient'

const WineRow = (props) => (
  <View style={[AppStyles.rowHeight, AppStyles.leftAligned, AppStyles.backColor, AppStyles.fullWindowWidth]}>
    <LinearGradient colors={AppConfig.greyGradient} style={styles.paddingBottom}>
    <View style={AppStyles.wineRow}>
      <View style={AppStyles.leftAligned}>
        <Image
          style={AppStyles.photo}
          source={{uri: `${props.imageURL}`}}
        />
      </View>
      <View style={[AppStyles.paddingLeft, AppStyles.container, AppStyles.wrapText, AppStyles.paddingRight]}>
        <Text numberOfLines={2} style={[AppStyles.h4]}>{props.name}</Text>
        <Text style={AppStyles.h5}>{`${props.varietal}`}</Text>
      </View>
    </View>
    </LinearGradient>
</View>

)

export default WineRow

const styles = StyleSheet.create({
  photo: {
    height: 80,
    width: 80,
    borderRadius: 20,
    borderWidth:1,
    borderColor: '#ffffff',
  },
  paddingTop: {
    paddingTop: 5,
  },
  paddingBottom: {
    paddingBottom: 10,
  }
});
