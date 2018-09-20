import React from 'react'
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, FormGroup } from '@material-ui/core'

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
    lineItems,
    products,
    doAddLineItem,
    doUpdateLineItemVariantId,
    doUpdateLineItemQuantity,
    doRemoveLineItem,
    doCreateOrder
   } = props

  const renderProductMenuItems = () => {
    const renderMenuItem = (product) => {
      return (
        <MenuItem key={product.id} value={product.variants[0].id}>
          {product.title}
        </MenuItem>
      )
    }
    return products.map(renderMenuItem)
  }

  const handleAddLineItem = () => {
    doAddLineItem()
  }

  const handleLineItemVariantIdChange = lineItemKey => event => {
    const variantId = event.target.value
    doUpdateLineItemVariantId({ lineItemKey, variantId })
  }

  const handleLineItemQuantityChange = lineItemKey => event => {
    const quantity = event.target.value
    doUpdateLineItemQuantity({ lineItemKey, quantity })
  }

  const removeLineItem = (lineItemKey) => {
    doRemoveLineItem(lineItemKey)
  }

  const renderLineItem = (lineItemKey) => {
    return (
      <FormGroup style={lineItemContainerStyle} key={lineItemKey}>
        <FormControl>
          <InputLabel>Product</InputLabel>
          <Select value={lineItems[lineItemKey].variantId} onChange={handleLineItemVariantIdChange(lineItemKey)}>
            {renderProductMenuItems()}
          </Select>
        </FormControl>
        <TextField label={'Quantity'} type='number' value={lineItems[lineItemKey].quantity} onChange={handleLineItemQuantityChange(lineItemKey)} />
        <Button style={removeButtonStyle} variant='outlined' type='button' onClick={() => { removeLineItem(lineItemKey) }}>Remove</Button>
      </FormGroup>
    )
  }

  const renderLineItemFields = () => {
    return Object.keys(lineItems).map(renderLineItem)
  }

  const handleSubmit = () => {
    doCreateOrder({ lineItems })
  }

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>New Order</h1>
      <form style={formStyle}>
        {renderLineItemFields()}
        <Button style={addButtonStyle} variant='outlined' type='button' onClick={handleAddLineItem}>Add a line item to your order</Button>
        <Button style={submitButtonStyle} variant='outlined' type='button' onClick={handleSubmit}>Submit your order</Button>
      </form>
    </div>
  )
}

export default CreateOrderForm
