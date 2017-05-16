import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
//<Image source={{ uri: props.Labels[0].Url}} style={styles.photo} />

import AppStyles from '../../configs/styles'
import AppConfig from '../../configs/config'
import { Card } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'

const SaladRow = (props) => (
  <View style={[AppStyles.rowHeight, AppStyles.leftAligned, AppStyles.backColor, AppStyles.fullWindowWidth]}>
    <LinearGradient colors={AppConfig.blueGradient} style={{paddingBottom: 10}}>
    <View style={[AppStyles.wineRow,AppStyles.fullWindowWidth]}>
      <View style={AppStyles.leftAligned}>
        <Image
          style={AppStyles.photo}
          source={{uri: `${props.image}`}}
        />
      </View>
      <View style={[AppStyles.paddingLeft, AppStyles.container, AppStyles.wrapText, AppStyles.paddingRight]}>
        <Text numberOfLines={2} style={[AppStyles.h4]}>{props.name}</Text>
        <Text numberOfLines={1} style={AppStyles.h5}>{`${props.saladnotes}`}</Text>
      </View>
    </View>
    </LinearGradient>
</View>

)

export default SaladRow
