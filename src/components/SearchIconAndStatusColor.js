import React from 'react'
import {connect} from 'react-redux'
import {
  View, 
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  StatusBar,
 } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import {borderColor} from '../config/globalStyles'

const SearchIconAndStatusColor = ({navigation, statusBarColor, theme}) => {

  const searchIcon = <Icon
    name="md-search"
    color={theme.secondaryColor}
    size={30}
  />

  return (
    <View style={{ marginRight: 20 }}>
      <StatusBar
        backgroundColor={statusBarColor}
        barStyle={'light-content'}
      />

      {Platform.OS === 'ios'
        ?
        <TouchableOpacity onPress={navigation.openDrawer}>
          {searchIcon}
        </TouchableOpacity>
        :
        <TouchableNativeFeedback onPress={navigation.openDrawer}
          background={TouchableNativeFeedback.Ripple(borderColor, true)}>
          <View>
            {searchIcon}
          </View>
        </TouchableNativeFeedback>
      }
    </View>
  )
}

mapStateToProps = ({ theme }) => ({ theme })

export default connect(mapStateToProps)(SearchIconAndStatusColor)

