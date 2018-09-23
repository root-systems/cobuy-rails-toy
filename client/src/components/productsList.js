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

const ProductsList = (props) => {
  const {
    products,
    supplier,
    doUpdateHash
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
      <Button style={buttonStyle} variant='outlined' type='button' onClick={() => { doUpdateHash(`suppliers/${supplier.id}/products/new`) }}>Add a new product</Button>
      {renderProducts(products)}
    </div>
  )
}

export default ProductsList
