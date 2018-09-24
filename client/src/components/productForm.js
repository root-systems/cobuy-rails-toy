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

const removeButtonStyle = {
  marginTop: 10
}

const ProductForm = (props) => {
  const {
    product,
    handleProductNameChange,
    handleProductDescriptionChange,
    handleProductUnitChange,
    handleSubmit,
    handleCancel,
    handleAddPriceSpec,
    handlePriceSpecPriceChange,
    handlePriceSpecMinimumChange,
    handleRemovePriceSpec,
    priceSpecsFormData
  } = props

  const renderPriceSpecs = () => {
    return Object.keys(priceSpecsFormData).map(renderPriceSpec)
  }

  const renderPriceSpec = (priceSpecKey) => {
    return (
      <FormGroup key={priceSpecKey}>
        <TextField
          label={'Price'}
          type='number'
          value={priceSpecsFormData[priceSpecKey].price}
          onChange={handlePriceSpecPriceChange(priceSpecKey)}
        />
        <TextField
          label={'Minimum Quantity'}
          type='number'
          value={priceSpecsFormData[priceSpecKey].minimum}
          onChange={handlePriceSpecMinimumChange(priceSpecKey)}
        />
        <Button style={removeButtonStyle} variant='outlined' type='button' onClick={() => { handleRemovePriceSpec(priceSpecKey) }}>Remove</Button>
      </FormGroup>
    )
  }

  return (
    <div>
      <form style={formStyle}>
        <TextField
          label={'Name'}
          type='text'
          value={product.name}
          onChange={handleProductNameChange}
        />
        <TextField
          label={'Description'}
          type='text'
          value={product.description}
          onChange={handleProductDescriptionChange}
        />
        <TextField
          label={'Base Unit'}
          type='text'
          value={product.unit}
          onChange={handleProductUnitChange}
        />
        {renderPriceSpecs()}
        <Button style={removeButtonStyle} variant='outlined' type='button' onClick={handleAddPriceSpec}>Add Price Spec</Button>
      </form>
      <Button style={removeButtonStyle} variant='outlined' type='button' onClick={handleSubmit}>Save</Button>
      <Button style={removeButtonStyle} variant='outlined' type='button' onClick={handleCancel}>Cancel</Button>
    </div>
  )
}

export default ProductForm
