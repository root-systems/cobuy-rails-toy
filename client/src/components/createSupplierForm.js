import React from 'react'
import { Button, TextField } from '@material-ui/core'

import SupplierForm from './supplierForm'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: 20,
  width: 300
}

const buttonStyle = {
  marginTop: 20
}

const headerStyle = {
  textAlign: 'center'
}

const CreateSupplierForm = (props) => {
  const {
    doCreateSupplier,
    doUpdateSupplierNameField,
    supplierNameField,
    currentUser
  } = props

  const handleNameChange = (e) => {
    return doUpdateSupplierNameField(e.target.value)
  }

  const handleSubmit = () => {
    const formData = {
      name: supplierNameField,
      group_id: currentUser.group_id
    }
    return doCreateSupplier(formData)
  }

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Create Supplier</h1>
      <SupplierForm
        submitAction={doCreateSupplier}
        handleNameChange={handleNameChange}
        handleSubmit={handleSubmit}
        currentUser={currentUser}
      />
    </div>
  )
}

export default CreateSupplierForm
