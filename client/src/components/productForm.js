import React from 'react'
import { isEmpty, isNil } from 'lodash'
import { Card, CardContent, CardActions, Button, CardActionArea, Typography, FormGroup, FormControl, TextField, InputLabel } from '@material-ui/core'

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

const ProductForm = (props) => {
  const {
    newProduct,
    doUpdateNewProductName,
    doUpdateNewProductDescription,
    doUpdateNewProductUnit,
    doCreateProduct,
    supplier,
    doUpdateHash
  } = props

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

  return (
    <div style={containerStyle}>
      <h1>New Product for {supplier.name}</h1>
      <form style={formStyle}>
        <TextField
          label={'Name'}
          type='text'
          value={newProduct.name}
          onChange={handleNewProductNameChange}
        />
        <TextField
          label={'Description'}
          type='text'
          value={newProduct.description}
          onChange={handleNewProductDescriptionChange}
        />
        <TextField
          label={'Base Unit'}
          type='text'
          value={newProduct.unit}
          onChange={handleNewProductUnitChange}
        />
      </form>
      <Button style={removeButtonStyle} variant='outlined' type='button' onClick={() => { handleSaveNewProduct() }}>Save</Button>
      <Button style={removeButtonStyle} variant='outlined' type='button' onClick={() => { doUpdateHash(`suppliers/${supplier.id}/products`) }}>Cancel</Button>
    </div>
  )
}

export default ProductForm
