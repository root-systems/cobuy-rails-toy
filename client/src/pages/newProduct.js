import React from 'react'
import { connect } from 'redux-bundler-react'

import NewProductForm from '../components/newProductForm'

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
    <NewProductForm
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
