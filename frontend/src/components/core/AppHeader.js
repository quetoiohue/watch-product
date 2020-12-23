import {
  Badge,
  Container,
  IconButton,
  MenuItem,
  Popover
} from '@material-ui/core'
import {
  AccountCircle,
  AddCircleOutline,
  NotificationsNone
} from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { getNoReadNotification } from '../../helpers'
import Modal from '../core/Modal'
import AddProductModal from '../modals/AddProductModal'
import LightLogo from './LightLogo'
import NotificationList from './NotificationList'

const AppHeader = props => {
  const history = useHistory()
  const { notifications } = useSelector(state => state.notifications)
  const container = React.useRef(null)
  const [openAddProduct, setOpenAddProduct] = React.useState(false)
  const [anchorNotify, setAnchorNotify] = React.useState(null)
  const [anchorMenu, setAnchorMenu] = React.useState(null)

  const open = Boolean(anchorNotify)
  const openMenu = Boolean(anchorMenu)

  const onClickSetting = () => {
    handleCloseMenu()
    history.push('/setting')
  }

  const onClickLogout = () => {
    handleCloseMenu()
    localStorage.removeItem('authToken')
    window.location.href = '/landing'
  }

  const handleClick = event => {
    setAnchorNotify(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorNotify(null)
  }

  const handleClickMenu = event => {
    setAnchorMenu(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorMenu(null)
  }

  return (
    <AppHeaderContainer className="flex-none">
      <Container className="py-2">
        <div className="flex justify-between items-center">
          <div className="nav-logo flex-none" id="header__icon" ref={container}>
            <LightLogo />
          </div>
          <div className="nav-spacing flex-1" />
          <div className="nav-btn flex-none flex">
            <IconButton onClick={() => setOpenAddProduct(true)}>
              <AddCircleOutline />
            </IconButton>
            <div>
              <IconButton onClick={handleClick}>
                <Badge
                  badgeContent={getNoReadNotification(notifications)}
                  color="primary"
                >
                  <NotificationsNone />
                </Badge>
              </IconButton>
              <Popover
                open={open}
                anchorEl={anchorNotify}
                onClose={handleClose}
                style={PopoverStyle}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              >
                <NotificationList handleClose={handleClose} />
              </Popover>
            </div>
            <div>
              <IconButton onClick={handleClickMenu}>
                <AccountCircle />
              </IconButton>
              <Popover
                open={openMenu}
                anchorEl={anchorMenu}
                onClose={handleCloseMenu}
                // style={PopoverStyle}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              >
                <MenuItem onClick={onClickSetting}>Setting</MenuItem>
                <MenuItem onClick={onClickLogout}>Logout</MenuItem>
              </Popover>
            </div>
          </div>
        </div>
      </Container>
      <Modal
        isOpen={openAddProduct}
        close={() => setOpenAddProduct(false)}
        title="Add Product"
      >
        <AddProductModal />
      </Modal>
    </AppHeaderContainer>
  )
}

export default AppHeader

const AppHeaderContainer = styled.div`
  background: var(--black);
  color: var(--gray-2);

  button {
    color: var(--gray-2);
  }
`
const PopoverStyle =
  window.innerWidth <= 468
    ? {
        top: '0px',
        left: '-47px'
      }
    : {
        top: '0px',
        left: '-50px'
      }
