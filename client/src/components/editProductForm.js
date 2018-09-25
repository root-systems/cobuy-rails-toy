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

class EditProductForm extends React.Component {
  componentDidMount () {
    const {
      doUpdateProductFormData,
      product
    } = this.props
    doUpdateProductFormData(product)
  }

  render () {
    const {
      product,
      productFormData,
      doUpdateProductFormDataName,
      doUpdateProductFormDataDescription,
      doUpdateProductFormDataUnit,
      doUpdateProduct,
      doUpdateHash,
      priceSpecsFormData
    } = this.props

    if (isNil(product)) return null

    const supplier = product.supplier_id

    const handleProductNameChange = event => {
      const name = event.target.value
      doUpdateProductFormDataName(name)
    }

    const handleProductDescriptionChange = event => {
      const description = event.target.value
      doUpdateProductFormDataDescription(description)
    }

    const handleProductUnitChange = event => {
      const unit = event.target.value
      doUpdateProductFormDataUnit(unit)
    }

    const handleSaveUpdatedProduct = () => {
      const formData = {
        ...productFormData,
        supplier_id: supplier.id
      }
      doUpdateProduct(formData)
    }

    const handleCancel = () => {
      doUpdateHash(`suppliers/${product.supplier_id}/products`)
    }

    return (
      <div style={containerStyle}>
        <h1>{product.name}</h1>
        <ProductForm
          product={productFormData}
          handleProductNameChange={handleProductNameChange}
          handleProductDescriptionChange={handleProductDescriptionChange}
          handleProductUnitChange={handleProductUnitChange}
          handleSubmit={handleSaveUpdatedProduct}
          handleCancel={handleCancel}
          priceSpecsFormData={priceSpecsFormData}
        />
      </div>
    )
  }
}

export default EditProductForm
