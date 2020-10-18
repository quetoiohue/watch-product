import { Divider, MenuList } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { httpPut } from '../../helpers/http'
import { displayModal } from '../../reducers/actions/modal'
import { updateNotifications } from '../../reducers/actions/notification'
import NotificationListItem from './NotificationListItem'

const NotificationList = ({ handleClose }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { notifications } = useSelector((state) => state.notifications)

  const handleClickItem = (_notification) => async () => {
    try {
      if (!_notification.status) {
        const response = await httpPut('notifications', {
          notification_ids: [_notification.id],
        })

        console.log(response.result)
        dispatch(updateNotifications(response.result))
      }

      handleClose()
      history.push(`/products/${_notification.product.id}`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <MenuListContainer>
      {notifications?.map((_notification) => {
        return (
          <div key={_notification.id} onClick={handleClickItem(_notification)}>
            <NotificationListItem notification={_notification} />
            <Divider variant="inset" component="li" />
          </div>
        )
      })}
    </MenuListContainer>
  )
}

export default NotificationList

const MenuListContainer = styled(MenuList)`
  width: 400px;
  max-height: 400px;

  ${({ theme }) => theme.mobile`
    width: 300px;
  `}
`
