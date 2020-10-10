import { Grid, Paper, Toolbar, Typography } from '@material-ui/core'
import {
  ArrowRightAlt,
  DeleteOutline,
  NotificationsNone,
} from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { formatMoney } from '../../helpers/format'
import ButtonSubmit from '../../components/core/ButtonSubmit'
import HeaderButtons from './components/HeaderButtons'
import HistoriesChart from './components/HistoriesChart'
import ProductInfo from './components/ProductInfo'
import ProductPrices from './components/ProductPrices'

const Detail = () => {
  return (
    <DetailContainer>
      <HeaderButtons />
      <Grid container spacing={3} className="content__section">
        <Grid item xs={6}>
          <ProductInfo />
        </Grid>
        <Grid item xs={6}>
          <ProductPrices />
        </Grid>
        <Grid item xs={12} className="mt-5">
          <HistoriesChart />
        </Grid>
      </Grid>
    </DetailContainer>
  )
}

export default Detail

const DetailContainer = styled.div`
  .toolbar-btn {
    margin-left: 8px;
  }

  .content__section {
    margin-top: 20px;

    .product__info {
      padding: 12px;

      img {
        height: 100px;
        width: auto;
        margin-right: 8px;
      }

      .product__detail--sum {
        .product__sum--name {
          font-size: 14px;
          line-height: 18px;
          font-weight: 600;
          color: var(--default);
          margin-bottom: 8px;
        }

        .actual__price,
        .old__price {
          font-size: 14px;
          font-weight: 500;
          color: var(--default);
          margin-right: 8px;
          margin-bottom: 8px;
        }

        .product__sum--alert {
          display: flex;
          align-items: center;
          font-size: 13px;

          svg,
          span {
            margin-right: 5px;
          }
        }
      }

      .product__discount {
        padding: 0px 16px;
        font-size: 28px;
        color: var(--black);
        font-weight: 500;
      }
    }

    .product__btn {
      margin-top: 12px;
      float: right;
      color: rgb(30, 70, 32);
      background-color: rgb(237, 247, 237);
    }

    .highlight__prices {
      padding: 12px;

      .highlight__price {
        padding: 12px 0px;

        font-size: 16px;
        p {
          font-weight: 500;
        }
      }
    }
  }
`
