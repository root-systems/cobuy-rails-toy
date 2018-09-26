import React from 'react'
import { connect } from 'redux-bundler-react'

import AddWantsForm from '../components/addWantsForm'

const AddWants = ({
  thisOrder,
  thisOrderProducts,
  doAddWantsContainer,
  wantsFormData,
  doUpdateWantsContainerProductId,
  doUpdateWantQuantity
 }) => {
  return (
    <AddWantsForm
      order={thisOrder}
      products={thisOrderProducts}
      doAddWantsContainer={doAddWantsContainer}
      wantsFormData={wantsFormData}
      doUpdateWantsContainerProductId={doUpdateWantsContainerProductId}
      doUpdateWantQuantity={doUpdateWantQuantity}
    />
  )
}

export default connect(
  'selectThisOrder',
  'selectThisOrderProducts',
  'doAddWantsContainer',
  'selectWantsFormData',
  'doUpdateWantsContainerProductId',
  'doUpdateWantQuantity',
  AddWants
)
