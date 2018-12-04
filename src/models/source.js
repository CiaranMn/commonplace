import Realm from 'realm'
import { realm } from './realm'

export default class Source extends Realm.Object {

  static schema = {
    name: 'Source',
    primaryKey: 'name',
    properties: {
      name: { type: 'string', indexed: true },
      entries: {
        type: 'linkingObjects',
        objectType: 'Entry',
        property: 'source'
      }
    }
  }

  static getSources() {
    return realm.objects('Source')
      .sorted('name')
      .map(source => source.name)
  }

}