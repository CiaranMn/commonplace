import RNFS from 'react-native-fs'
import { Platform } from 'react-native'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'

import { realm } from './realm'

export const importFile = () => {

  DocumentPicker.show({
    filetype: [DocumentPickerUtil.allFiles()],
    }, (error, res) => {
        RNFS.readFile(res.uri)
          .then(res => alert(res))
          .catch((err) => {
            alert(err.message);
          })
    })

}

export const exportFile = async () => {

  const basePath = Platform.OS === 'android'
    ? RNFS.ExternalStorageDirectoryPath
    : RNFS.DocumentDirectoryPath

  await RNFS.mkdir(basePath + '/commonplace')
  path = basePath + '/commonplace/commonplace.csv'

  RNFS.writeFile(path, 'Testing out again', 'utf8')
    .then((success) => {
      alert('FILE WRITTEN!')
    })
    .catch((err) => {
      alert(err.message);
    })

}

function writeCsv() {

  let entries = 
}