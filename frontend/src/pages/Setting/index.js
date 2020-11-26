import { NotificationsNoneOutlined } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import BasicPaper from '../../components/core/BasicPaper'
import ButtonSubmit from '../../components/core/ButtonSubmit'
import InputField from '../../components/core/InputField'
import { httpPut } from '../../helpers/http'
import useInputChange from '../../hooks/useInputChange'
import { displayModal } from '../../reducers/actions/modal'

const Setting = () => {
  const history = useHistory()
  const { user } = useSelector((state) => state.user)
  const { email, telephone, total_point } = user || {}
  const [formState, onChange, setFormState] = useInputChange({
    telephone: '',
  })
  const [isProcessing, setIsProcessing] = React.useState(false)

  const { telephone: telephoneState } = formState

  React.useState(() => {
    setFormState({
      telephone,
    })
  }, [telephone])

  const onClickCharge = () => {
    history.push('/checkout')
  }

  const onSave = async (event) => {
    console.log(formState)
    event.preventDefault()

    try {
      setIsProcessing(true)

      if (!telephoneState) {
        await displayModal('error-modal', {
          text: `Your telephone is not valid.`,
        })

        return
      }
      displayModal('spinner-loading')

      await httpPut('/users/change-telephone', {
        telephone: telephoneState,
      })

      await displayModal('success-modal', {
        text: 'Your change has been saved successfully.',
      })

      history.push('/')
    } catch (error) {
      await displayModal('error-modal', {
        text: `There's something wrong.`,
      })
    } finally {
      setIsProcessing(false)
      displayModal(null)
    }
  }

  const headerBar = (
    <>
      <span className="title">Profile</span>
      <div />
    </>
  )

  const mainContent = (
    <>
      <div className="flex items-center justify-end card__wrapper">
        <div className="flex-1">
          <form className="form__container">
            <div className="form__control">
              <div className="form__label">Email</div>
              <InputField value={email} disabled />
            </div>
            <div className="form__control">
              <div className="form__label">Telephone</div>
              <InputField
                value={telephoneState}
                name="telephone"
                onChange={onChange}
              />
            </div>
          </form>
        </div>
        <div className="flex-1 flex items-center justify-between notice__container">
          <div className="flex items-center justify-start notice__info">
            <NotificationsNoneOutlined
              color="primary"
              className="notice__info--icon"
            />
            <div className="notice__info--content">
              <p className="notice__content--text leading-5">
                Credit Notification
              </p>
              <p className="notice__content--text leading-5">
                Available:{' '}
                <span className="text-primary">{total_point} points</span>
              </p>
            </div>
          </div>
          <ButtonSubmit
            color="primary"
            variant="contained"
            className="notice__btn"
            onClick={onClickCharge}
          >
            Charge
          </ButtonSubmit>
        </div>
      </div>
      <div className="footer__content text-right">
        <ButtonSubmit
          variant="contained"
          color="primary"
          className="footer__btn"
          onClick={onSave}
          isWorking={isProcessing}
        >
          Save
        </ButtonSubmit>
      </div>
    </>
  )

  return (
    <SettingContainer>
      <BasicPaper headerBar={headerBar} mainContent={mainContent} />
    </SettingContainer>
  )
}

export default Setting

const SettingContainer = styled.div`
  .content__container {
    padding: 40px 20px;

    .form__label {
      margin-bottom: 8px;
    }

    .notice__container {
      padding: 30px 20px;
      margin-left: 80px;
      min-height: 100%;
      background: var(--gray-2);
      font-size: 14px;

      .notice__info--icon {
        margin-right: 8px;
      }
    }

    .footer__btn {
      width: 100px;
    }
  }

  ${({ theme }) => theme.mobile`
    .card__wrapper {
      flex-wrap: wrap;
    }
    .content__container .notice__container {
        margin: 20px 0px;
        button {
          margin-left: 8px;
        }
      }  
  `}
`
