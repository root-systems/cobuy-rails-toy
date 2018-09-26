import React from 'react'
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, FormGroup } from '@material-ui/core'
import { isNil } from 'lodash'

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

const headerStyle = {
  textAlign: 'center'
}

const addButtonStyle = {
  marginTop: 30
}

const removeButtonStyle = {
  marginTop: 10
}

const submitButtonStyle = {
  marginTop: 20
}

const lineItemContainerStyle = {
  marginTop: 20
}

const CreateOrderForm = props => {
  const {
    suppliers,
    doCreateOrder,
    doUpdateOrderFormDataSupplierId,
    orderFormData,
    doUpdateOrderFormDataName,
    currentUser
   } = props

  if (isNil(suppliers)) return null
  if (isNil(currentUser.group_id)) return null

  const renderSupplierMenuItems = () => {
    const renderMenuItem = (supplier) => {
      return (
        <MenuItem key={supplier.id} value={supplier.id}>
          {supplier.name}
        </MenuItem>
      )
    }
    return suppliers.map(renderMenuItem)
  }

  const handleSupplierIdChange = (e) => {
    doUpdateOrderFormDataSupplierId(e.target.value)
  }

  const handleNameChange = (e) => {
    doUpdateOrderFormDataName(e.target.value)
  }

  const handleSubmit = () => {
    const formData = {
      ...orderFormData,
      group_id: currentUser.group_id
    }
    doCreateOrder(formData)
  }

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>New Order</h1>
      <form style={formStyle}>
        <TextField
          label={'Order Name'}
          type='text'
          value={orderFormData.name}
          onChange={handleNameChange}
        />
        <FormControl>
          <InputLabel shrink={orderFormData.supplier_id}>Supplier</InputLabel>
          <Select value={orderFormData.supplier_id} onChange={handleSupplierIdChange}>
            {renderSupplierMenuItems()}
          </Select>
        </FormControl>
        <Button style={submitButtonStyle} variant='outlined' type='button' onClick={handleSubmit}>Start your order</Button>
      </form>
    </div>
  )
}

export default CreateOrderForm
