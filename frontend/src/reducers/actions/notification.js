import * as notificationTypes from '../actionTypes/notifications'

export const loadNotifications = (payload) => {
  return {
    type: notificationTypes.LOAD_NOTIFICATIONS,
    payload,
  }
}

export const appendNotifications = (payload) => {
  return {
    type: notificationTypes.APPEND_NOTIFICATION,
    payload,
  }
}

export const updateNotifications = (payload) => {
  return {
    type: notificationTypes.UPDATE_NOTIFICATION,
    payload,
  }
}
