import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createAppContainer } from 'react-navigation'
import { Root } from 'native-base'

import DrawerNavigator from './src/navigators/DrawerNavigator'
import rootReducer from './src/reducers'
import {Author, Category, Source, Tag} from './src/models/realm'
import getSettings from './src/lib/getSettings'

getSettings()

// N.B. seeds file wipes database before seeeding!
require('./src/db/seeds')

const authors = Author.getAuthors()
const categories = Category.getCategories()
const sources = Source.getSources()
const tags = Tag.getTags()

// populate initial lists from db to display in pickers - 
// updated by Entry model when changes to db made
export const store = createStore(
  rootReducer, { 
    categories, 
    authors, 
    sources, 
    tags
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
