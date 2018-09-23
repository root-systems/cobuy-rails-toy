import { createAsyncResourceBundle, createSelector } from 'redux-bundler'
import cuid from 'cuid'
import { omit, concat } from 'lodash'
import ms from 'milliseconds'

const bundle = createAsyncResourceBundle({
  name: 'orders',
  getPromise: async ({ apiFetch, getState }) => {
    const credentials = getState().accounts.credentials
    const sanitizedCredentials = {
      'access-token': credentials.accessToken,
      'token-type': credentials.tokenType,
      client: credentials.client,
      uid: credentials.uid,
      expiry: credentials.expiry
    }
    return apiFetch(`/orders?shop=${window.location.hostname}`, {
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
  lineItems: {},
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
  if (action.type === 'ADD_LINE_ITEM') {
    const nextId = cuid()
    return {
      ...state,
      lineItems: {
        ...state.lineItems,
        [nextId]: {
          variantId: '',
          quantity: ''
        }
      }
    }
  }

  if (action.type === 'UPDATE_LINE_ITEM_VARIANT_ID') {
    return {
      ...state,
      lineItems: {
        ...state.lineItems,
        [action.payload.lineItemKey]: {
          variantId: action.payload.variantId,
          quantity: state.lineItems[action.payload.lineItemKey].quantity
        }
      }
    }
  }
  if (action.type === 'UPDATE_LINE_ITEM_QUANTITY') {
    return {
      ...state,
      lineItems: {
        ...state.lineItems,
        [action.payload.lineItemKey]: {
          variantId: state.lineItems[action.payload.lineItemKey].variantId,
          quantity: action.payload.quantity
        }
      }
    }
  }
  if (action.type === 'REMOVE_LINE_ITEM') {
    return {
      ...state,
      lineItems: omit(state.lineItems, action.payload)
    }
  }
  if (action.type === 'CREATE_ORDER_SUCCESS') {
    return {
      ...state,
      lineItems: {},
      data: concat(state.data, action.payload)
    }
  }

  return baseReducer(state, action)
}

bundle.selectLineItems = state => state.orders.lineItems

bundle.selectOrders = (state) => state.orders.data

bundle.doAddLineItem = () => ({ dispatch }) => {
  dispatch({ type: 'ADD_LINE_ITEM' })
}

bundle.doUpdateLineItemVariantId = (lineItemKeyAndValue) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_LINE_ITEM_VARIANT_ID', payload: lineItemKeyAndValue })
}

bundle.doUpdateLineItemQuantity = (lineItemKeyAndValue) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_LINE_ITEM_QUANTITY', payload: lineItemKeyAndValue })
}

bundle.doRemoveLineItem = (lineItemKey) => ({ dispatch }) => {
  dispatch({ type: 'REMOVE_LINE_ITEM', payload: lineItemKey })
}

bundle.doCreateOrder = ({ lineItems }) => ({ dispatch, apiFetch, getState }) => {
  const credentials = getState().accounts.credentials
  const sanitizedCredentials = {
    'access-token': credentials.accessToken,
    'token-type': credentials.tokenType,
    client: credentials.client,
    uid: credentials.uid,
    expiry: credentials.expiry
  }
  const shopifyDomain = window.location.hostname
  const lineItemsArray = Object.keys(lineItems).map(lineItemKey => lineItems[lineItemKey])
  const order = {
    order: lineItemsArray,
    shop: shopifyDomain
  }
  dispatch({ type: 'CREATE_ORDER_START' })
  apiFetch('/orders/create', {
    method: 'POST',
    body: JSON.stringify(order),
    headers: sanitizedCredentials
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(`${response.status} ${response.statusText}`))
      }
      return response.json()
    })
    .then((data) => {
      dispatch({ type: 'CREATE_ORDER_SUCCESS', payload: data })
    })
    .catch((error) => {
      dispatch({ type: 'CREATE_ORDER_ERROR', payload: error })
    })
}

// bundle.reactOrdersFetch = createSelector(
//   'selectOrdersShouldUpdate',
//   'selectIsSignedIn',
//   (shouldUpdate, isSignedIn) => {
//     if (shouldUpdate && isSignedIn) {
//       return { actionCreator: 'doFetchOrders' }
//     }
//     return false
//   }
// )

export default bundle
