import React from 'react'
import { 
  Modal, 
  Text, 
  TouchableOpacity, 
  View, 
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import {footerHeight} from '../navigators/TabNavigator'

const {width, height} = Dimensions.get('screen')

export default QueryModal = ({ visible, closeModal, bodyTextColor, query}) => 
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={closeModal}
  >
    <View style={{ 
      marginTop: height * 0.6 - footerHeight,
      marginLeft: width * 0.35,
      height: height * 0.3,
      width: width * 0.6,
      backgroundColor: "white",
      borderColor: bodyTextColor,
      borderWidth: 1,
      borderRadius: 8,
       }}>

      <Text>
        You searched for '{query.content}'
      </Text>
      <View style={{position: "absolute", top: 2, right: 2}}>
        <TouchableOpacity activeOpacity={0.8} onPress={closeModal}>
          <Icon 
            color={bodyTextColor}
            size={21}
            name="md-close-circle"
              x
          />
        </TouchableOpacity>
      </View>
    </View>
  </Modal>