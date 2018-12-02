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

import {outlineColor} from '../config/globalStyles'

const searchIcon = <Icon
  name="md-search"
  color={"#fff"}
  size={30}
/>

const SearchIconAndStatusColor = ({navigation, statusBarColor}) => {

  return (
    <View style={{ marginRight: 14 }}>
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
          background={TouchableNativeFeedback.Ripple(outlineColor, true)}>
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

