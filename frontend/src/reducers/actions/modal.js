import * as modalActionTypes from '../actionTypes/modal'
import defer from 'defer-promise'
import store from '../../store'

export const displayModal = async (modal, props) => {
  if (props === null) {
    store.dispatch(hideModal())

    return
  }

  window.modalDeferred = await defer()

  store.dispatch({
    type: modalActionTypes.DISPLAY_MODAL,
    payload: {
      modal,
      props,
    },
  })

  return new Promise((resolve) => {
    window.modalDeferred.promise
      .then(resolve)
      .catch(() => resolve(null))
      .then(() => {
        store.dispatch(hideModal())
        window.modalDeferred = null
      })
  })
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
