import React from 'react'
import { connect } from 'redux-bundler-react'

import CreateSupplierForm from '../components/createSupplierForm'

const CreateSupplier = ({
  doCreateSupplier,
  doUpdateSupplierNameField,
  supplierNameField,
  currentUser
 }) => {
  return (
    <CreateSupplierForm
      doCreateSupplier={doCreateSupplier}
      doUpdateSupplierNameField={doUpdateSupplierNameField}
      supplierNameField={supplierNameField}
      currentUser={currentUser}
    />
  )
}

export default connect(
  'doCreateSupplier',
  'doUpdateSupplierNameField',
  'selectSupplierNameField',
  'selectCurrentUser',
  CreateSupplier
)
