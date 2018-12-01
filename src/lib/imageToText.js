import ImagePicker from 'react-native-image-picker'
import showToast from './showToast'

export default imageToText = () => {

  const imagePickerOptions = {
      title: 'Capture text from an image',
      cameraType: 'back',
      mediaType: 'photo',
      takePhotoButtonTitle: 'Take a photo of text',
      chooseFromLibraryButtonTitle: 'Pick an image of text',
      quality: 1,
  }

  return ImagePicker.showImagePicker(
    imagePickerOptions, (response) => {
      if (response.didCancel) {
        return false
      } else if (response.error) {
        showToast('Error in picking an image', 'danger')
        return false
      } else {
        return textDetection(response.data)
      }
  })

  function textDetection(imageBase64) {
    const apiKey = ""
    const request = JSON.stringify({
      "requests": [
        { 
          "image": {
            "content": `${imageBase64}`
          },
          "features": [
            { "type": "DOCUMENT_TEXT_DETECTION" }
          ]
        },
        {
          "image": {
            "content": `${imageBase64}`
          },
          "features": [
            { "type": "TEXT_DETECTION" }
          ]
        }
      ]
    })
    alert('before fetch')
    return fetch('https://vision.googleapis.com/v1/images:annotate?key=' + apiKey, 
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: request
      })
      .then(resp => {alert('got resp'); return resp.json()})
      .then(resp => {
        alert('here 2')
        if (resp.responses.every(response => 
          Object.keys(response).length === 0 
          || 
          !!response.error
        )) {
            showToast('Could not read text from image.', 'danger')
            alert('failure')
          return Promise.reject('Could not read text from image.')
        } else { 
            return resp["responses"].forEach(response => {
              if (response.fullTextAnnotation) {
                alert('success')
                return Promise.resolve(response.fullTextAnnotation.text.slice(0,100))
              }
            })
          }
        })
        .catch(err => {
          alert('failure 2')
          showToast(
            'Could not connect to image recognition server.',
            'danger'
          )
          return Promise.reject('Could not connect to image recognition server')
        })
  }

}
