import { StyleSheet } from 'react-native'

export const borderColor = "#cbcbcb"

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