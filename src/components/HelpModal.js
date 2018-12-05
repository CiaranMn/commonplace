import React from 'react'
import { 
  Modal, 
  Text, 
  TouchableOpacity, 
  View, 
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

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
      marginLeft: width * 0.25,
      width: width * 0.5,
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
            You searched for entries containing: '{query.content}'
          </Text>
          <Text style={{ marginBottom: 5}}>
            Dated from: {query.dateFrom ? query.dateFrom : 'any'}
          </Text>
          <Text style={{ marginBottom: 5}}>
            Dated to: {query.dateFrom ? query.dateFrom : 'any'}
          </Text>
          <Text style={{marginBottom: 5}}>
            Category: {query.category ? query.category.name : 'any'}
          </Text>
          <Text style={{marginBottom: 5}}>
            Author: {query.author ? query.author.name : 'any'}
          </Text>
          <Text style={{marginBottom: 5}}>
            Source: {query.source ? query.source.name : 'any'}
          </Text>
          <Text style={{marginBottom: 5}}>
            Tag: {query.tag ? query.tag.name : 'any'}
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