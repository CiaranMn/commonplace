import {themes} from '../config/globalStyles'

export default themeReducer = (state = themes.green, action) => {

  switch (action.type) {
    case 'UPDATE_THEME':
      return action.theme
    default:
      return state
  }

}

