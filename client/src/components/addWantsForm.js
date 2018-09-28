import React from 'react'
import { Button, TextField, FormGroup, Select, MenuItem, InputLabel } from '@material-ui/core'
import { isNil, isEmpty, map, find, flattenDeep } from 'lodash'

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

class AddWantsForm extends React.Component {
  componentDidMount () {
    const {
      wantsForThisOrderForCurrentUser,
      doUpdateWantsFormData,
      doClearWantsFormData,
      products
    } = this.props
    if (isEmpty(wantsForThisOrderForCurrentUser)) {
      doClearWantsFormData()
    } else {
      doUpdateWantsFormData({wantsForThisOrderForCurrentUser, products})
    }
  }

  render () {
    const {
      order,
      products,
      doAddWantsContainer,
      wantsFormData,
      doUpdateWantsContainerProductId,
      doUpdateWantQuantity,
      doCreateWants,
      doRemoveWantsContainer,
      wantIdsToBeDisabled
    } = this.props
    if (isNil(order) || isNil(products)) return null

    const handleAddWant = () => {
      doAddWantsContainer()
    }

    const handleRemoveWant = (wantsContainerId) => () => {
      doRemoveWantsContainer(wantsContainerId)
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

    const handleWantQuantityChange = (wantsContainerKey, wantId) => (e) => {
      doUpdateWantQuantity(wantsContainerKey, wantId, e.target.value)
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
          <div key={wantId}>
            <TextField
              key={wantId}
              label={`At $${priceSpec.price} per ${unit} (minimum ${priceSpec.minimum}), I want`}
              value={wantData.quantity}
              type='number'
              onChange={handleWantQuantityChange(wantsContainerKey, wantId)}
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
          <Button
            variant='outlined'
            style={buttonStyle}
            type='button'
            onClick={handleRemoveWant(wantsContainerKey)}
          >Remove Want</Button>
        </FormGroup>
      )
    }

    const handleProductSelectChange = (wantsContainerKey, products, orderId) => (e) => {
      doUpdateWantsContainerProductId(wantsContainerKey, Number(e.target.value), products, orderId)
    }

    const handleSubmit = () => {
      const serializedWants = Object.keys(wantsFormData).map((wantsContainerId) => {
        const wantsContainer = wantsFormData[wantsContainerId]
        return Object.keys(wantsContainer.wants).map((wantId) => {
          const wantData = wantsContainer.wants[wantId]
          return {
            product_id: wantData.product_id,
            price_spec_id: wantData.price_spec_id,
            order_id: wantData.order_id,
            quantity: wantData.quantity
          }
        })
      })
      const formData = {
        wants: flattenDeep(serializedWants),
        old_want_ids: wantIdsToBeDisabled
      }
      doCreateWants(formData)
    }

    return (
      <div style={containerStyle}>
        <h1 style={headerStyle}>Add Wants to Order: {order.name}</h1>
        <form style={formStyle}>
          {renderWantsContainers()}
        </form>
        <Button
          variant='outlined'
          style={buttonStyle}
          type='button'
          onClick={handleAddWant}
        >Add Want</Button>
        <Button
          variant='outlined'
          style={buttonStyle}
          type='button'
          onClick={handleSubmit}
        >Save Wants to Order</Button>
      </div>
    )
  }
}

export default AddWantsForm
