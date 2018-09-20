import React from 'react'
import { connect } from 'redux-bundler-react'

import SuppliersList from '../components/suppliersList'

const MySuppliers = ({
  suppliers
 }) => {
  return (
    <SuppliersList
      suppliers={suppliers}
    />
  )
}

export default connect(
  'selectSuppliers',
  MySuppliers
)
