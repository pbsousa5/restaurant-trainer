import React from 'react'
import { View } from 'react-native'
import AppStyles from '../../../configs/styles'
import { Text } from 'react-native-elements'

const DrawerTitle = (props) => {
  return (
    <View style={props.style} contentContainerStyle={{justifyContent: 'center',alignItems: 'center'}}>
      <Text h3>{props.name}</Text>
    </View>
  )
}

export { DrawerTitle }
