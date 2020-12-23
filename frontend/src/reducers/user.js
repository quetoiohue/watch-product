import * as userActionTypes from './actionTypes/user'

const initialState = {
  user: null,
  authToken: null,
  editingProduct: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.authToken
      }
    case userActionTypes.LOAD_USER:
      return {
        ...state,
        user: action.payload
      }
    case userActionTypes.SET_EDITING_PRODUCT:
      return {
        ...state,
        editingProduct: action.payload
      }
    case userActionTypes.ADD_PRODUCT:
      const userProducts = state.user?.products || []
      return {
        ...state,
        user: {
          ...state.user,
          products: [...action.payload, ...userProducts]
        }
      }
    case userActionTypes.UPDATE_PRODUCT:
      const updateList = state.user.products
      const updatedIndex = updateList.findIndex(
        _p => _p.id === action.payload.id
      )
      updateList[updatedIndex] = { ...action.payload }

      return {
        ...state,
        user: {
          ...state.user,
          products: [...updateList]
        }
      }
    case userActionTypes.DELETE_PRODUCT:
      const productList = state.user.products
      const newProductList = productList.filter(
        _p => _p.id !== action.payload.id
      )

      return {
        ...state,
        user: {
          ...state.user,
          products: [...newProductList]
        }
      }
    default:
      return state
  }
}
