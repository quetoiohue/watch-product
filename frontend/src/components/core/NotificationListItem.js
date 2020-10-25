import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  MenuItem,
} from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { createMarkup } from '../../helpers'
import { formatDateTime } from '../../helpers/format'

const NotificationListItem = ({ notification }) => {
  const { product, text, status, created_at } = notification || {}
  const { image, name } = product || {}

  return (
    <MenuItemContainer
      className={`menu__item ${status ? '' : 'no__read'}`}
      alignItems="flex-start"
    >
      <ListItemAvatar className="item__avatar">
        <Avatar alt="product." src={image} />
      </ListItemAvatar>
      <ListItemText
        className="item__text"
        primary={<span className="item__name">{name}</span>}
        secondary={
          <React.Fragment>
            <div className="item__time">{formatDateTime(created_at)}</div>
            <div
              className="item__price"
              dangerouslySetInnerHTML={createMarkup(text)}
            />
          </React.Fragment>
        }
      />
    </MenuItemContainer>
  )
}

export default NotificationListItem

const MenuItemContainer = styled(MenuItem)`
  &.no__read {
    font-weight: 600;
    &::after {
      content: '';
      position: absolute;
      bottom: 15px;
      left: 95%;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--primary-color);
    }
    .MuiListItemText-primary {
      font-weight: 600;
    }
    .item__time {
      color: var(--primary-color);
    }
    .item__price {
      strong {
        color: var(--danger-color);
      }
    }
  }

  .item__text {
    white-space: normal;

    .MuiListItemText-primary {
      line-height: 16px;
      font-size: 13px;
      margin-bottom: 4px;

      ${({ theme }) => theme.mobile`
      font-size: 12px;
      
      `}
    }
    .MuiListItemText-secondary {
      font-size: 11px;
      font-weight: 500;
    }
  }
`
