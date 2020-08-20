import { combineReducers } from 'redux'
import articleReducer from './articleReducer'
import languageReducer from './languageReducer'

const rootReducer = combineReducers({
  articleReducer,
  languageReducer
})

export default rootReducer
