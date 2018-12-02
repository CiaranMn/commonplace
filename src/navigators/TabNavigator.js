import React from 'react'
import { Icon } from 'native-base'
import { Dimensions, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'

import { HomeStack, AddStack, SettingsStack } from './StackNavigators'
import TabBarComponent from '../components/TabBarComponent'

import { primaryColor, secondaryColor, outlineColor } from '../config/globalStyles'

export const footerHeight = Math.min(Dimensions.get('window').height * 0.7, 50)

export const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
  },
  Add: {
    screen: AddStack,
  },
  Settings: {
    screen: SettingsStack,
  }
}, {
    order: ['Home', 'Add', 'Settings'],
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarButtonComponent: TouchableOpacity,
      tabBarIcon: ({ tintColor }) => {
        let routeName = navigation.state.routeName.toLowerCase()
        routeName === 'add' ? routeName += '-circle' : null
        return <Icon
          ios={"ios-" + routeName}
          android={"md-" + routeName}
          style={{
            color: tintColor,
            fontSize: 30
          }}
        />
      }
    }),
    tabBarComponent: props =>
      <TabBarComponent {...props} 
        showLabel={false}
        style={{
          height: footerHeight,
          borderColor: outlineColor,
          borderWidth: 0,
          borderTopWidth: 1
        }}/>,
    animationEnabled: true,
    swipeEnabled: true,
  })


