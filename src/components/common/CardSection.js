import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
//styles.containerStyle,
  return (
    <View style={[ props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 0,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };
