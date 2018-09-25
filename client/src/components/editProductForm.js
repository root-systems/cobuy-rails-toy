import React from 'react'
import { isEmpty, isNil, keyBy, values } from 'lodash'
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
      doUpdatePriceSpecsFormData,
      product
    } = this.props
    const priceSpecs = product.price_specs
    doUpdateProductFormData(product)
    if (isNil(priceSpecs)) return
    const priceSpecsById = keyBy(product.price_specs, 'id')
    doUpdatePriceSpecsFormData(priceSpecsById)
  }

  render () {
    const {
      product,
      productFormData,
      doUpdateProductFormDataName,
      doUpdateProductFormDataDescription,
      doUpdateProductFormDataUnit,
      doUpdateHash,
      priceSpecsFormData,
      doAddPriceSpec,
      doRemovePriceSpec,
      doUpdatePriceSpecPrice,
      doUpdatePriceSpecMinimum,
      doCreateProduct
    } = this.props

    if (isNil(product)) return null

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
        previous_version_id: product.id,
        price_specs_attributes: values(priceSpecsFormData)
      }
      doCreateProduct(formData)
    }

    const handleCancel = () => {
      doUpdateHash(`suppliers/${product.supplier_id}/products`)
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
          handleAddPriceSpec={handleAddPriceSpec}
          handlePriceSpecPriceChange={handlePriceSpecPriceChange}
          handlePriceSpecMinimumChange={handlePriceSpecMinimumChange}
          handleRemovePriceSpec={handleRemovePriceSpec}
        />
      </div>
    )
  }
}

export default EditProductForm
