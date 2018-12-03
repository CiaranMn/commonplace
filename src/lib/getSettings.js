import { AsyncStorage } from 'react-native'
import {store} from '../../App'

export default getSettings = async () => {

  let theme = await AsyncStorage.getItem('theme')
  theme = (JSON.parse(theme))
  if (theme !== undefined) {
     store.dispatch({
        type: 'UPDATE_THEME',
        theme
    })
  }
  console.log('here')
  return 'done'
}

