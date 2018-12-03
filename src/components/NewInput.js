import React from 'react'

import {
  View,
  Switch,
  Text,
  TextInput
} from 'react-native'

import {globalStyles} from '../config/globalStyles'

export default NewInput = ({bodyTextColor, primaryColor, switchOn, onSwitchValueChange, textValue, onTextValueChange}) => 

  <View style={[globalStyles.alignRight, {width: "100%"}]}>
    <View style={{alignItems: 'center'}}>
      <Text 
        style={{color: bodyTextColor, fontSize: 12}}>
        New?
      </Text>
      <Switch
        value={switchOn}
        onValueChange={onSwitchValueChange} 
        style={{transform: [{ scaleX: .8 }, { scaleY: .8 }]} }
        trackColor={{ true: primaryColor }}
      />
    </View>
    <TextInput
      style={[
        globalStyles.input,
        globalStyles.textInput,
        !switchOn ? globalStyles.disabledInput : null
      ]}
      value={textValue}
      onChangeText={onTextValueChange}
      editable={switchOn}
    />
  </View>

