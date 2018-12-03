import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,

} from 'react-native'

import {borderColor} from '../config/globalStyles'

export default ThemeButton = ({ onPress, theme, name }) => (

  <TouchableOpacity
    onPress={onPress}
    style={styles.container}
    activeOpacity={0.6}
  >
    <View style={[
      styles.half, 
      {backgroundColor: theme.primaryColor}
      ]}>
        <Text style={{color: theme.secondaryColor}}>
         {name}
        </Text>
    </View>
    <View style={[
      styles.half, 
      {backgroundColor: theme.bodyBackgroundColor}
    ]}>
      <Text style={{color: theme.bodyTextColor}}>
        theme
      </Text> 
    </View>

  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: "28%",
    aspectRatio: 1.6 / 1,
    marginHorizontal: 6,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: borderColor,
  },
  half: {
    height: "50%",
    width: "100%",
    padding: 5,
    justifyContent: 'center'
  },
})