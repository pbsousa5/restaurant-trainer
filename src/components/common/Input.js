import React from 'react';
import { TextInput, View, Text } from 'react-native';



const Input = ({input, lineNum, label, defValue, onChangeText, placeholder, secureTextEntry,
  viewStyle, refName, myStyle, myLabelStyle  }) => {
  const { inputStyle, labelStyle, containerStyle, largeBox } = styles;
  //console.log("containerStyle: " + containerStyle);

  return (
      <View style={viewStyle}>
      { label ? <Text style={myLabelStyle}>{label.toUpperCase()}</Text> : null }
      <TextInput
        secureTextEntry={secureTextEntry}
        multiline = {true}
        numberOfLines = {lineNum}
        placeholder={placeholder}
        autoCorrect={false}
        placeholderTextColor="grey"
        style={myStyle}
        defaultValue={defValue}
        onChangeText={(value) => input.onChange(value)}
      />
    </View>
    //  value={value}
    // onChangeText={onChangeText}
  );
};

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
  containerStyle: {
    height: 40,
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

export { Input };
