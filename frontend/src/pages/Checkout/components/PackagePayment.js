import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ButtonSubmit from '../../../components/core/ButtonSubmit'
import InputField from '../../../components/core/InputField'
import { httpPost } from '../../../helpers/http'
import { displayModal } from '../../../reducers/actions/modal'

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
}

const CheckoutForm = ({ packageType, finish }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { id, amount, points, currency } = packageType

  const user = useSelector((state) => state.user)
  const { name } = user?.user
  const [isProcessing, setIsProcessing] = React.useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setIsProcessing(true)

      const { token, error } = await stripe.createToken(
        elements.getElement(CardElement)
      )

      if (!elements || !stripe) return

      if (error) {
        await displayModal('error-modal', {
          text: `${error.message}`,
        })

        return
      }

      const response = await httpPost(
        '/transaction/stripePayment',
        {
          token,
          package_type_id: id,
        },
        {}
      )

      await displayModal('success-modal', {
        text: 'Payment Successfully',
      })

      finish()
    } catch (error) {
      await displayModal('error-modal', {
        text: `There's something wrong.`,
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <CheckoutFormContainer onSubmit={handleSubmit}>
      <InputField value={name} disabled />
      <CardElement className="card__field" />
      <ButtonSubmit
        className="submit__btn w-full"
        color="primary"
        variant="contained"
        type="submit"
        isWorking={isProcessing}
        disabled={!stripe}
      >
        Pay ${amount}
      </ButtonSubmit>
    </CheckoutFormContainer>
  )
}

const STRIPE_PUBLIC_KEY = `pk_test_51HRJojEAHL6zqfByssSIoU3Ezz6vzubWFzCP6oW4DOmh1uHbKpLXURb4DJLqF0gi9y45lwrtoMDcROzSrTjrPBch00sfaAnUm0`
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

const PackagePayment = ({ packageType, finish }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm packageType={packageType} finish={finish} />
    </Elements>
  )
}

export default PackagePayment

const CheckoutFormContainer = styled.form`
  .card__field {
    margin-bottom: 15px;
    background-color: white;
    padding: 11px 16px;
    border-radius: 17px;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    line-height: 1.3333333;
  }

  .card__field.StripeElement--focus {
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
    border-color: #66afe9;
  }

  .submit__btn {
    margin-top: 28px;
  }
`
