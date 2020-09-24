import { Button, Input, Typography } from '@material-ui/core'
import React from 'react'

import guestApis from '../../apis/guest'

const FormAddTempProduct = () => {
  React.useEffect(() => {
    async function crawlingData() {
      await guestApis.crawlingProduct({
        links: [
          'https://tiki.vn/vot-cau-long-pro-kennex-thunder-7001-mau-xam-p43874010.html?src=category-page-1975.8411&2hi=0',
        ],
      })
    }

    crawlingData()
  }, [])
  return (
    <form className="form">
      <div className="form-input">
        <Input className="input" placeholder="https://" />
        <Button variant="contained" color="primary">
          Add Product
        </Button>
        <Typography variant="body1" className="text-left">
          <span className="text-primary">Supported stores:</span> tiki.com,
          shopee.com
        </Typography>
      </div>
    </form>
  )
}

export default FormAddTempProduct
