import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'
import SearchIconAndStatusColor from './SearchIconAndStatusColor';

import { globalStyles, primaryColor } from '../config/globalStyles'
import ImagePicker from 'react-native-image-picker';

class Settings extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
    headerRight: <SearchIconAndStatusColor navigation={navigation} />
  })

  state = {
    image: '',
    text: 'Test text'
  }

  pickImage = () => {
    const options = {
      title: 'Capture text from an image',
      cameraType: 'back',
      mediaType: 'photo',
      takePhotoButtonTitle: 'Take a photo of text',
      chooseFromLibraryButtonTitle: 'Pick an image of text',
      quality: 1,
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        this.imageToText(response.data)
        this.setState({
          source: response.uri
        });
      }
    })
  }

  imageToText = imageBase64 => {
    const apiKey = process.env.CLOUD_API
    const request = JSON.stringify({
      "requests": [
        { 
          "image": {
            "content": imageBase64
          },
          "features": [
            { "type": "DOCUMENT_TEXT_DETECTION" }
          ]
        },
        {
          "image": {
            "content": imageBase64
          },
          "features": [
            { "type": "TEXT_DETECTION" }
          ]
        }
      ]
    })
    fetch('https://vision.googleapis.com/v1/images:annotate?key=' + apiKey, 
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: request
      }).then(resp => resp.json())
        .then(resp => {
          resp.responses.forEach(response => {
            if (response.fullTextAnnotation)
            return this.setState({
              text: response.fullTextAnnotation.text
            })
          })
          this.setState({text: 'Could not decipher'})
        })
  }

  render() {
    return (
      <View style={[globalStyles.body, styles.home]}>
        <Text style={globalStyles.header}>This is the Settings Page</Text>
        <Image source={{uri: `${this.state.source}`}} style={{width:300, height: 300}}/>
        <Text>{this.state.text}</Text>
        <Button buttonText={"Test OCR"}
          onPress={this.pickImage}
          buttonColor={primaryColor}
          >
            Pick image
          </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Settings
