import { createAsyncResourceBundle, createSelector } from 'redux-bundler'
import cuid from 'cuid'
import { omit, concat, isNil, find, filter, groupBy } from 'lodash'
import ms from 'milliseconds'

const bundle = createAsyncResourceBundle({
  name: 'lineItems',
  getPromise: async ({ apiFetch, getState }) => {
    const credentials = getState().accounts.credentials
    const sanitizedCredentials = {
      'access-token': credentials.accessToken,
      'token-type': credentials.tokenType,
      client: credentials.client,
      uid: credentials.uid,
      expiry: credentials.expiry
    }
    return apiFetch(`api/v1/line_items`, {
      headers: sanitizedCredentials
    })
      .then(response => response.json())
      .catch(err => {
        console.log('err', err)
        throw new Error({ permanent: true })
      })
  },
  staleAfter: ms.minutes(5),
  retryAfter: ms.minutes(2)
})

const initialState = {
  shouldFetchLineItems: false,
  // needed by createAsyncResourceBundle
  data: null,
  errorTimes: [],
  errorType: null,
  failedPermanently: false,
  isExpired: false,
  isLoading: false,
  isOutdated: false,
  lastSuccess: null
}

const baseReducer = bundle.reducer
bundle.reducer = (state = initialState, action) => {
  if (action.type === 'CREATE_WANTS_SUCCESS') {
    return {
      ...state,
      shouldFetchLineItems: true
    }
  }

  if (action.type === 'LINEITEMS_FETCH_FINISHED') {
    return {
      ...state,
      shouldFetchLineItems: false,
      data: action.payload
    }
  }

  if (action.type === 'CONFIRM_ORDER_SUCCESS') {
    return {
      ...state,
      shouldFetchLineItems: true
    }
  }

  return baseReducer(state, action)
}

bundle.selectLineItems = state => state.lineItems.data
bundle.selectLineItemsForThisOrder = createSelector(
  'selectThisOrderId',
  'selectLineItems',
  (orderId, lineItems) => {
    if (isNil(orderId) || isNil(lineItems)) return null
    return filter(lineItems, (lineItem) => { return lineItem.order_id === orderId })
  }
)
bundle.selectLineItemsForThisOrderByProductId = createSelector(
  'selectLineItemsForThisOrder',
  (lineItems) => {
    return groupBy(lineItems, (lineItem) => { return lineItem.product_id })
  }
)
bundle.selectShouldFetchLineItems = state => state.lineItems.shouldFetchLineItems

bundle.reactLineItemsFetch = createSelector(
  'selectLineItemsShouldUpdate',
  'selectIsSignedIn',
  (shouldUpdate, isSignedIn) => {
    if (shouldUpdate && isSignedIn) {
      return { actionCreator: 'doFetchLineItems' }
    }
    return false
  }
)

bundle.reactFetchLineItemsAfterWantsUpdate = createSelector(
  'selectIsSignedIn',
  'selectShouldFetchLineItems',
  (isSignedIn, shouldFetchLineItems) => {
    if (isSignedIn && shouldFetchLineItems) {
      return { actionCreator: 'doFetchLineItems' }
    }
    return false
  }
)

export default bundle
