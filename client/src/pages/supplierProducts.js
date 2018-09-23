import React from 'react'
import { connect } from 'redux-bundler-react'
import { isNil } from 'lodash'

import ProductsList from '../components/productsList'

const SupplierProducts = ({
  products,
  thisSupplier
}) => {
  return (
    <ProductsList
      products={products}
      supplier={thisSupplier}
    />
  )
}

export default connect(
  'doSelectThisSupplierProducts',
  'selectThisSupplier',
  SupplierProducts
)
