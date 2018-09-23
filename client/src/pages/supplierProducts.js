import React from 'react'
import { connect } from 'redux-bundler-react'
import { isNil } from 'lodash'

import ProductsList from '../components/productsList'

const SupplierProducts = ({
  thisSupplierProducts,
  thisSupplier,
  newProducts,
  doAddNewProduct,
  doRemoveNewProduct,
  doUpdateNewProductName,
  doUpdateNewProductDescription,
  doUpdateNewProductUnit,
  doCreateProduct
}) => {
  return (
    <ProductsList
      products={thisSupplierProducts}
      supplier={thisSupplier}
      newProducts={newProducts}
      doAddNewProduct={doAddNewProduct}
      doRemoveNewProduct={doRemoveNewProduct}
      doUpdateNewProductName={doUpdateNewProductName}
      doUpdateNewProductDescription={doUpdateNewProductDescription}
      doUpdateNewProductUnit={doUpdateNewProductUnit}
      doCreateProduct={doCreateProduct}
    />
  )
}

export default connect(
  'selectThisSupplierProducts',
  'selectThisSupplier',
  'selectNewProducts',
  'doAddNewProduct',
  'doRemoveNewProduct',
  'doUpdateNewProductName',
  'doUpdateNewProductDescription',
  'doUpdateNewProductUnit',
  'doCreateProduct',
  SupplierProducts
)
