import React from 'react'
import {
  View,
  StyleSheet,
  Platform
} from 'react-native'
import {
  Label,
  Icon,
  Item,
  Picker,
} from 'native-base'

import {globalStyles, bodyTextColor} from '../config/globalStyles'

export default FieldPicker = ({type, options, selection, handleChange, enabled, label}) => {

  return (

      <Item picker style={[globalStyles.formItem, globalStyles.alignRight]}>
        {
          label &&
          <Label style={globalStyles.label}>{type}</Label>
        }
        <View style={[
          globalStyles.input,
          globalStyles.selectInput,
          globalStyles.alignRight,
          !enabled ? globalStyles.disabledInput : null,
          label || {width: "100%"}
        ]}>
          <Picker
            enabled={enabled}
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            iosHeader={type}
            mode={"dropdown"}
            placeholder={`Select ${type}`}
            placeholderStyle={globalStyles.label}
            placeholderIconColor="#007aff"
            selectedValue={selection}
            onValueChange={handleChange}
            style={{ 
              width: "80%",
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
            textStyle={{fontSize: 15}}
          >
          {
            Platform.OS === "android"
            ? 
            [`Select ${type}`, ...options].map((option) => (
              <Picker.Item
                key={option}
                label={option}
                value={option === `Select ${type}` ? null : option}
              />
            ))
            :
            options.map(option =>
            <Picker.Item
              key={option}
              label={option}
              value={option}
            />
            )
            }
          </Picker>
        </View>
      </Item>

  )
}