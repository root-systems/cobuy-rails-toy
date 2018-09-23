import React from 'react'
import { isEmpty, isNil } from 'lodash'
import { Card, CardContent, CardActions, Button, CardActionArea, Typography, FormGroup, FormControl, TextField, InputLabel } from '@material-ui/core'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const textStyle = {
  textAlign: 'center'
}

const innerContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10
}

const buttonStyle = {
  marginTop: 20
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

const ProductsList = (props) => {
  const {
    products,
    supplier,
    doAddNewProduct,
    newProducts,
    doRemoveNewProduct,
    doUpdateNewProductName,
    doUpdateNewProductDescription,
    doUpdateNewProductUnit,
    doCreateProduct
  } = props
  if (isNil(supplier)) return null
  const renderProduct = (product) => {
    return (
      <Card key={product.id} style={innerContainerStyle}>
        <CardActionArea>
          <CardContent>
            <Typography variant='headline'>
              {product.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
  const renderProducts = (products) => {
    if (isEmpty(products)) return null
    return products.map(renderProduct)
  }
  return (
    <div style={containerStyle}>
      <h1>{supplier.name}</h1>
      <NewProducts
        newProducts={newProducts}
        doAddNewProduct={doAddNewProduct}
        doRemoveNewProduct={doRemoveNewProduct}
        doUpdateNewProductName={doUpdateNewProductName}
        doUpdateNewProductDescription={doUpdateNewProductDescription}
        doUpdateNewProductUnit={doUpdateNewProductUnit}
        doCreateProduct={doCreateProduct}
        supplier={supplier}
      />
      <h3>Current Products</h3>
      {renderProducts(products)}
    </div>
  )
}

const NewProducts = (props) => {
  const {
    newProducts,
    doAddNewProduct,
    doRemoveNewProduct,
    doUpdateNewProductName,
    doUpdateNewProductDescription,
    doUpdateNewProductUnit,
    doCreateProduct,
    supplier
  } = props

  const handleNewProductNameChange = newProductKey => event => {
    const name = event.target.value
    doUpdateNewProductName({ newProductKey, name })
  }

  const handleNewProductDescriptionChange = newProductKey => event => {
    const description = event.target.value
    doUpdateNewProductDescription({ newProductKey, description })
  }

  const handleNewProductUnitChange = newProductKey => event => {
    const unit = event.target.value
    doUpdateNewProductUnit({ newProductKey, unit })
  }

  const handleSaveNewProduct = newProductKey => {
    const newProduct = newProducts[newProductKey]
    const formData = {
      ...newProduct,
      supplier_id: supplier.id,
      newProductKey: newProductKey
    }
    doCreateProduct(formData)
  }

  const renderNewProducts = (newProductsObject) => {
    return Object.keys(newProductsObject).map(renderNewProduct)
  }

  const renderNewProduct = (newProductKey) => {
    const newProduct = newProducts[newProductKey]
    return (
      <FormGroup style={lineItemContainerStyle} key={newProductKey}>
        <FormControl>
          <TextField
            label={'Name'}
            type='text'
            value={newProduct.name}
            onChange={handleNewProductNameChange(newProductKey)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label={'Description'}
            type='text'
            value={newProduct.description}
            onChange={handleNewProductDescriptionChange(newProductKey)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label={'Base Unit'}
            type='text'
            value={newProduct.unit}
            onChange={handleNewProductUnitChange(newProductKey)}
          />
        </FormControl>
        <Button style={removeButtonStyle} variant='outlined' type='button' onClick={() => { doRemoveNewProduct(newProductKey) }}>Remove</Button>
        <Button style={removeButtonStyle} variant='outlined' type='button' onClick={() => { handleSaveNewProduct(newProductKey) }}>Save</Button>
      </FormGroup>
    )
  }
  return (
    <div>
      {
        !isEmpty(newProducts) ? <h3>New Products</h3> : null
      }
      <form style={formStyle}>
        {renderNewProducts(newProducts)}
      </form>
      <Button
        variant='outlined'
        style={buttonStyle}
        type='button'
        onClick={() => { doAddNewProduct() }}
      >Add new product</Button>
    </div>
  )
}

export default ProductsList
