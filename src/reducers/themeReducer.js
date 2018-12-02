import {themes} from '../config/globalStyles'

export default themeReducer = (state = themes.green, action) => {

  switch (action.type) {
    case 'CHANGE_THEME':
      return action.theme
    default:
      return state
  }

}

