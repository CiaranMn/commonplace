import Realm from 'realm'
import { realm } from './realm'

export default class Category extends Realm.Object {

  static schema = {
    name: 'Category',
    primaryKey: 'name',
    properties: {
      name: { type: 'string', indexed: true },
      entries: {
        type: 'linkingObjects',
        objectType: 'Entry',
        property: 'category'
      }
    }
  }

  static getCategories() {
    return realm.objects('Category')
      .sorted('name')
      .map(category => category.name)
  }

}