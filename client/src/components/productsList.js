import React from 'react'
import { isEmpty } from 'lodash'
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
  const { products } = props
  if (isEmpty(products)) return null
  const renderProduct = (product) => {
    return (
      <Card key={product.id} style={innerContainerStyle}>
        <CardActionArea>
          <CardContent>
            <Typography variant='headline'>
              {`Products ${product.name}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
  const renderProducts = (products) => {
    return products.map(renderProduct)
  }
  return (
    <div style={containerStyle}>
      <h1>Supplier Products</h1>
      {renderProducts(products)}
    </div>
  )
}

export default ProductsList
