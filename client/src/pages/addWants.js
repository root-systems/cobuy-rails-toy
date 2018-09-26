import React from 'react'
import { connect } from 'redux-bundler-react'

import AddWantsForm from '../components/addWantsForm'

const AddWants = ({
  thisOrder,
  thisOrderProducts,
  doAddWantsContainer,
  wantsFormData,
  doUpdateWantsContainerProductId
 }) => {
  return (
    <AddWantsForm
      order={thisOrder}
      products={thisOrderProducts}
      doAddWantsContainer={doAddWantsContainer}
      wantsFormData={wantsFormData}
      doUpdateWantsContainerProductId={doUpdateWantsContainerProductId}
    />
  )
}

export default connect(
  'selectThisOrder',
  'selectThisOrderProducts',
  'doAddWantsContainer',
  'selectWantsFormData',
  'doUpdateWantsContainerProductId',
  AddWants
)
