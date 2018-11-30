import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Capture text from an image',
  cameraType: 'back',
  mediaType: 'photo',
  quality: 1,
};

export default ImagePicker.showImagePicker(options, (response) => {
  alert('Response = ', response);

  if (response.didCancel) {
    alert('User cancelled image picker');
  } else if (response.error) {
    alert('ImagePicker Error: ', response.error);
  } else {
    const source = { uri: response.uri };

    this.setState({
      source
    });
  }
})