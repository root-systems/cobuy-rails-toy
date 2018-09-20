import React from 'react'
import { Button, TextField } from '@material-ui/core'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const headerStyle = {
  textAlign: 'center'
}

const SupplierShowProfile = (props) => {
  const {
    thisSupplier
  } = props
  if (!thisSupplier) return null
  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Supplier Profile for {thisSupplier.name}</h1>
    </div>
  )
}

export default SupplierShowProfile
