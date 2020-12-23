import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ButtonSubmit from '../../../components/core/ButtonSubmit'
import { EMAIL, SMS } from '../../../constants'
import { httpPut } from '../../../helpers/http'
import { displayModal } from '../../../reducers/actions/modal'
import { updateProduct } from '../../../reducers/actions/user'

const FooterButtons = ({ alerts }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { editingProduct } = useSelector(state => state.user)
  const [isWorking, setIsWorking] = React.useState(false)

  const onClickSkip = () => {
    history.push('/')
  }

  const onClickNext = async () => {
    try {
      setIsWorking(true)

      const response = await httpPut(`/products/${editingProduct.id}`, {
        alertTypes: [
          {
            id: EMAIL,
            value: alerts.email
          },
          {
            id: SMS,
            value: alerts.sms
          }
        ]
      })

      const { result } = response

      dispatch(updateProduct(result))

      setIsWorking(false)
      await displayModal('success-modal', {
        text: 'Your changes have been saved.'
      })
      history.push('/')
    } catch (error) {
      await displayModal('error-modal', {
        text: 'Your point is not enough to make change.'
      })
      history.push('/checkout')
    }
  }

  return (
    <section className="footer__buttons flex justify-end">
      <ButtonSubmit
        variant="contained"
        color="default"
        className="footer__button"
        onClick={onClickSkip}
      >
        Skip
      </ButtonSubmit>
      <ButtonSubmit
        variant="contained"
        color="primary"
        className="footer__button next__btn"
        onClick={onClickNext}
        isWorking={isWorking}
      >
        Next
      </ButtonSubmit>
    </section>
  )
}

export default FooterButtons
