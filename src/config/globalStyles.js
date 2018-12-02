import { StyleSheet } from 'react-native'

export const borderColor = "#cbcbcb"

export const themes = {
  green: {
    primaryColor: '#3C8C90',
    secondaryColor: '#fff',
    bodyBackgroundColor: '#ececec',
    borderColor: "#cbcbcb",
    bodyTextColor: "#2e696b",
    statusBarColor: '#4bafb4',
    statusBarText: "light-content",
    deleteColor: "#ff6666"
  },
  blue: {
    primaryColor: '#2A4C90',
    secondaryColor: '#fff',
    bodyBackgroundColor: '#EDEDED',
    bodyTextColor: "#0C2962",
    statusBarColor: '#5ABAE1',
    statusBarText: "light-content",
    deleteColor: "#CA4D0F"
  }, 
  black: {
    primaryColor: '#35342E',
    secondaryColor: '#FFF',
    bodyBackgroundColor: '#FFFCEB',
    statusBarColor: '#4F4D4D',
    bodyTextColor: "#000",
    statusBarText: "light-content",
    deleteColor: "#B72C16"
  }, 
  red: {
    primaryColor: '#C12E2E',
    secondaryColor: '#fff',
    bodyBackgroundColor: '#FFFCEB',
    statusBarColor: '#4F4D4D',
    bodyTextColor: "#4E1515",
    statusBarText: "light-content",
    deleteColor: "#ff6666"
  }
}

export const globalStyles = StyleSheet.create({
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor,
    backgroundColor: '#fff',
    width: "75%"
  },
  selectInput: {
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 6 / 1,
  },
  textInput: {
    aspectRatio: 6 / 1,
    fontSize: 15,
    color: 'black',
    padding: 6,
  },
  button: {
    borderRadius: 6,
    borderWidth: 2,
    width: "40%"
  },
  disabledInput: {
    backgroundColor: "#E1E1E1",
    color: 'grey'
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  inputText: {
    fontSize: 14
  },
  formItem: {
    width: "100%",
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 5,
    borderColor: 'transparent',
  },
  alignRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
})