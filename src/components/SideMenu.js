import { SideMenu, List, ListItem } from 'react-native-elements'

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
  // SideMenu takes a React Native element as a prop for the actual Side Menu
  
  const MenuComponent = (
    <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
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
