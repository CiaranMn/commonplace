import React from 'react'
import {
  View, 
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  StatusBar,
 } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import {statusBarColor, statusBarText, outlineColor} from '../config/globalStyles'

const searchIcon = <Icon
  name="md-search"
  color={"#fff"}
  size={30}
/>

export default SearchIconAndStatusColor = ({navigation}) => 

  <View style={{ marginRight: 14 }}>
    <StatusBar
      backgroundColor={statusBarColor}
      barStyle={statusBarText}
    />

    { Platform.OS === 'ios' 
    ?
      <TouchableOpacity onPress={navigation.openDrawer}>
        {searchIcon}
      </TouchableOpacity>
    : 
      <TouchableNativeFeedback onPress={navigation.openDrawer}
        background={TouchableNativeFeedback.Ripple(outlineColor, true)}>
        <View>
         { searchIcon }
        </View>
      </TouchableNativeFeedback>
    }
  </View>
  
