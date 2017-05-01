import React, {
  Component
} from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

class Test extends Component{
  constructor(props){
    super(props)
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'VIEW WINE',
    headerTitleStyle: {
       alignSelf: 'center',
       marginRight: 56,
    },
  });

  render(){
    return(
      <View><Text>Test Render no forms</Text></View>
    )
  }
}

export default Test
