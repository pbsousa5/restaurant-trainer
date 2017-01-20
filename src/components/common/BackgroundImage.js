import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import AppStyles from '../../configs/styles'
export default class BackgroundImage extends Component{
  render(){
    return(
      <Image style={AppStyles.imageContainer} source={require('../../images/lights-bokeh-small.jpg')} />
    )
  }
}
