import React from 'react'
import { Dimensions } from 'react-native'

import {createDrawerNavigator} from 'react-navigation'

import TabNavigator from "./TabNavigator"
import SearchDrawer from '../components/SearchDrawer'

export default DrawerNavigator = createDrawerNavigator(
  {
    Home: TabNavigator,
  }, 
  {
    contentComponent: ({ navigation }) =>
      <SearchDrawer navigation={navigation} />,
    drawerPosition: 'right',
    drawerWidth: Dimensions.get('window').width * 0.8,
    drawerBackgroundColor: 'transparent'
  })