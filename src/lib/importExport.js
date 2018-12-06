import RNFS from 'react-native-fs'
import { Platform } from 'react-native'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import Papa from 'papaparse'

import { Entry, realm } from '../models/realm'
import showToast from './showToast'

// Android only for now
export const importFile = async () => {

  DocumentPicker.show({
    filetype: [DocumentPickerUtil.allFiles()],
    }, (error, res) => {
      if (error) {
        return showToast('Error choosing file', 'danger')
      } else {
        RNFS.readFile(res.uri).then(csvString =>
          Papa.parse(csvString, {
              header: true,
              complete: function (results, file) {
                showToast('Importing to database...', 'default')
                results.data.forEach(entry =>
                  Entry.createOrUpdate(entry, false, true)
                )
                Entry.updateLists()
                showToast('Import complete!', 'success')
              },
              error: function (error, file) {
                showToast('Error parsing file: ' + error)
              }
          })
        )
      }
    })
}

export const exportFile = async () => {

  const basePath = Platform.OS === 'android'
    ? RNFS.ExternalStorageDirectoryPath
    : RNFS.DocumentDirectoryPath

  let path
  try {
    await RNFS.mkdir(basePath + '/commonplace')
    path = basePath + '/commonplace/commonplace.csv'
  } catch {
    path = basePath + '/commonplace.csv'
  }

  let contents = Papa.unparse(writeCsv())

  RNFS.writeFile(path, contents, 'utf8')
    .then(success => {
      showToast('File successfully written', 'success')
    })
    .catch(err => {
      alert('Error writing file - ' + err);
    })

}

function writeCsv() {

  let data = []

  let entries = Array.prototype.slice.call(realm.objects('Entry'))
  entries.forEach(entry => {
    let entryTags = entry.tags.map(tag => tag.name)
    let entryData = [
      entry.id || null,
      entry.content ? entry.content.replace(/;/g, '-') : null,
      entry.author ? entry.author.name : null,
      entry.category ? entry.category.name : null,
      entryTags || null,
      entry.source ? entry.source.name : null,
      entry.reference ? entry.reference.replace(/;/g, '-') : null,
      entry.date || null,
      entry.dateCreated || null,
      entry.dateModified || null
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
      "dateCreated",
      "dateModified"
    ],
    data
  }
  return csvObject

}