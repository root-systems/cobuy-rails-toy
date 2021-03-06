import React from 'react'
import { connect } from 'redux-bundler-react'
import { Button } from '@material-ui/core'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

const headerStyle = {
  textAlign: 'center'
}

const navStyle = {
  flexDirection: 'row'
}

const Home = (props) => {
  const {
    doUpdateHash
  } = props
  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Welcome to SimpleGroupBuy</h1>
      <Button variant='outlined' onClick={() => { doUpdateHash('orders/new') }}>Start a New Order</Button>
    </div>
  )
}

export default Home
