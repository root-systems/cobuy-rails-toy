import React from 'react'
import { connect } from 'redux-bundler-react'

import CreateOrderForm from '../components/createOrderForm'

const CreateOrder = ({
  doCreateOrder,
  orderFormData,
  doUpdateOrderFormDataSupplierId,
  suppliers,
  doUpdateOrderFormDataName,
  currentUser
 }) => {
  return (
    <CreateOrderForm
      doCreateOrder={doCreateOrder}
      orderFormData={orderFormData}
      doUpdateOrderFormDataSupplierId={doUpdateOrderFormDataSupplierId}
      suppliers={suppliers}
      doUpdateOrderFormDataName={doUpdateOrderFormDataName}
      currentUser={currentUser}
    />
  )
}

export default connect(
  'doCreateOrder',
  'selectOrderFormData',
  'doUpdateOrderFormDataSupplierId',
  'selectSuppliers',
  'doUpdateOrderFormDataName',
  'selectCurrentUser',
  CreateOrder
)
