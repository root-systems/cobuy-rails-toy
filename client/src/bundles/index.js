import { composeBundles, debugBundle, createUrlBundle } from 'redux-bundler'

import accountsBundle from './accounts'
import ordersBundle from './orders'
import notificationsBundle from './notifications'
import myProfileBundle from './myProfile'
import invitationsBundle from './invitations'

import routes from './routes'

import extraArgs from './extra-args'

export default composeBundles(
  accountsBundle,
  ordersBundle,
  notificationsBundle,
  myProfileBundle,
  invitationsBundle,
  createUrlBundle(),
  debugBundle,
  extraArgs,
  routes
)