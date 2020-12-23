import * as notificationTypes from './actionTypes/notifications'

const initialState = {
  notifications: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case notificationTypes.LOAD_NOTIFICATIONS:
      return {
        notifications: [...action.payload]
      }
    case notificationTypes.APPEND_NOTIFICATION:
      return {
        notifications: [action.payload, ...state.notifications]
      }
    case notificationTypes.UPDATE_NOTIFICATION:
      const updatedNotifications = state.notifications.map(_notify => {
        const updatedItem = action.payload.find(_n => _n.id === _notify.id)

        return !!updatedItem ? updatedItem : _notify
      })
      return {
        notifications: [...updatedNotifications]
      }
    default:
      return state
  }
}
