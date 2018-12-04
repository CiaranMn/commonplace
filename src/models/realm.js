import Realm from 'realm'
import cuid from 'cuid'
import {store} from '../../App'
import showToast from '../lib/showToast'

// TODO - split out classes into their own files
// import Entry from './Entry'
// import Author from './Author'
// import Category from './Category'
// import Source from './Source'
// import Tag from './Tag'

export class Entry extends Realm.Object {

  static schema = {
    name: 'Entry',
    primaryKey: 'id',
    properties: {
      id: 'string',
      content: { type: 'string', indexed: true },
      author: { type: 'Author', optional: true },
      category: { type: 'Category', optional: true },
      tags: { type: 'Tag[]' },
      source: { type: 'Source', optional: true },
      reference: 'string?',
      date: 'date?',
      dateCreated: 'date?'
    }
  }

  static getEntries(sort='Oldest first') {
    let results
    switch (sort) {
      case 'Oldest first':
        results = realm.objects('Entry').sorted('date')
        break
      case 'Newest first':
        results = realm.objects('Entry').sorted('date', true)
        break
      case 'By Category':
        results = realm.objects('Entry').sorted('category.name')
        break
      case 'By Author':
        results = Array.prototype.slice.call(realm.objects('Entry'))
        let sortedResults = results.sort((a, b) => 
          a.author.lastname().localeCompare(b.author.lastname())
        )
        return sortedResults
      case 'By Source':
        results = realm.objects('Entry').sorted('source.name')
        break
      default: 
        results = realm.objects('Entry')
        break
    }
    return Array.prototype.slice.call(results)
  }

  static search(query) {
    let queryString = `content CONTAINS[c] "${query.content}"`
    if (query.author) {
      queryString += ` && author.name == "${query.author}"`
    }
    if (query.category) {
      queryString += ` && category.name == "${query.category}"`
    }
    if (query.source) {
      queryString += ` && source.name == "${query.source}"`
    }
    if (query.tag) {
      queryString += ` && ANY tags.name == "${query.tag}"`
    }
    if (query.dateFrom) {
      let date = this.stringToDate(query.dateFrom).getTime() / 1000
      queryString += ` && (dateCreated > T${date}:000 || date > T${date}:000)`
    }
    if (query.dateTo) {
      let date = (this.stringToDate(query.dateTo).getTime() / 1000) + 86400
      queryString += ` && (dateCreated < T${date}:000 || date < T${date}:000)`
    }
    let results = realm.objects('Entry').filtered(queryString)

    results = Array.prototype.slice.call(results)
    store.dispatch({
      type: 'UPDATE_RESULTS',
      results,
      query
    })
  }

  static createOrUpdate(object, update=false) {
    const now = new Date()
    realm.write(() => {
      let entry = realm.create('Entry', {
        id:
          update ?
            update
            : cuid(),
        content:
          object.content,
        author:
          object.author ?
            realm.create('Author', { name: object.author }, true)
            : null,
        category:
          realm.create('Category', { name: object.category || "Quote" }, true),
        source:
          object.source ?
            realm.create('Source', { name: object.source }, true)
            : null,
        reference:
          object.reference || null,
        date:
          object.date ?
            this.stringToDate(object.date)
            : now,
        dateCreated:
          object.dateCreated ?
            object.dateCreated
            : now,
        dateModified:
          now
      }, !!update)

      // CHECK TAGS FOR DELETION - ADD SOURCE, AUTHOR, CATEGORY. ALLOW SETTINGS
      if (object.tags) {
        entry.tags = object.tags.map(tag => {
          let name = tag[0].toUpperCase() + tag.slice(1)
          return realm.create('Tag', { name }, true)
        })
      }
    }) 
  }

  static createOrUpdateWithAlerts(object, update=false) {
    try {
      this.createOrUpdate(object, update)
      showToast(update ? "Entry updated" : "Entry added", "success")
      !update && store.dispatch({
        type: "ADD_RESULTS",
        results: Entry.getEntries().slice(-1)
      })
      this.updateLists()
    } catch(error) {
      showToast(`${error}`, "danger")
    }
  }

  static deleteEntry(entry) {
    let authorDeleted = false
    realm.write(() => {
      if (entry.author) {
        let author = realm.objectForPrimaryKey('Author', entry.author.name)
        if (author.entries.length === 1) {
          realm.delete(author)
          authorDeleted = true
        }
      }
          
      // TODO - ALSO CHECK TAGS and SOURCE FOR DELETION
      realm.delete(realm.objectForPrimaryKey('Entry', entry.id))
      showToast(
        authorDeleted ? "Entry and author deleted" : "Entry deleted",
         "danger"
        )
      this.updateLists()
    })
  }

  static stringToDate(dateString) {
    let [d,m,y] = dateString.split('-')
    return new Date(y,m-1,d)
  }

  static updateLists() {
    const categories = 
      realm.objects('Category').sorted('name').map(category => category.name)
    const authors = 
      realm.objects('Author').sorted('name').map(author => author.name)
    const sources = 
      realm.objects('Source').sorted('name').map(source => source.name)
    const tags = 
      realm.objects('Tag').sorted('name').map(tag => tag.name)
    store.dispatch({
      type: 'UPDATE_ALL_LISTS',
      categories,
      authors,
      sources,
      tags
    })
  }
}

export class Author extends Realm.Object { 

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

export class Category extends Realm.Object { 

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

export class Tag { 

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

export class Source { 

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

export const realm = new Realm({ 
  schema: [Entry, Author, Category, Tag, Source],
  deleteRealmIfMigrationNeeded: true
})
