import React from 'react'
import { connect } from 'redux-bundler-react'

import OrdersList from '../components/ordersList'

const MyOrders = ({
  orders
 }) => {
  return (
    <OrdersList
      orders={orders}
    />
  )
}

export default connect(
  'selectOrders',
  MyOrders
)
