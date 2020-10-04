import React from 'react'
import styled from 'styled-components'
import ButtonSubmit from '../../../components/core/ButtonSubmit'
import Modal from '../../../components/core/Modal'
import PackagePayment from './PackagePayment'

const PackageCard = ({ packageType }) => {
  const { id, amount, points, currency } = packageType
  const [openPayment, setOpenPayment] = React.useState(false)

  return (
    <PackageCardContainer className="card__container">
      <div className="package__sign">
        <div className={`package-point package-point--${id}`}>{amount}</div>
      </div>
      <div className="package__price">{`${amount} ${currency}`}</div>
      <div className="package__point">{points} points</div>
      <div className="package__description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit.
      </div>
      <ButtonSubmit
        variant="contained"
        className={`submit__button submit__button--${id}`}
        onClick={() => setOpenPayment(true)}
      >
        Purchase
      </ButtonSubmit>
      <Modal
        isOpen={openPayment}
        close={() => setOpenPayment(false)}
        title="Purchase"
      >
        <PackagePayment
          packageType={packageType}
          finish={() => setOpenPayment(false)}
        />
      </Modal>
    </PackageCardContainer>
  )
}

export default PackageCard

const PackageCardContainer = styled.div`
  text-align: center;
  padding: 20px;
  border-right: 1px solid var(--gray-2);
  color: var(--default);

  .package__sign {
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

  .package__price {
    margin-bottom: 8px;
    font-size: 20px;
    font-weight: 500;
  }
  .package__point {
    margin-bottom: 16px;
    font-size: 14px;
  }
  .package__description {
    margin-bottom: 28px;
    font-size: 14px;
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
