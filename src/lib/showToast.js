import {Toast} from 'native-base'

export default showToast = (text, type, duration=2500) => {
  Toast.show({
    text,
    buttonText: "Okay",
    type,
    duration,
    position: "top",
  })
}

