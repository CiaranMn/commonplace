import RNFS from 'react-native-fs'
import { Platform } from 'react-native'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import Papa from 'papaparse'

import { realm } from '../models/realm'

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

  let contents = Papa.unparse(writeCsv())

  RNFS.writeFile(path, contents, 'utf8')
    .then((success) => {
      alert('FILE WRITTEN!')
    })
    .catch((err) => {
      alert(err.message);
    })

}

function writeCsv() {

  let data = []

  let entries = Array.prototype.slice.call(realm.objects('Entry'))
  entries.forEach(entry => {
    let entryTags = entry.tags.map(tag => tag.name)
    let entryData = [
      entry.id || null,
      entry.content || null,
      entry.author ? entry.author.name : null,
      entry.category ? entry.category.name : null,
      entryTags || null,
      entry.source ? entry.source.name : null,
      entry.date || null,
      entry.dateCreated || null
    ]
    data.push(entryData)
  })

  let csvObject = {
    fields: [
      "id",
      "content",
      "author",
      "category",
      "tags",
      "source",
      "reference",
      "date",
      "dateCreated"
    ],
    data
  }
  return csvObject

}