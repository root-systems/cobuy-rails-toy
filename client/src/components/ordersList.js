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

const OrdersList = (props) => {
  const { orders } = props
  if (isEmpty(orders)) return null
  const renderOrder = (order) => {
    return (
      <Card key={order.id} style={innerContainerStyle}>
        <CardActionArea href={`${order.order_status_url}`}>
          <CardContent>
            <Typography variant='headline'>
              {`Order ${order.order_number}`}
            </Typography>
            {
              order.fulfillment_status ?
                <Typography color='textSecondary'>
                  {order.fulfillment_status}
                </Typography>
                : null
            }
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
  const renderOrders = (orders) => {
    return orders.map(renderOrder)
  }
  return (
    <div style={containerStyle}>
      <h1>My Orders</h1>
      {renderOrders(orders)}
    </div>
  )
}

export default OrdersList
