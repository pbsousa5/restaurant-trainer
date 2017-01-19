import React from 'react'
import { View,  Text} from 'react-native'
import { Switch } from 'react-native-base-switch'

const CustomSwitch = ({ label, value, onChangeText, refName, myLabelStyle, onSwitchChange }) => {
  const { inputStyle, labelStyle, containerStyle, largeBox, switchStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={myLabelStyle}>{label.toUpperCase()}</Text>
      <View style={switchStyle}>
        <Switch
          active={value}
          inactiveButtonColor="red"
          buttonRadius={10}
          activeButtonColor="green"
          onChangeState={(state) => onSwitchChange(state)}
          />
      </View>

    </View>
  )
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 46,
    flex: 2,
    flexDirection: 'column',
    height: 80
  },
  labelStyle: {
    fontSize: 15,
    paddingLeft: 0,
    flex: 0.7
  },
  switchStyle:{
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',

  },
  containerStyle: {
    height:50,
    flex: 1,
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  largeBox: {
    height: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { CustomSwitch };
