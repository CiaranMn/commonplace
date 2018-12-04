import Realm from 'realm'
import { realm } from './realm'

export default class Author extends Realm.Object {

  static schema = {
    name: 'Author',
    primaryKey: 'name',
    properties: {
      name: { type: 'string', indexed: true },
      entries: {
        type: 'linkingObjects',
        objectType: 'Entry',
        property: 'author'
      }
    }
  }

  static getAuthors() {
    return Array.prototype.slice.call(realm.objects('Author'))
      .sort((a, b) =>
        a.lastname().localeCompare(b.lastname())
      )
      .map(author => author.name)
  }

  lastname() {
    return this.name ? this.name.split(" ").slice(-1)[0] : 'ZZZ'
  }

}