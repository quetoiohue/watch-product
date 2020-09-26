import { combineReducers } from 'redux'
import userReducer from './user'
import modalReducer from './modal'

export default combineReducers({
  user: userReducer,
  modal: modalReducer,
})
