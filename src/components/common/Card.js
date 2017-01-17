import React from 'react'
import { View, ScrollView } from 'react-native'
import AppStyles from '../../configs/styles'

const Card = (props) => {
  return (
    <View style={props.style} contentContainerStyle={{justifyContent: 'center',alignItems: 'center'}}>
      {props.children}
    </View>
  )
}

export { Card }
