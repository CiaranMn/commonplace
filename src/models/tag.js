import Realm from 'realm'
import { realm } from './realm'

export default class Tag extends Realm.Object {

  static schema = {
    name: 'Tag',
    primaryKey: 'name',
    properties: {
      name: { type: 'string', indexed: true },
      entries: {
        type: 'linkingObjects',
        objectType: 'Entry',
        property: 'tags'
      }
    }
  }

  static getTags() {
    return realm.objects('Tag')
      .sorted('name')
      .map(tag => tag.name)
  }
}