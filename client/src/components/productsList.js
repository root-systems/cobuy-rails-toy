import React from 'react'
import { isEmpty, isNil } from 'lodash'
import { Card, CardContent, CardActions, Button, CardActionArea, Typography } from '@material-ui/core'

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

const ProductsList = (props) => {
  const { products, supplier } = props
  if (isNil(supplier)) return null
  const renderProduct = (product) => {
    return (
      <Card key={product.id} style={innerContainerStyle}>
        <CardActionArea>
          <CardContent>
            <Typography variant='headline'>
              ${product.name}
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
      <h1>{supplier.name} Products</h1>
      {renderProducts(products)}
    </div>
  )
}

export default ProductsList
