import React from 'react'
import { connect } from 'redux-bundler-react'

import NewProductForm from '../components/newProductForm'

const NewProduct = ({
  thisSupplier,
  productFormData,
  doUpdateProductFormDataName,
  doUpdateProductFormDataDescription,
  doUpdateProductFormDataUnit,
  doCreateProduct,
  doUpdateHash
}) => {
  return (
    <NewProductForm
      supplier={thisSupplier}
      productFormData={productFormData}
      doUpdateProductFormDataName={doUpdateProductFormDataName}
      doUpdateProductFormDataDescription={doUpdateProductFormDataDescription}
      doUpdateProductFormDataUnit={doUpdateProductFormDataUnit}
      doCreateProduct={doCreateProduct}
      doUpdateHash={doUpdateHash}
    />
  )
}

export default connect(
  'selectThisSupplier',
  'selectProductFormData',
  'doUpdateProductFormDataName',
  'doUpdateProductFormDataDescription',
  'doUpdateProductFormDataUnit',
  'doCreateProduct',
  'doUpdateHash',
  NewProduct
)
