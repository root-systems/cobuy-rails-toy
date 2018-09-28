import React from 'react'
import { connect } from 'redux-bundler-react'

import OrderDetails from '../components/orderDetails'

const Order = ({
  lineItemsForThisOrderByProductId,
  products
 }) => {
  return (
    <OrderDetails
      lineItemsByProductId={lineItemsForThisOrderByProductId}
      products={products}
    />
  )
}

export default connect(
  'selectLineItemsForThisOrderByProductId',
  'selectThisOrderProducts',
  Order
)
