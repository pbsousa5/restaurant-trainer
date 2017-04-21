import React from 'react'
import { View } from 'react-native'
import AppStyles from '../../../configs/styles'
import { Icon } from 'react-native-elements'
import AppConfig from '../../../configs/config'
const AddIcon = (props) => {
  return (
    <View style={props.style} contentContainerStyle={{justifyContent: 'center',alignItems: 'center'}}>
      <Icon
        name='md-add'
        type='ionicon'
        color={AppConfig.yellowColor}/>
    </View>
  )
}

export { AddIcon }
