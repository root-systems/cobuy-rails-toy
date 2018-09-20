import { createRouteBundle } from 'redux-bundler'

import Landing from '../pages/landing'
import SignIn from '../pages/signIn'
import Order from '../pages/order'
import MyOrders from '../pages/myOrders'
import Profile from '../pages/profile'
import AcceptInvitation from '../pages/acceptInvitation'
import CreateInvitation from '../pages/createInvitation'
import CreateSupplier from '../pages/createSupplier'

const routes = {
  '': {
    component: Order,
    protected: true
  },
  '/': {
    component: Order,
    protected: true
  },
  'sign-in': {
    component: SignIn,
    protected: false
  },
  'order': {
    component: Order,
    protected: true
  },
  'my-orders': {
    component: MyOrders,
    protected: true
  },
  'my-profile': {
    component: Profile,
    protected: true
  },
  'accept-invitation': {
    component: AcceptInvitation,
    protected: true
  },
  'create-invitation': {
    component: CreateInvitation,
    protected: true
  },
  'create-supplier': {
    component: CreateSupplier,
    protected: true
  },
  '*': {
    component: Order,
    protected: false
  }

}

export default createRouteBundle({
  ...routes
}, {
  routeInfoSelector: 'selectHash'
})
