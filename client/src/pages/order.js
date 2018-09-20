import React from 'react'
import { connect } from 'redux-bundler-react'

import CreateOrderForm from '../components/createOrderForm'

const Order = ({
  doCreateOrder,
  doAddLineItem,
  lineItems,
  products,
  doRemoveLineItem,
  doUpdateLineItemQuantity,
  doUpdateLineItemVariantId
 }) => {
  return (
    <CreateOrderForm
      doCreateOrder={doCreateOrder}
      doAddLineItem={doAddLineItem}
      lineItems={lineItems}
      products={products}
      doRemoveLineItem={doRemoveLineItem}
      doUpdateLineItemQuantity={doUpdateLineItemQuantity}
      doUpdateLineItemVariantId={doUpdateLineItemVariantId}
    />
  )
}

export default connect(
  'doCreateOrder',
  'doAddLineItem',
  'selectLineItems',
  'doRemoveLineItem',
  'doUpdateLineItemQuantity',
  'doUpdateLineItemVariantId',
  Order
)
