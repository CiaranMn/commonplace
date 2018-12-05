import Realm from 'realm'
import {realm} from './realm'
import cuid from 'cuid'
import { store } from '../../App'
import showToast from '../lib/showToast'
import Author from './author'
import Category from './category'
import Source from './source'
import Tag from './tag'

export default class Entry extends Realm.Object {

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

  static getEntries(sort = 'Oldest first') {
    let results
    switch (sort) {
      case 'Oldest first':
        results = realm.objects('Entry').sorted('date', true)
        break
      case 'Newest first':
        results = realm.objects('Entry').sorted('date')
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

  static createOrUpdate(object, update = false, imported = false) {
    const now = new Date()
    let entry
    realm.write(() => {
      entry = realm.create('Entry', {
        id:
          (update || imported) && object.id ?
            object.id
            : cuid(),
        content:
          object.content,
        author:
          realm.create('Author', { name: object.author || 'Unknown'}, true),
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
            imported ?
              object.date : this.stringToDate(object.date)
            : now,
        dateCreated:
          object.dateCreated ?
            imported ?
              object.dateCreated : this.stringToDate (object.dateCreated)
            : now,
        dateModified:
          imported && object.dateModified ?
            object.dateModified
            : now
      }, update || imported)

      if (object.tags) {
        let tags = imported ? object.tags.split(',') : object.tags
        entry.tags = tags.map(tag => {
          let name = tag[0].toUpperCase() + tag.slice(1)
          return realm.create('Tag', { name }, true)
        })
      }
    })
    return entry
  }

  static createOrUpdateWithAlerts(object, update = false) {
    try {
      let entry = this.createOrUpdate(object, update)
      showToast(update ? "Entry updated" : "Entry added", "success")
      !update && store.dispatch({
        type: "ADD_RESULTS",
        results: [entry]
      })
      this.updateLists()
    } catch (error) {
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
    let [d, m, y] = dateString.split('-')
    return new Date(y, m - 1, d)
  }

  static updateLists() {
    const categories = Category.getCategories()
    const authors = Author.getAuthors()
    const sources = Source.getSources()
    const tags = Tag.getTags()
    store.dispatch({
      type: 'UPDATE_ALL_LISTS',
      categories,
      authors,
      sources,
      tags
    })
  }
}
