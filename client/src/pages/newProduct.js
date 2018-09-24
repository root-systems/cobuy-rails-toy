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
  doUpdateHash,
  doAddPriceSpec,
  doRemovePriceSpec,
  doUpdatePriceSpecPrice,
  doUpdatePriceSpecMinimum,
  priceSpecsFormData
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
      doAddPriceSpec={doAddPriceSpec}
      doRemovePriceSpec={doRemovePriceSpec}
      doUpdatePriceSpecPrice={doUpdatePriceSpecPrice}
      doUpdatePriceSpecMinimum={doUpdatePriceSpecMinimum}
      priceSpecsFormData={priceSpecsFormData}
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
  'doAddPriceSpec',
  'doRemovePriceSpec',
  'doUpdatePriceSpecPrice',
  'doUpdatePriceSpecMinimum',
  'selectPriceSpecsFormData',
  NewProduct
)
