import React from 'react'
import { connect } from 'redux-bundler-react'

import ProductForm from '../components/productForm'

const NewProduct = ({
  thisSupplier,
  newProduct,
  doAddNewProduct,
  doRemoveNewProduct,
  doUpdateNewProductName,
  doUpdateNewProductDescription,
  doUpdateNewProductUnit,
  doCreateProduct
}) => {
  return (
    <ProductForm
      supplier={thisSupplier}
      newProduct={newProduct}
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
  'selectThisSupplier',
  'selectNewProduct',
  'doAddNewProduct',
  'doRemoveNewProduct',
  'doUpdateNewProductName',
  'doUpdateNewProductDescription',
  'doUpdateNewProductUnit',
  'doCreateProduct',
  NewProduct
)
