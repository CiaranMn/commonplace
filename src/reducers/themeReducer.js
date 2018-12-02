export default themeReducer = (state = greenTheme, action) => {

  switch (action.type) {
    case 'GREEN_THEME':
      return greenTheme
    case 'BLUE_THEME':
      return blueTheme
    case 'BLACK_THEME':
      return blackTheme
    case 'RED_THEME':
      return redTheme
    default:
      return state
  }

}

const greenTheme = {
  primaryColor: '#3C8C90',
  secondaryColor: '#fff',
  bodyBackgroundColor: '#ececec',
  borderColor: "#cbcbcb",
  bodyTextColor: "#2e696b",
  statusBarColor: '#4bafb4',
  statusBarText: "light-content",
  deleteColor: "#ff6666"
}

const blueTheme = {
  primaryColor: '#2A4C90',
  secondaryColor: '#fff',
  bodyBackgroundColor: '#EDEDED',
  bodyTextColor: "#0C2962",
  statusBarColor: '#5ABAE1',
  statusBarText: "light-content",
  deleteColor: "#CA4D0F"
}

const blackTheme = {
  primaryColor: '#35342E',
  secondaryColor: '#FFF',
  bodyBackgroundColor: '#FFFCEB',
  statusBarColor: '#4F4D4D',
  bodyTextColor: "#000",
  statusBarText: "light-content",
  deleteColor: "#B72C16"
}

const redTheme = {
  primaryColor: '#C12E2E',
  secondaryColor: '#fff',
  bodyBackgroundColor: '#FFFCEB',
  statusBarColor: '#4F4D4D',
  bodyTextColor: "#4E1515",
  statusBarText: "light-content",
  deleteColor: "#ff6666"
}