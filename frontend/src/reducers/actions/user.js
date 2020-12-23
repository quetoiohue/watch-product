import * as userActionTypes from '../actionTypes/user'
import store from '../../store'
import { httpGet } from '../../helpers/http'

export const setAuthToken = (authToken) => {
  return {
    type: userActionTypes.SET_AUTH_TOKEN,
    authToken,
  }
}

export const loadUser = async (payload) => {
  try {
    const response = await httpGet('/users/whoami')

    const { result } = response

    await store.dispatch({
      type: userActionTypes.LOAD_USER,
      payload: result,
    })

    return result
  } catch (error) {
    localStorage.removeItem('authToken')
    window.location.href = '/landing'
  }
}

export const setEditingProduct = (payload) => {
  return {
    type: userActionTypes.SET_EDITING_PRODUCT,
    payload,
  }
}

export const addProduct = (payload) => {
  return {
    type: userActionTypes.ADD_PRODUCT,
    payload,
  }
}

export const deleteProduct = (payload) => {
  return {
    type: userActionTypes.DELETE_PRODUCT,
    payload,
  }
}

export const updateProduct = (payload) => {
  return {
    type: userActionTypes.UPDATE_PRODUCT,
    payload,
  }
}
