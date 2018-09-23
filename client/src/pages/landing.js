import React from 'react'
import { connect } from 'redux-bundler-react'
import { Button } from '@material-ui/core'

import SignOutButton from '../components/signOutButton'
import NotificationCard from '../components/notificationCard'

import Order from './order'
import SignIn from './signIn'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

const navStyle = {
  flexDirection: 'row'
}

const Landing = (props) => {
  const { isSignedIn, doSignOut, notifications, doRemoveErrorNotification, route, routeInfo, pathname, doUpdateHash } = props
  const isAcceptingInvitation = routeInfo.pattern === 'accept-invitation'
  const Page = route.component
  if (isAcceptingInvitation) {
    return (
      <div style={containerStyle}>
        <NotificationCard notifications={notifications} doRemoveErrorNotification={doRemoveErrorNotification} />
        <Page {...props} />
      </div>
    )
  } else {
    return (
      <div style={containerStyle}>
        <NotificationCard notifications={notifications} doRemoveErrorNotification={doRemoveErrorNotification} />
        {
          isSignedIn
          ? <div style={containerStyle}>
              <div style={navStyle}>
                <Button onClick={() => { doUpdateHash('order') }}>Create Order</Button>
                <Button onClick={() => { doUpdateHash('orders') }}>My Orders</Button>
                <Button onClick={() => { doUpdateHash('my-profile') }}>My Profile</Button>
                <Button onClick={() => { doUpdateHash('my-group') }}>My Group</Button>
                <Button onClick={() => { doUpdateHash('suppliers') }}>My Suppliers</Button>
                <Button onClick={() => { doUpdateHash('create-invitation') }}>Create Invitation</Button>
                <Button onClick={() => { doUpdateHash('create-supplier') }}>Create Supplier</Button>
                <Button onClick={() => { doSignOut() }}>Sign Out</Button>
              </div>
              <Page {...props} />
            </div>
          : <SignIn />
        }
      </div>
    )
  }
}

export default connect(
  'selectIsSignedIn',
  'doSignOut',
  'selectNotifications',
  'doRemoveErrorNotification',
  'selectRoute',
  'selectRouteInfo',
  'selectPathname',
  'doUpdateHash',
  Landing
)
