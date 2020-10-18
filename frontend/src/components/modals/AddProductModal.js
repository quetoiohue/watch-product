import { Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import ButtonSubmit from '../../components/core/ButtonSubmit'
import InputField from '../../components/core/InputField'
import { checkExistingProduct } from '../../helpers'
import { httpPost } from '../../helpers/http'
import { validURL } from '../../helpers/validate'
import useInputChange from '../../hooks/useInputChange'
import { displayModal } from '../../reducers/actions/modal'
import { addProduct } from '../../reducers/actions/user'

const AddProductModal = ({ close }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.user)
  const { products } = user?.user
  const [formState, onChangeInput, setFormState] = useInputChange({
    link: '',
  })
  const [isWorking, setIsWorking] = React.useState(false)

  const { link } = formState

  React.useEffect(() => {
    return () => {
      console.log('unmount')
    }
  }, [])

  const onSubmitProduct = async (event) => {
    event.preventDefault()

    try {
      setIsWorking(true)

      if (!link) {
        return
      }

      if (!validURL(link)) {
        await displayModal('error-modal', { text: 'Your URL is not valid.' })

        return
      }
      const isExistingProduct = checkExistingProduct(products, link)

      if (!!isExistingProduct) {
        await displayModal('error-modal', {
          text: 'This product existed already.',
        })

        return
      }

      const response = await httpPost(
        '/products',
        {
          links: [link],
        },
        {}
      )

      const newProduct = response.result
      dispatch(addProduct(newProduct))
      await displayModal('success-modal', {
        text: 'Product has been saved successfully.',
      })

      history.push('/')
    } catch (error) {
      await displayModal('error-modal', {
        text: `There's something wrong.`,
      })
    } finally {
      setIsWorking(false)
      setFormState({
        link: '',
      })
    }
  }

  return (
    <AddProductModalContainer>
      <div className="form__control">
        <div className="form__label fs-14">Product url</div>
        <InputField
          value={link}
          name="link"
          onChange={onChangeInput}
          className="input w-full"
          placeholder="https://"
        />
        <Typography className="text-left form__subtitle">
          <span className="text-primary">Supported stores:</span> tiki.com,
          shopee.com
        </Typography>
      </div>
      <ButtonSubmit
        isWorking={isWorking}
        variant="contained"
        color="primary"
        onClick={onSubmitProduct}
        className="form__btn w-full"
      >
        Add Product
      </ButtonSubmit>
    </AddProductModalContainer>
  )
}

export default AddProductModal

const AddProductModalContainer = styled.div`
  padding-top: 32px;
  margin: 0px -27px;

  .form__label {
    font-weight: 500;
    margin-bottom: 8px;
  }

  .input {
    margin-bottom: 4px;
  }

  .form__subtitle {
    font-size: 14px;
  }

  .form__btn {
    margin-top: 40px;
  }

  ${({ theme }) => theme.mobile`
      margin: 0px auto;
  `}
`
