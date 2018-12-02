import {combineReducers} from 'redux'

import authorReducer from './authorReducer'
import categoryReducer from './categoryReducer'
import resultsReducer from './resultsReducer'
import sourceReducer from './sourceReducer'
import tagReducer from './tagReducer'
import queryReducer from './queryReducer'
import themeReducer from './themeReducer';

export default rootReducer = combineReducers({
  authors: authorReducer,
  categories: categoryReducer,
  sources: sourceReducer,
  tags: tagReducer,
  query: queryReducer,
  results: resultsReducer,
  theme: themeReducer
})
