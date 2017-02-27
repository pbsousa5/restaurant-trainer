import { SideMenu, List, ListItem } from 'react-native-elements'
import { Component } from 'react'

export default class SideMenuItems extends Component{
  constructor () {
    super()
    this.state = { toggled: false }
  }
  toggleSideMenu () {
    this.setState({
      toggled: !this.state.toggled
    })
  }
  render () {
    const MenuComponent = (
      <View style={{flex: 1, backgroundColor: '#ededed'}}>
        <List containerStyle={{marginBottom: 20}}>
        {
          list.map((item, i) => (
            <ListItem
              roundAvatar
              onPress={() => console.log('something')}
              avatar={{uri:item.avatar_url}}
              key={i}
              title={item.name}
              subtitle={item.subtitle} />
          ))
        }
        </List>
      </View>
    )
    return (
      <SideMenu
        MenuComponent={MenuComponent}
        toggled={this.state.toggled}>
        <App />
      </SideMenu>
    )
  }
}
