import React from 'react'
import { isEmpty, isNil, values } from 'lodash'
import { Card, CardContent, CardActions, Button, CardActionArea, Typography, FormGroup, FormControl, TextField, InputLabel } from '@material-ui/core'

import ProductForm from './productForm'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: 20,
  width: 300
}

const lineItemContainerStyle = {
  marginTop: 20
}

const removeButtonStyle = {
  marginTop: 10
}

const NewProductForm = (props) => {
  const {
    supplier,
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
  } = props

  if (isNil(supplier)) return null

  console.log('productFormData', productFormData)
  console.log('priceSpecsFormData', priceSpecsFormData)

  const handleNewProductNameChange = event => {
    const name = event.target.value
    doUpdateProductFormDataName(name)
  }

  const handleNewProductDescriptionChange = event => {
    const description = event.target.value
    doUpdateProductFormDataDescription(description)
  }

  const handleNewProductUnitChange = event => {
    const unit = event.target.value
    doUpdateProductFormDataUnit(unit)
  }

  const handleSaveNewProduct = () => {
    const formData = {
      ...productFormData,
      supplier_id: supplier.id,
      price_specs_attributes: values(priceSpecsFormData)
    }
    doCreateProduct(formData)
  }

  const handleAddPriceSpec = () => {
    doAddPriceSpec()
  }

  const handleRemovePriceSpec = (priceSpecKey) => {
    doRemovePriceSpec(priceSpecKey)
  }

  const handlePriceSpecPriceChange = priceSpecKey => event => {
    const price = event.target.value
    doUpdatePriceSpecPrice({ priceSpecKey, price })
  }

  const handlePriceSpecMinimumChange = priceSpecKey => event => {
    const minimum = event.target.value
    doUpdatePriceSpecMinimum({ priceSpecKey, minimum })
  }

  const handleCancel = () => {
    doUpdateHash(`suppliers/${supplier.id}/products`)
  }

  return (
    <div style={containerStyle}>
      <h1>New Product for {supplier.name}</h1>
      <ProductForm
        product={productFormData}
        handleProductNameChange={handleNewProductNameChange}
        handleProductDescriptionChange={handleNewProductDescriptionChange}
        handleProductUnitChange={handleNewProductUnitChange}
        handleSubmit={handleSaveNewProduct}
        handleCancel={handleCancel}
        handleAddPriceSpec={handleAddPriceSpec}
        handlePriceSpecPriceChange={handlePriceSpecPriceChange}
        handlePriceSpecMinimumChange={handlePriceSpecMinimumChange}
        handleRemovePriceSpec={handleRemovePriceSpec}
        priceSpecsFormData={priceSpecsFormData}
      />
    </div>
  )
}

export default NewProductForm
