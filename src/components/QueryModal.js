import React from 'react'
import { 
  Modal, 
  Text, 
  TouchableOpacity, 
  View, 
  Dimensions
} from 'react-native';

import {footerHeight} from '../navigators/TabNavigator'

const {width, height} = Dimensions.get('screen')

export default QueryModal = ({ visible, closeModal, bodyTextColor}) => 
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
      borderRadius: 8
       }}>

      <View style={{position: "absolute", bottom: 4, right: 8}}>
        <TouchableOpacity activeOpacity={0.8} onPress={closeModal}>
          <Text style={{color: bodyTextColor, fontSize: 20}}>
            x
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>