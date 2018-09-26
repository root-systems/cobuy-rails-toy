import React from 'react'
import { Button, TextField, FormGroup, Select, MenuItem, InputLabel } from '@material-ui/core'
import { isNil, isEmpty, map, find } from 'lodash'

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

const AddWantsForm = (props) => {
  const {
    order,
    products,
    doAddWantsContainer,
    wantsFormData,
    doUpdateWantsContainerProductId
  } = props
  if (isNil(order) || isNil(products)) return null

  const handleAddWant = () => {
    doAddWantsContainer()
  }

  const renderMenuItems = () => {
    return map(products, (product) => {
      return (
        <MenuItem value={product.id} key={product.id}>
          {product.name}
        </MenuItem>
      )
    })
  }

  const renderProductSelect = (wantsContainerKey) => {
    const productId = wantsFormData[wantsContainerKey].product_id
    return (
      <div style={containerStyle}>
        <InputLabel shrink={!isNil(productId)}>Product</InputLabel>
        <Select value={productId} onChange={handleProductSelectChange(wantsContainerKey, products, order.id)}>
          {renderMenuItems()}
        </Select>
      </div>
    )
  }

  const renderWantsFields = (wantsContainerKey) => {
    const wantsContainerData = wantsFormData[wantsContainerKey]
    const unit = wantsContainerData.unit
    // GK: TODO: put this description somewhere
    const productDescription = wantsContainerData.description
    return Object.keys(wantsContainerData.wants).map((wantId) => {
      const wantData = wantsContainerData.wants[wantId]
      if (isNil(wantData)) return null
      const priceSpec = wantData.priceSpec
      if (isNil(priceSpec)) return null
      return (
        <div>
          <TextField
            key={wantId}
            label={`At $${priceSpec.price} per ${unit} (minimum ${priceSpec.minimum}), I want`}
            value={wantData.quantity}
          />
        </div>
      )
    })
  }

  const renderWantsContainers = () => {
    if (isEmpty(wantsFormData)) return null
    return Object.keys(wantsFormData).map(renderWantsContainer)
  }

  const renderWantsContainer = (wantsContainerKey) => {
    return (
      <FormGroup key={wantsContainerKey}>
        {renderProductSelect(wantsContainerKey)}
        {renderWantsFields(wantsContainerKey)}
      </FormGroup>
    )
  }

  const handleProductSelectChange = (wantsContainerKey, products, orderId) => (e) => {
    doUpdateWantsContainerProductId(wantsContainerKey, Number(e.target.value), products, orderId)
  }

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Add Wants to Order: {order.name}</h1>
      <Button
        variant='outlined'
        style={buttonStyle}
        type='button'
        onClick={handleAddWant}
      >Add Want</Button>
      <form style={formStyle}>
        {renderWantsContainers()}
      </form>
    </div>
  )
}

export default AddWantsForm
