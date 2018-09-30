import React from 'react'
import { connect } from 'redux-bundler-react'

import OrderConfirmationDetails from '../components/orderConfirmationDetails'

const OrderConfirmation = ({
  confirmedLineItemsForThisOrder,
  thisOrderProducts,
  thisOrderId,
  doUpdateHash,
  thisOrder,
 }) => {
  return (
    <OrderConfirmationDetails
      lineItems={confirmedLineItemsForThisOrder}
      products={thisOrderProducts}
      doUpdateHash={doUpdateHash}
      orderId={thisOrderId}
      order={thisOrder}
    />
  )
}

export default connect(
  'selectConfirmedLineItemsForThisOrder',
  'selectThisOrderProducts',
  'doUpdateHash',
  'selectThisOrderId',
  'selectThisOrder',
  'doConfirmOrder',
  OrderConfirmation
)
