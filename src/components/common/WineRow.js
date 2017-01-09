import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
//<Image source={{ uri: props.Labels[0].Url}} style={styles.photo} />
import {  Subtitle, Caption } from '@shoutem/ui'
import AppStyles from '../../configs/styles'
import AppConfig from '../../configs/config'
import { Card } from 'react-native-elements'
const WineRow = (props) => (
  <View style={[AppStyles.rowHeight, AppStyles.leftAligned, AppStyles.backColor, AppStyles.fullWindowWidth]}>
    <View style={AppStyles.wineRow}>
      <View style={AppStyles.leftAligned}>
        <Image
          style={AppStyles.photo}
          source={{uri: 'http://shoutem.github.io/img/ui-toolkit/examples/image-10.png'}}
        />
      </View>
      <View style={[AppStyles.paddingLeft, AppStyles.container, AppStyles.wrapText, AppStyles.paddingRight]}>
        <Text style={[AppStyles.h4]}>Choosing The Right Boutique Hotel For You</Text>
        <Text style={AppStyles.h5}>{`${props.time}`}</Text>
      </View>
    </View>
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
  }
});
