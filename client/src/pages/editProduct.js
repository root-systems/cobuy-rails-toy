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
  doUpdateProduct,
  doUpdateHash,
  doUpdateProductFormData,
  priceSpecsFormData,
  doUpdatePriceSpecsFormData,
  doAddPriceSpec,
  doRemovePriceSpec,
  doUpdatePriceSpecPrice,
  doUpdatePriceSpecMinimum
}) => {
  if (isNil(thisProduct)) return null
  return (
    <EditProductForm
      product={thisProduct}
      productFormData={productFormData}
      doUpdateProductFormDataName={doUpdateProductFormDataName}
      doUpdateProductFormDataDescription={doUpdateProductFormDataDescription}
      doUpdateProductFormDataUnit={doUpdateProductFormDataUnit}
      doUpdateProduct={doUpdateProduct}
      doUpdateHash={doUpdateHash}
      doUpdateProductFormData={doUpdateProductFormData}
      priceSpecsFormData={priceSpecsFormData}
      doUpdatePriceSpecsFormData={doUpdatePriceSpecsFormData}
      doAddPriceSpec={doAddPriceSpec}
      doRemovePriceSpec={doRemovePriceSpec}
      doUpdatePriceSpecPrice={doUpdatePriceSpecPrice}
      doUpdatePriceSpecMinimum={doUpdatePriceSpecMinimum}
    />
  )
}

export default connect(
  'selectProductFormData',
  'doUpdateProductFormDataName',
  'doUpdateProductFormDataDescription',
  'doUpdateProductFormDataUnit',
  'doUpdateProduct',
  'doUpdateHash',
  'doUpdateProductFormData',
  'selectThisProduct',
  'selectPriceSpecsFormData',
  'doUpdatePriceSpecsFormData',
  'doAddPriceSpec',
  'doRemovePriceSpec',
  'doUpdatePriceSpecPrice',
  'doUpdatePriceSpecMinimum',
  EditProduct
)
