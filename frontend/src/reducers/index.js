import { combineReducers } from 'redux'
import userReducer from './user'
import modalReducer from './modal'
import notifications from './notifications'

export default combineReducers({
  user: userReducer,
  modal: modalReducer,
  notifications: notifications,
})
