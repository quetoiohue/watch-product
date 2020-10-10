import * as userActionTypes from '../actionTypes/user'

export const setAuthToken = (authToken) => {
  return {
    type: userActionTypes.SET_AUTH_TOKEN,
    authToken,
  }
}

export const loadUser = (payload) => {
  return {
    type: userActionTypes.LOAD_USER,
    payload,
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
