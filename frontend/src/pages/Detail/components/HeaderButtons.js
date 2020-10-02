import { Toolbar } from '@material-ui/core'
import { DeleteOutline, NotificationsNone } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { httpDelete } from '../../../helpers/http'
import ButtonSubmit from '../../../components/core/ButtonSubmit'
import { deleteProduct } from '../../../reducers/actions/user'
import { displayModal } from '../../../reducers/actions/modal'
import { useHistory } from 'react-router-dom'

const HeaderButtons = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { editingProduct } = useSelector((state) => state.user)

  const handleDeleteProduct = async () => {
    try {
      await httpDelete(`/products/${editingProduct.id}`)

      dispatch(deleteProduct(editingProduct))

      const isConfirmed = await displayModal('success-modal', {
        text: `Product ${editingProduct.id} has been deleted.`,
      })

      if (isConfirmed !== null) {
        history.push('/')
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
      <Toolbar className="items-center justify-end">
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
