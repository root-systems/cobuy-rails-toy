import React from 'react'
import { connect } from 'redux-bundler-react'

import ProductsList from '../components/productsList'

const SupplierProducts = ({
  thisSupplierProducts,
  thisSupplier,
  doUpdateHash
}) => {
  return (
    <ProductsList
      products={thisSupplierProducts}
      supplier={thisSupplier}
      doUpdateHash={doUpdateHash}
    />
  )
}

export default connect(
  'selectThisSupplierProducts',
  'selectThisSupplier',
  'doUpdateHash',
  SupplierProducts
)
