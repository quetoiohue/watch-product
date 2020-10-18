import { Toolbar } from '@material-ui/core'
import { DeleteOutline, NotificationsNone } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ButtonSubmit from '../../../components/core/ButtonSubmit'
import { httpDelete } from '../../../helpers/http'
import { displayModal } from '../../../reducers/actions/modal'
import { deleteProduct } from '../../../reducers/actions/user'

const HeaderButtons = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { editingProduct } = useSelector((state) => state.user)

  const handleDeleteProduct = async () => {
    try {
      const isConfirmed = await displayModal('confirm-modal', {
        text: `Are you sure delete this item?`,
      })

      if (isConfirmed !== null) {
        await displayModal('spinner-loading')
        const response = await httpDelete(`/products/${editingProduct.id}`)

        if (!response) throw Error('Fetch api fail!')

        await dispatch(deleteProduct(editingProduct))

        const isSuccessConfirmed = await displayModal('success-modal', {
          text: `Product ${editingProduct.id} has been deleted.`,
        })

        if (isSuccessConfirmed !== null) {
          history.push('/')
        }
      }
    } catch (error) {
      await displayModal('error-modal', {
        text: `There's something wrong.`,
      })
    }
  }

  const handleManageAlerts = () => {
    history.push(`/products/${editingProduct.id}/alerts`)
  }
  return (
    <>
      <Toolbar className="items-center justify-end toolbar">
        <ButtonSubmit
          color="primary"
          variant="contained"
          endIcon={<NotificationsNone />}
          className="toolbar-btn"
          onClick={handleManageAlerts}
        >
          Manage Alerts
        </ButtonSubmit>
        <ButtonSubmit
          color="primary"
          variant="contained"
          endIcon={<DeleteOutline />}
          className="toolbar-btn"
          onClick={handleDeleteProduct}
        >
          Delete Product
        </ButtonSubmit>
      </Toolbar>
    </>
  )
}

export default HeaderButtons
