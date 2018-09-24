import React from 'react'
import { isEmpty, isNil } from 'lodash'
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
    newProduct,
    doUpdateNewProductName,
    doUpdateNewProductDescription,
    doUpdateNewProductUnit,
    doCreateProduct,
    supplier,
    doUpdateHash
  } = props

  console.log('newProduct', newProduct)

  if (isNil(supplier)) return null

  const handleNewProductNameChange = event => {
    const name = event.target.value
    doUpdateNewProductName(name)
  }

  const handleNewProductDescriptionChange = event => {
    const description = event.target.value
    doUpdateNewProductDescription(description)
  }

  const handleNewProductUnitChange = event => {
    const unit = event.target.value
    doUpdateNewProductUnit(unit)
  }

  const handleSaveNewProduct = () => {
    const formData = {
      ...newProduct,
      supplier_id: supplier.id
    }
    doCreateProduct(formData)
  }

  const handleCancel = () => {
    doUpdateHash(`suppliers/${supplier.id}/products`)
  }

  return (
    <div style={containerStyle}>
      <h1>New Product for {supplier.name}</h1>
      <ProductForm
        product={newProduct}
        handleProductNameChange={handleNewProductNameChange}
        handleProductDescriptionChange={handleNewProductDescriptionChange}
        handleProductUnitChange={handleNewProductUnitChange}
        handleSubmit={handleSaveNewProduct}
        handleCancel={handleCancel}
      />
    </div>
  )
}

export default NewProductForm
