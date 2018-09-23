import React from 'react'
import { connect } from 'redux-bundler-react'
import { isNil } from 'lodash'

import ProductsList from '../components/productsList'

const SupplierProducts = ({
  products
}) => {
  return (
    <ProductsList
      products={products}
    />
  )
}

export default connect(
  'doSelectThisSupplierProducts',
  SupplierProducts
)
