import React from 'react'
import { isEmpty } from 'lodash'
import { Card, CardContent, CardActions, Button, CardActionArea, Typography } from '@material-ui/core'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const textStyle = {
  textAlign: 'center'
}

const innerContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10
}

const SuppliersList = (props) => {
  const { suppliers } = props
  if (isEmpty(suppliers)) return null
  const renderSupplier = (supplier) => {
    return (
      <Card key={supplier.id} style={innerContainerStyle}>
        <CardActionArea
          // href={`${supplier.supplier_status_url}`}
        >
          <CardContent>
            <Typography variant='headline'>
              {supplier.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
  const renderSuppliers = (suppliers) => {
    return suppliers.map(renderSupplier)
  }
  return (
    <div style={containerStyle}>
      <h1>My Suppliers</h1>
      {renderSuppliers(suppliers)}
    </div>
  )
}

export default SuppliersList
