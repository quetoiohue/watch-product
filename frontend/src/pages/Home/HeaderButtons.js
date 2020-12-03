import { Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import readXlsxFile from 'read-excel-file'
import styled from 'styled-components'
import ButtonSubmit from '../../components/core/ButtonSubmit'
import ExportExcel from '../../components/core/ExportExcel'
import InputFile from '../../components/core/InputFile'
import { httpPost } from '../../helpers/http'
import { displayModal } from '../../reducers/actions/modal'
import { addProduct } from '../../reducers/actions/user'

const HeaderButtons = () => {
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.user.user) || []
  const links = products?.map((product) => ({ link: product?.link })) || []
  const inputRef = React.useRef(null)

  const importExcel = (event) => {
    event.persist()
    const { files } = event.target

    readXlsxFile(files[0]).then(async (rows) => {
      try {
        displayModal('spinner-loading')

        const linkList = links?.map((_link) => _link.link)
        const [title, ...importedLinks] = rows
        const mergeLinkArray = importedLinks.reduce((a, b) => {
          return [...a, ...b]
        }, [])

        let uniqueLinks = mergeLinkArray.filter(
          (_link) => !linkList.includes(_link)
        )
        uniqueLinks = [...new Set(uniqueLinks)]

        const response = await httpPost(
          '/products',
          {
            links: uniqueLinks,
          },
          {}
        )

        const { result } = response

        dispatch(addProduct(result))
        await displayModal('success-modal', {
          text: 'Products have been saved successfully.',
        })
      } catch (error) {
        console.log(error)
        await displayModal('error-modal', {
          text: `There's something wrong.`,
        })
      } finally {
        displayModal(null)
      }
    })
  }

  const exportExcel = () => {
    const links = products?.map((_link) => _link.link)

    console.log('export pdf', links)
  }

  return (
    <HeaderButtonsContainer className="flex items-center justify-between toolbar">
      <Typography className="title" variant="h5">
        All Products
      </Typography>
      <div className="flex items-center">
        <InputFile onChange={importExcel} />
        <ExportExcel
          element={<ButtonSubmit color="primary">Export</ButtonSubmit>}
          data={links}
          name={'The product link table'}
          columns={[{ label: 'Link', value: 'link' }]}
        ></ExportExcel>
      </div>
    </HeaderButtonsContainer>
  )
}

export default HeaderButtons

const HeaderButtonsContainer = styled.div`
  &.toolbar {
    margin-bottom: 16px;
  }
  .ml-4 {
    margin-left: 1rem;
  }
`
