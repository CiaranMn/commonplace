import React from 'react'
import { 
  Modal, 
  Text, 
  TouchableOpacity, 
  View, 
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import {globalStyles} from '../config/globalStyles'
const {width, height} = Dimensions.get('screen')


export default HelpModal = ({ 
  visible, 
  closeModal,
  bodyTextColor, 
  query, 
  helpText
}) => 

  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={closeModal}
  >
    <View style={{ 
      marginTop: height * 0.4,
      marginLeft: width * 0.2,
      width: width * 0.6,
      backgroundColor: "white",
      borderColor: bodyTextColor,
      borderWidth: 1,
      borderRadius: 8,
      padding: 15,
    }}>

      {query 
      ?
        <>
          <Text style={{marginBottom: 5}}>
            <Text style={globalStyles.label}>
              Results containing:
            </Text> {
              query.content && query.content.length > 0 
              ? ' ' + query.content 
              : ' anything'
              }
          </Text>
          <Text style={{ marginBottom: 5 }}>
            <Text style={globalStyles.label}>
              Dated from:
            </Text>
            {query.dateFrom ? ' ' + query.dateFrom : ' any'}
          </Text>
          <Text style={{ marginBottom: 5}}>
            <Text style={globalStyles.label}>
              Dated to: 
            </Text>
            {query.dateFrom ? ' ' + query.dateFrom : ' any'}
          </Text>
          <Text style={{marginBottom: 5}}>
            <Text style={globalStyles.label}>
              Category: 
            </Text>
            {query.category ? ' ' + query.category : ' any'}
          </Text>
          <Text style={{marginBottom: 5}}>
            <Text style={globalStyles.label}>
              Author:
            </Text>
            {query.author ? ' ' + query.author: ' any'}
          </Text>
          <Text style={{marginBottom: 5}}>
            <Text style={globalStyles.label}>
              Source:
            </Text>
            {query.source ? ' ' + query.source : ' any'}
          </Text>
          <Text style={{marginBottom: 5}}>
            <Text style={globalStyles.label}>
             Tag:
            </Text>
            {query.tag ? ' ' + query.tag : ' any'}
          </Text>
        </>
      :
      <Text>
        {helpText}
      </Text>
      }

      <View style={{position: "absolute", top: 2, right: 2}}>
        <TouchableOpacity activeOpacity={0.8} onPress={closeModal}>
          <Icon 
            color={bodyTextColor}
            size={21}
            name="md-close-circle"
          />
        </TouchableOpacity>
      </View>

    </View>
  </Modal>