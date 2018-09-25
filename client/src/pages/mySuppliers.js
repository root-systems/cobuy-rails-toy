import React from 'react'
import { connect } from 'redux-bundler-react'
import { Button } from '@material-ui/core'

import SuppliersList from '../components/suppliersList'

const MySuppliers = ({
  suppliers,
  doUpdateHash
 }) => {
  return (
    <SuppliersList
      suppliers={suppliers}
      doUpdateHash={doUpdateHash}
    />
  )
}

export default connect(
  'selectSuppliers',
  'doUpdateHash',
  MySuppliers
)
