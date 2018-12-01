import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Dimensions } from 'react-native'

import HomePage from '../components/HomePage'
import Settings from '../components/Settings'
import AddOrEditEntry from '../components/AddOrEditEntry'
import SearchResults from '../components/SearchResults'

import { primaryColor, secondaryColor } from '../config/globalStyles'

export const headerHeight = Math.min(Dimensions.get('window').height * 0.7, 50)

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: primaryColor,
    height: headerHeight
  },
  headerTintColor: secondaryColor,
  headerTitleStyle: {
    fontSize: 21
  }
}

export const HomeStack = createStackNavigator(
  {
    HomePage,
    SearchResults,
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
