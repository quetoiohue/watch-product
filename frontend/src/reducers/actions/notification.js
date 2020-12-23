import { httpGet } from '../../helpers/http'
import * as notificationTypes from '../actionTypes/notifications'
import store from '../../store'

export const loadNotifications = async (payload) => {
  try {
    const response = await httpGet('/notifications')

    const { result } = response

    store.dispatch({
      type: notificationTypes.LOAD_NOTIFICATIONS,
      payload: result,
    })

    return result
  } catch (error) {}
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
