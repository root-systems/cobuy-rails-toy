import React from 'react'
import { connect } from 'redux-bundler-react'

import AddWantsForm from '../components/addWantsForm'

const AddWants = ({
  thisOrder,
  thisOrderProducts,
  doAddWantsContainer,
  wantsFormData,
  doUpdateWantsContainerProductId,
  doUpdateWantQuantity,
  doCreateWants
 }) => {
  return (
    <AddWantsForm
      order={thisOrder}
      products={thisOrderProducts}
      doAddWantsContainer={doAddWantsContainer}
      wantsFormData={wantsFormData}
      doUpdateWantsContainerProductId={doUpdateWantsContainerProductId}
      doUpdateWantQuantity={doUpdateWantQuantity}
      doCreateWants={doCreateWants}
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
  'doCreateWants',
  AddWants
)
