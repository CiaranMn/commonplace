import { AsyncStorage } from 'react-native'
import { store } from '../../App'
import showToast from './showToast'

export default getSettings = async () => {

  AsyncStorage.getItem('theme')
    .then(theme => {
      theme = (JSON.parse(theme))
      if (theme !== null) {
        store.dispatch({
          type: 'UPDATE_THEME',
          theme
        })
      }
    })
    .catch(err => showToast('Error accessing theme: ' + err))

  AsyncStorage.getItem('settings')
    .then(settings => {
      settings = (JSON.parse(settings))
      if (settings !== null) {
        store.dispatch({
          type: 'UPDATE_SETTINGS',
          settings
        })
      }
    })
    .catch(err => showToast('Error accessing settings: ' + err))

}

