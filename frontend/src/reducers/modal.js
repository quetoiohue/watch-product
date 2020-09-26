import * as modalActionTypes from './actionTypes/modal'

const initialState = {
  modal: null,
  props: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case modalActionTypes.DISPLAY_MODAL:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
