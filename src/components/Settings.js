import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'
import SearchIconAndStatusColor from './SearchIconAndStatusColor';

import { globalStyles } from '../config/globalStyles'

import ImagePicker from 'react-native-image-picker';

class Settings extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
    headerRight: <SearchIconAndStatusColor navigation={navigation} />
  })

  state = {
    image: '',
    text: ''
  }

  pickImage = () => {
    const options = {
      title: 'Capture text from an image',
      cameraType: 'back',
      mediaType: 'photo',
      quality: 1,
    };

    ImagePicker.showImagePicker(options, (response) => {
      alert('Response = ', response)

      if (response.didCancel) {
        alert('User cancelled image picker')
      } else if (response.error) {
        alert('ImagePicker Error: ', response.error)
      } else {
        const source = response.uri
        alert(source)
        this.setState({
          source
        });
      }
    })
  }

  render() {
    return (
      <View style={[globalStyles.body, styles.home]}>
        <Text style={globalStyles.header}>This is the Settings Page</Text>
        <Image source={{uri: `${this.state.source}`}} style={{width:300, height: 300}}/>
        <Text>{this.state.text}</Text>
        <Button onPress={this.pickImage}>Pick image</Button>
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
