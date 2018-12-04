import Realm from 'realm'

import Entry from './entry'
import Author from './author'
import Category from './category'
import Source from './source'
import Tag from './tag'

export { 
  Entry,
  Author,
  Category,
  Source,
  Tag
}

export const realm = new Realm({ 
  schema: [Entry, Author, Category, Tag, Source],
  deleteRealmIfMigrationNeeded: true
})
