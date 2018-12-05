import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Dimensions } from 'react-native'

import HomePage from '../containers/HomePage'
import Settings from '../containers/Settings'
import AddOrEditEntry from '../containers/AddOrEditEntry'

export const headerHeight = Math.min(Dimensions.get('window').height * 0.7, 50)

const defaultNavigationOptions = {
  headerStyle: {
    height: headerHeight
  },
  headerTitleStyle: {
    fontSize: 21
  }
}

export const HomeStack = createStackNavigator(
  {
    HomePage,
    AddOrEditEntry
  },
  {
    initialRouteName: 'HomePage',
    defaultNavigationOptions
  }
)

export const AddStack = createStackNavigator(
  {
    AddOrEditEntry
  }, {
    initialRouteName: 'AddOrEditEntry',
    defaultNavigationOptions
  }
)

export const SettingsStack = createStackNavigator(
  {
    Settings
  }, {
    initialRouteName: 'Settings',
    defaultNavigationOptions
  }
)
