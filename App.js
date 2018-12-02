import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createAppContainer } from 'react-navigation'
import { AsyncStorage } from 'react-native'
import { Root } from 'native-base'

import DrawerNavigator from './src/navigators/DrawerNavigator'
import rootReducer from './src/reducers'
import {Entry, Author, Category, Source, Tag} from './src/models/realm'

// N.B Seeds will wipe existing database!
require('./src/db/seeds')

const theme = async () => {
  let theme = undefined
  try {
    theme = await AsyncStorage.getItem('theme') || undefined
    if (theme) { theme = JSON.parse(theme) }
  } catch (err) {
    alert(err.message)
  }
  return theme
}

const authors = Author.getAuthors()
const categories = Category.getCategories()
const sources = Source.getSources()
const tags = Tag.getTags()

const results = Entry.getEntries()

// populate initial lists from db to display in pickers - 
// updated by Entry model when changes to db made
export const store = createStore(
  rootReducer, { 
    categories, 
    authors, 
    query: {},
    results,
    sources, 
    tags,
    theme
  } 
)

// sidedrawer contains tab navigator, tabs contain stacks
const AppContainer = createAppContainer(DrawerNavigator)

export class App extends React.Component {

  render() {
    return (
      <Root>
        <Provider store={store}>
          <AppContainer />
        </Provider> 
      </Root>
    )
  }
}
