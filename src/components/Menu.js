import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import {
  List,
  ListItem
} from 'react-native-elements'
import {
  Image,
  Text,
  ListView,
  Tile,
  Title,
  Subtitle,
  Overlay,
  Screen,
  Icon,
  Button,
  Row
} from '@shoutem/ui';
const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
const MenuIems = [
  {id: 1, key: 'home' ,title: 'Home', content: 'Welcome to learning React!', icon: 'ios-home'},
  {id: 2, key: 'wines' ,title: 'Wines', content: 'Here you can view the wine list.', icon: 'ios-wine'},
  {id: 3, key: 'beers' ,title: 'Beers', content: 'Here you can view the beer list.', icon: 'ios-beer'},
  {id: 4, key: 'apps' ,title: 'Appetizers', content: 'Here you can view the appetizers.', icon: 'ios-pizza'},
  {id: 5, key: 'entrees' ,title: 'Entrees', content: 'Here you can view the entrees.', icon: 'ios-pizza-outline'},
  {id: 6, key: 'salads' ,title: 'Salads', content: 'Here you can view the salads.', icon: 'ios-nutrition'},
  {id: 7, key: 'desserts' ,title: 'Desserts', content: 'Here you can view the desserts.', icon: 'ios-ice-cream'}
];
import AppConfig from '../configs/config'
import AppStyles from '../configs/styles'

class Menu extends Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <ScrollView scrollsToTop={false} style={AppStyles.sideMenu3}>
        <View style={AppStyles.sideMenu}>
          <List containerStyle={AppStyles.sideMenu2}>
          {
            MenuIems.map((item, i) => (
              <ListItem
                onPress={() => this.props.onItemSelected(item.key, item.title)}
                leftIcon={{type: 'ionicon', name: item.icon, color: '#ffc100'}}
                key={i}
                title={item.title}
                titleStyle={AppStyles.menuText}
                subtitle={item.content}
                subtitleStyle={AppStyles.menuSubText}
               />
            ))
          }
          </List>

        </View>
      </ScrollView>
    );
  }
};

export default Menu
const styles = StyleSheet.create({

  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});
