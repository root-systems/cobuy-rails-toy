import React from 'react'
import { connect } from 'redux-bundler-react'
import { isNil } from 'lodash'

import EditSupplierForm from '../components/editSupplierForm'

const SupplierProfile = ({
  thisSupplier,
  doUpdateSupplier,
  supplierNameField,
  currentUser,
  doUpdateSupplierNameField
 }) => {
  if (isNil(thisSupplier)) return null
  return (
    <EditSupplierForm
      thisSupplier={thisSupplier}
      doUpdateSupplier={doUpdateSupplier}
      supplierNameField={supplierNameField}
      doUpdateSupplierNameField={doUpdateSupplierNameField}
    />
  )
}

export default connect(
  'selectThisSupplier',
  'doUpdateSupplier',
  'selectSupplierNameField',
  'selectCurrentUser',
  'doUpdateSupplierNameField',
  SupplierProfile
)
