import * as modalActionTypes from '../actionTypes/modal'

export const displayModal = (modal, props) => {
  console.log(modal, props)
  return {
    type: modalActionTypes.DISPLAY_MODAL,
    payload: {
      modal,
      props,
    },
  }
}

export const hideModal = () => {
  return {
    type: modalActionTypes.DISPLAY_MODAL,
    payload: {
      modal: null,
      props: null,
    },
  }
}
