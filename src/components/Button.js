import React from 'react'
import {
  TouchableOpacity,
  View,
  Text
} from 'react-native'

export default Button = ({onPress, buttonColor, buttonText}) => 

  <TouchableOpacity
    onPress={onPress}
    style={{ width: "45%", aspectRatio: 3 / 1 }}
    activeOpacity={0.6}
  >
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      borderWidth: 2,
      borderColor: buttonColor,
      backgroundColor: buttonColor
    }}>

      <Text style={{ color: "white", fontWeight: 'bold' }}>
        {buttonText}
      </Text>
      
    </View>
  </TouchableOpacity>
