import React from 'react'
import { connect } from 'redux-bundler-react'

import SupplierShowProfile from '../components/supplierShowProfile'

const SupplierProfile = ({
  thisSupplier,
  currentUser
 }) => {
  return (
    <SupplierShowProfile
      thisSupplier={thisSupplier}
    />
  )
}

export default connect(
  'selectThisSupplier',
  SupplierProfile
)
