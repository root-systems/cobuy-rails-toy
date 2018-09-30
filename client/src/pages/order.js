import React from 'react'
import { connect } from 'redux-bundler-react'

import OrderDetails from '../components/orderDetails'

const Order = ({
  lineItemsForThisOrderByProductId,
  thisOrderProducts,
  thisOrderId,
  doUpdateHash,
  thisOrder,
  doConfirmOrder
 }) => {
  return (
    <OrderDetails
      lineItemsByProductId={lineItemsForThisOrderByProductId}
      products={thisOrderProducts}
      doUpdateHash={doUpdateHash}
      orderId={thisOrderId}
      doConfirmOrder={doConfirmOrder}
      order={thisOrder}
    />
  )
}

export default connect(
  'selectLineItemsForThisOrderByProductId',
  'selectThisOrderProducts',
  'doUpdateHash',
  'selectThisOrderId',
  'selectThisOrder',
  'doConfirmOrder',
  Order
)
