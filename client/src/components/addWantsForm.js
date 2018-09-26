import React from 'react'
import { Button, TextField, FormGroup, Select, MenuItem } from '@material-ui/core'
import { isNil, isEmpty, map } from 'lodash'

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
    wantsFormData
  } = props
  if (isNil(order) || isNil(products)) return null

  const handleAddWant = () => {
    doAddWantsContainer()
  }

  const renderWantsContainers = () => {
    if (isEmpty(wantsFormData)) return null
    return Object.keys(wantsFormData).map(renderWantsContainer)
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

  const renderProductSelect = (wantKey) => {
    return (
      <Select value={wantsFormData[wantKey].product_id} onChange={handleProductSelectChange}>
        {renderMenuItems()}
      </Select>
    )
  }

  const renderWantsContainer = (wantKey) => {
    return (
      <FormGroup key={wantKey}>
        {renderProductSelect(wantKey)}
      </FormGroup>
    )
  }

  const handleProductSelectChange = (e) => {
    console.log('product id', e.target.value)
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
      <form>
        {renderWantsContainers()}
      </form>
    </div>
  )
}

export default AddWantsForm
