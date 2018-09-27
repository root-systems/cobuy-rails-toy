import React from 'react'
import { connect } from 'redux-bundler-react'
import { isNil } from 'lodash'

import AddWantsForm from '../components/addWantsForm'

const AddWants = ({
  thisOrder,
  thisOrderProducts,
  doAddWantsContainer,
  wantsFormData,
  doUpdateWantsContainerProductId,
  doUpdateWantQuantity,
  doCreateWants,
  wantsForThisOrder,
  doUpdateWantsFormData,
  wantsForThisOrderForCurrentUser,
  doClearWantsFormData,
  doRemoveWantsContainer
 }) => {
  if (isNil(wantsForThisOrderForCurrentUser) || isNil(thisOrderProducts)) return null
  return (
    <AddWantsForm
      order={thisOrder}
      products={thisOrderProducts}
      doAddWantsContainer={doAddWantsContainer}
      wantsFormData={wantsFormData}
      doUpdateWantsContainerProductId={doUpdateWantsContainerProductId}
      doUpdateWantQuantity={doUpdateWantQuantity}
      doCreateWants={doCreateWants}
      wantsForThisOrder={wantsForThisOrder}
      doUpdateWantsFormData={doUpdateWantsFormData}
      wantsForThisOrderForCurrentUser={wantsForThisOrderForCurrentUser}
      doClearWantsFormData={doClearWantsFormData}
      doRemoveWantsContainer={doRemoveWantsContainer}
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
  'selectWantsForThisOrder',
  'doUpdateWantsFormData',
  'selectWantsForThisOrderForCurrentUser',
  'doClearWantsFormData',
  'doRemoveWantsContainer',
  AddWants
)
