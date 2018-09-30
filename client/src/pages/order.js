import React from 'react'
import { connect } from 'redux-bundler-react'

import OrderDetails from '../components/orderDetails'

const Order = ({
  lineItemsForThisOrderByProductId,
  thisOrderProducts,
  thisOrderId,
  doUpdateHash
 }) => {
  return (
    <OrderDetails
      lineItemsByProductId={lineItemsForThisOrderByProductId}
      products={thisOrderProducts}
      doUpdateHash={doUpdateHash}
      orderId={thisOrderId}
    />
  )
}

export default connect(
  'selectLineItemsForThisOrderByProductId',
  'selectThisOrderProducts',
  'doUpdateHash',
  'selectThisOrderId',
  Order
)
