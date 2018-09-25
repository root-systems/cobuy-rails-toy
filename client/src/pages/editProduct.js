import React from 'react'
import { connect } from 'redux-bundler-react'
import { isNil } from 'lodash'

import EditProductForm from '../components/editProductForm'

const EditProduct = ({
  thisProduct,
  productFormData,
  doUpdateProductFormDataName,
  doUpdateProductFormDataDescription,
  doUpdateProductFormDataUnit,
  doUpdateHash,
  doUpdateProductFormData,
  priceSpecsFormData,
  doUpdatePriceSpecsFormData,
  doAddPriceSpec,
  doRemovePriceSpec,
  doUpdatePriceSpecPrice,
  doUpdatePriceSpecMinimum,
  doCreateProduct
}) => {
  if (isNil(thisProduct)) return null
  return (
    <EditProductForm
      product={thisProduct}
      productFormData={productFormData}
      doUpdateProductFormDataName={doUpdateProductFormDataName}
      doUpdateProductFormDataDescription={doUpdateProductFormDataDescription}
      doUpdateProductFormDataUnit={doUpdateProductFormDataUnit}
      doUpdateHash={doUpdateHash}
      doUpdateProductFormData={doUpdateProductFormData}
      priceSpecsFormData={priceSpecsFormData}
      doUpdatePriceSpecsFormData={doUpdatePriceSpecsFormData}
      doAddPriceSpec={doAddPriceSpec}
      doRemovePriceSpec={doRemovePriceSpec}
      doUpdatePriceSpecPrice={doUpdatePriceSpecPrice}
      doUpdatePriceSpecMinimum={doUpdatePriceSpecMinimum}
      doCreateProduct={doCreateProduct}
    />
  )
}

export default connect(
  'selectProductFormData',
  'doUpdateProductFormDataName',
  'doUpdateProductFormDataDescription',
  'doUpdateProductFormDataUnit',
  'doUpdateHash',
  'doUpdateProductFormData',
  'selectThisProduct',
  'selectPriceSpecsFormData',
  'doUpdatePriceSpecsFormData',
  'doAddPriceSpec',
  'doRemovePriceSpec',
  'doUpdatePriceSpecPrice',
  'doUpdatePriceSpecMinimum',
  'doCreateProduct',
  EditProduct
)
