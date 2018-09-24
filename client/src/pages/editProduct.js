import React from 'react'
import { connect } from 'redux-bundler-react'

import EditProductForm from '../components/editProductForm'

const EditProduct = ({
  thisSupplier,
  productFormData,
  doUpdateProductFormDataName,
  doUpdateProductFormDataDescription,
  doUpdateProductFormDataUnit,
  doCreateProduct,
  doUpdateHash,
  doUpdateProductFormData
}) => {
  return (
    <EditProductForm
      supplier={thisSupplier}
      productFormData={productFormData}
      doUpdateProductFormDataName={doUpdateProductFormDataName}
      doUpdateProductFormDataDescription={doUpdateProductFormDataDescription}
      doUpdateProductFormDataUnit={doUpdateProductFormDataUnit}
      doCreateProduct={doCreateProduct}
      doUpdateHash={doUpdateHash}
      doUpdateProductFormData={doUpdateProductFormData}
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
  'doUpdateProductFormData',
  EditProduct
)
