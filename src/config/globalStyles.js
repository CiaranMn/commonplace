import { StyleSheet } from 'react-native'

const greenTheme = {
  primaryColor: '#3C8C90',
  secondaryColor: '#fff',
  bodyBackgroundColor: '#ececec',
  outlineColor: "#cbcbcb",
  bodyTextColor: "#2e696b",
  statusBarColor: '#7DD5D8',
  statusBarText: "light-content",
  deleteColor: "#ff6666"
}

const blueTheme = {
  primaryColor: '#2A4C90',
  secondaryColor: '#fff',
  bodyBackgroundColor: '#EDEDED',
  outlineColor: "#cbcbcb",
  bodyTextColor: "#0C2962",
  statusBarColor: '#5ABAE1',
  statusBarText: "light-content",
  deleteColor: "#CA4D0F"
}

const blackTheme = {
  primaryColor: '#35342E',
  secondaryColor: '#FFF',
  bodyBackgroundColor: '#FFFCEB',
  outlineColor: "#cbcbcb",
  statusBarColor: '#4F4D4D',
  bodyTextColor: "#000",
  statusBarText: "light-content",
  deleteColor: "#B72C16"
}

const redTheme = {
  primaryColor: '#C12E2E',
  secondaryColor: '#fff',
  bodyBackgroundColor: '#FFFCEB',
  outlineColor: "#cbcbcb",
  statusBarColor: '#4F4D4D',
  bodyTextColor: "#4E1515",
  statusBarText: "light-content",
  deleteColor: "#ff6666"
}

export const { 
  primaryColor, 
  secondaryColor, 
  bodyBackgroundColor,
  cardBackgroundColor, 
  outlineColor, 
  statusBarColor, 
  bodyTextColor, 
  statusBarText, 
  deleteColor 
} = greenTheme

export const globalStyles = StyleSheet.create({
  primaryThemeColors: {
    color: primaryColor,
    backgroundColor: secondaryColor
  }, 
  inverseThemeColors: {
    color: secondaryColor,
    backgroundColor: primaryColor
  },
  body: {
    backgroundColor: bodyBackgroundColor
  }, 
  header: {
    fontSize: 17,
    fontWeight: "bold",
    color: bodyTextColor,
    marginBottom: 6,
    marginTop: 6
  }, 
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: outlineColor,
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
    color: bodyTextColor,
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