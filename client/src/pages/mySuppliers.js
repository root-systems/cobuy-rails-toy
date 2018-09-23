import React from 'react'
import { connect } from 'redux-bundler-react'
import { Button } from '@material-ui/core'

import SuppliersList from '../components/suppliersList'

const buttonStyle = {
  marginTop: 20
}

const MySuppliers = ({
  suppliers,
  doUpdateHash
 }) => {
  return (
    <div>
      <SuppliersList
        suppliers={suppliers}
        doUpdateHash={doUpdateHash}
      />
      <Button
        variant='outlined'
        style={buttonStyle}
        type='button'
        onClick={() => { doUpdateHash(`create-supplier`) }}
      >Create a new supplier</Button>
    </div>
  )
}

export default connect(
  'selectSuppliers',
  'doUpdateHash',
  MySuppliers
)
