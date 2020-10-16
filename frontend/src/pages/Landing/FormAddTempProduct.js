import { Button, fade, Input, Typography } from '@material-ui/core'
import React from 'react'
import guestApis from '../../apis/guest'
import ButtonSubmit from '../../components/core/ButtonSubmit'
import { validURL } from '../../helpers/validate'
import useInputChange from '../../hooks/useInputChange'
import { displayModal } from '../../reducers/actions/modal'

const FormAddTempProduct = (props) => {
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
      const reachedLimit = props.products?.length > 4

      if (reachedLimit) {
        await displayModal('error-modal', {
          text: 'You need login to add more.',
        })

        return
      }

      setIsWorking(true)

      if (!link) {
        return
      }

      if (!validURL(link)) {
        await displayModal('error-modal', { text: 'Your URL is not valid.' })

        return
      }

      if (props.products.some((_p) => _p.link === link)) {
        await displayModal('error-modal', { text: 'Your URL exists already.' })

        return
      }

      const response = await guestApis.crawlingProduct({
        links: [link],
      })

      const newProduct = response.result[0]
      newProduct.link = link

      props.addProduct(newProduct)
    } catch (error) {
      console.log(error)
    } finally {
      setIsWorking(false)
      setFormState({
        link: '',
      })
    }
  }

  return (
    <form className="form">
      <div className="form-input">
        <Input
          value={link}
          name="link"
          onChange={onChangeInput}
          className="input"
          placeholder="https://"
        />
        <ButtonSubmit
          isWorking={isWorking}
          variant="contained"
          color="primary"
          onClick={onSubmitProduct}
        >
          Add Product
        </ButtonSubmit>
        <Typography variant="body1" className="text-left subtext">
          <span className="text-primary">Supported stores:</span> tiki.com,
          shopee.com
        </Typography>
      </div>
    </form>
  )
}

export default FormAddTempProduct
