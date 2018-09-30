import React from 'react'
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, FormGroup } from '@material-ui/core'
import { isNil, map, isEmpty, find } from 'lodash'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const OrderConfirmationDetails = ({
  lineItems,
  products,
  orderId,
  doUpdateHash,
  order
}) => {
  if (isNil(lineItems) || isNil(products)) return null

  const renderConfirmedLineItems = () => {
    if (isEmpty(lineItems)) return null
    return map(lineItems, (lineItem) => {
      const product = find(products, { 'id': lineItem.product_id })
      const priceSpec = find(product.price_specs, (priceSpec) => { return priceSpec.id === lineItem.price_spec_id })
      return (
        <div key={lineItem.id}>
          <h3>{product.name}</h3>
          <p>{`${lineItem.quantity} ${product.unit} wanted at $${lineItem.price_per_unit} per ${product.unit} (minimum of ${priceSpec.minimum} required)`}</p>
        </div>
      )
    })
  }

  return (
    <div style={containerStyle}>
      <h1>Order Confirmation: {order.name}</h1>
      {renderConfirmedLineItems()}
      <Button variant='outlined' onClick={() => { doUpdateHash(`orders/${orderId}`) }}>Back to Order Details</Button>
    </div>
  )
}

export default OrderConfirmationDetails
