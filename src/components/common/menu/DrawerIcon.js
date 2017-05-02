import React from 'react'
import { View } from 'react-native'
import AppStyles from '../../../configs/styles'
import { Icon } from 'react-native-elements'
import AppConfig from '../../../configs/config'
const DrawerIcon = (props) => {
  return (
    <View style={props.style} contentContainerStyle={{justifyContent: 'center',alignItems: 'center'}}>
      <Icon
        name={ props.icon }
        type='ionicon'
        color={AppConfig.blueColor}/>
    </View>
  )
}

export { DrawerIcon }
