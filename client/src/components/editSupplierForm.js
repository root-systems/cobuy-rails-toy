import React from 'react'
import { Button, TextField } from '@material-ui/core'

import SupplierForm from './supplierForm'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const headerStyle = {
  textAlign: 'center'
}

const buttonStyle = {
  marginTop: 20
}

class EditSupplierForm extends React.Component {
  componentDidMount () {
    const { doUpdateSupplierNameField, thisSupplier } = this.props
    doUpdateSupplierNameField(thisSupplier.name)
  }

  render () {
    const {
      thisSupplier,
      supplierNameField,
      doUpdateSupplier,
      currentUser,
      doUpdateSupplierNameField,
      doUpdateHash
    } = this.props
    if (!thisSupplier) return null

    const handleSubmit = () => {
      const formData = {
        id: thisSupplier.id,
        name: supplierNameField
      }
      doUpdateSupplier(formData)
    }

    const handleNameChange = (e) => {
      doUpdateSupplierNameField(e.target.value)
    }

    return (
      <div style={containerStyle}>
        <h1 style={headerStyle}>Supplier Profile for {thisSupplier.name}</h1>
        <SupplierForm
          nameFieldValue={supplierNameField}
          handleSubmit={handleSubmit}
          handleNameChange={handleNameChange}
        />
        <Button
          variant='outlined'
          style={buttonStyle}
          type='button'
          onClick={() => { doUpdateHash(`suppliers/${thisSupplier.id}/products`) }}
        >View/Edit Products</Button>
      </div>
    )
  }
}

export default EditSupplierForm
