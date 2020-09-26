import * as userActionTypes from './actionTypes/user'

const initialState = {
  user: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.FETCH_USER_REQUEST:
      return {
        ...state,
      }
    case userActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      }
    case userActionTypes.FETCH_USER_ERROR:
      return {
        ...initialState,
      }
    default:
      return state
  }
}
