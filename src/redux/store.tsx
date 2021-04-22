import { createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import postReducer from './post/postReducer'

const rootReducer = combineReducers({ posts: postReducer })
const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export type RootState = ReturnType<typeof rootReducer>
export default store;