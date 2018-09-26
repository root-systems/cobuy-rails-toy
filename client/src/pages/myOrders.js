import React from 'react'
import { connect } from 'redux-bundler-react'

import OrdersList from '../components/ordersList'

const MyOrders = ({
  orders,
  doUpdateHash
 }) => {
  return (
    <OrdersList
      orders={orders}
      doUpdateHash={doUpdateHash}
    />
  )
}

export default connect(
  'selectOrders',
  'doUpdateHash',
  MyOrders
)
