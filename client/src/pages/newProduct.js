import React from 'react'
import { connect } from 'redux-bundler-react'

import ProductForm from '../components/productForm'

const NewProduct = ({
  thisSupplier,
  newProduct,
  doUpdateNewProductName,
  doUpdateNewProductDescription,
  doUpdateNewProductUnit,
  doCreateProduct,
  doUpdateHash
}) => {
  return (
    <ProductForm
      supplier={thisSupplier}
      newProduct={newProduct}
      doUpdateNewProductName={doUpdateNewProductName}
      doUpdateNewProductDescription={doUpdateNewProductDescription}
      doUpdateNewProductUnit={doUpdateNewProductUnit}
      doCreateProduct={doCreateProduct}
      doUpdateHash={doUpdateHash}
    />
  )
}

export default connect(
  'selectThisSupplier',
  'selectNewProduct',
  'doUpdateNewProductName',
  'doUpdateNewProductDescription',
  'doUpdateNewProductUnit',
  'doCreateProduct',
  'doUpdateHash',
  NewProduct
)
