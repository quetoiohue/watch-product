import React from 'react'
import styled from 'styled-components'
import ButtonSubmit from '../../../components/core/ButtonSubmit'

const PackageCard = ({ packageType }) => {
  const { id, amount, points, currency } = packageType

  return (
    <PackageCardContainer className="card__container">
      <div className="sign">
        <div className={`package-point package-point--${id}`}>{amount}</div>
      </div>
      <div className="price">{`${amount} ${currency}`}</div>
      <div className="point">{points} points</div>
      <div className="description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit.
      </div>
      <ButtonSubmit
        variant="contained"
        className={`submit__button submit__button--${id}`}
      >
        Purchase
      </ButtonSubmit>
    </PackageCardContainer>
  )
}

export default PackageCard

const PackageCardContainer = styled.div`
  text-align: center;
  padding: 20px;
  border-right: 1px solid var(--gray-2);

  .sign {
    width: 150px;
    line-height: 150px;
    border-radius: 50%;
    background-color: #fafafa;
    margin: 0 auto;
    margin-bottom: 20px;

    .package-point {
      font-size: 60px;
      font-weight: 600;
    }
    .package-point--1 {
      color: var(--primary-color);
    }
    .package-point--2 {
      color: var(--success-color);
    }
    .package-point--3 {
      color: var(--warning-color);
    }
  }

  .price {
    margin-bottom: 8px;
    font-size: 20px;
    font-weight: 500;
  }
  .point {
    margin-bottom: 16px;
    font-size: 14px;
  }
  .description {
    margin-bottom: 16px;
  }

  .submit__button {
    color: #fff;
  }
  .submit__button--1 {
    background: var(--primary-color);
  }
  .submit__button--2 {
    background: var(--success-color);
  }
  .submit__button--3 {
    background: var(--warning-color);
  }
`
