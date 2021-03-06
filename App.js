import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createAppContainer } from 'react-navigation'
import { Root } from 'native-base'
import SplashScreen from 'react-native-splash-screen'

import DrawerNavigator from './src/navigators/DrawerNavigator'
import rootReducer from './src/reducers'
import {Author, Category, Source, Tag} from './src/models/realm'
import getSettings from './src/lib/getSettings'

getSettings()

// N.B. seed files does currently do NOT wipe database before seeding
// uncomment lines in seeds file to change this behaviour
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

  componentDidMount() {
    SplashScreen.hide()
  }

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
