import React from 'react'
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, FormGroup } from '@material-ui/core'
import { isNil, map, isEmpty, find } from 'lodash'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const OrderDetails = ({
  lineItemsByProductId,
  products,
  orderId,
  doUpdateHash,
  doConfirmOrder,
  order
}) => {
  if (isNil(lineItemsByProductId) || isNil(products)) return null

  const renderLineItems = (lineItems, product) => {
    return map(lineItems, (lineItem) => {
      const priceSpec = find(product.price_specs, (priceSpec) => { return priceSpec.id === lineItem.price_spec_id })
      return (
        <p>{`${lineItem.quantity} ${product.unit} wanted at $${lineItem.price_per_unit} per ${product.unit} (minimum of ${priceSpec.minimum} required)`}</p>
      )
    })
  }

  const renderLineItemsByProduct = () => {
    if (isEmpty(lineItemsByProductId)) return null
    return Object.keys(lineItemsByProductId).map((productId) => {
      const product = find(products, { 'id': Number(productId) })
      return (
        <div>
          <h3>{product.name}</h3>
          {renderLineItems(lineItemsByProductId[productId], product)}
        </div>
      )
    })
  }

  return (
    <div style={containerStyle}>
      <h1>Order Details: {order.name}</h1>
      <Button variant='outlined' onClick={() => { doUpdateHash(`orders/${orderId}/wants`) }}>Add/Edit my Wants</Button>
      {renderLineItemsByProduct()}
      <Button variant='outlined' onClick={() => { doConfirmOrder(orderId) }}>Confirm & Close Order</Button>
    </div>
  )
}

export default OrderDetails
