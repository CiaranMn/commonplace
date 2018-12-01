import {Toast} from 'native-base'

export default showToast = (text, type) => {
  Toast.show({
    text,
    buttonText: "Okay",
    type,
    duration: 2000,
    position: "top",
  })
}

