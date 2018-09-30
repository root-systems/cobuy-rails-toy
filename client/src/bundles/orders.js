import { createAsyncResourceBundle, createSelector } from 'redux-bundler'
import cuid from 'cuid'
import { omit, concat, isNil, find, filter } from 'lodash'
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
    return apiFetch(`api/v1/orders`, {
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
  orderFormData: {
    supplier_id: null,
    name: ''
  },
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

  if (action.type === 'UPDATE_ORDER_FORM_DATA_SUPPLIER_ID') {
    return {
      ...state,
      orderFormData: {
        ...state.orderFormData,
        supplier_id: action.payload
      }
    }
  }

  if (action.type === 'UPDATE_ORDER_FORM_DATA_NAME') {
    return {
      ...state,
      orderFormData: {
        ...state.orderFormData,
        name: action.payload
      }
    }
  }

  if (action.type === 'CREATE_ORDER_SUCCESS') {
    return {
      ...state,
      orderFormData: {
        supplier_id: null,
        name: ''
      },
      data: concat(state.data, action.payload)
    }
  }

  return baseReducer(state, action)
}

bundle.selectOrderFormData = state => state.orders.orderFormData
bundle.selectOrders = (state) => state.orders.data
bundle.selectIsCreateOrderRoute = createSelector(
  'selectHash',
  (urlHash) => {
    return urlHash === 'orders/new'
  }
)

bundle.selectThisOrderId = createSelector(
  'selectHash',
  (urlHash) => {
    const urlHashArray = urlHash.split('/')
    const path = urlHashArray[0]
    if (path !== 'orders') return null
    const orderId = urlHashArray[1]
    return Number(orderId)
  }
)
bundle.selectThisOrder = createSelector(
  'selectThisOrderId',
  'selectOrders',
  (orderId, orders) => {
    if (isNil(orderId) || isNil(orders)) return null
    const order = find(orders, { 'id': orderId })
    return order
  }
)
bundle.selectThisOrderProducts = createSelector(
  'selectThisOrder',
  'selectProducts',
  (order, products) => {
    if (isNil(order) || isNil(products)) return null
    return filter(products, (product) => { return product.supplier_id === order.supplier_id })
  }
)

bundle.doUpdateOrderFormDataSupplierId = (supplierId) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_ORDER_FORM_DATA_SUPPLIER_ID', payload: supplierId })
}

bundle.doUpdateOrderFormDataName = (name) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_ORDER_FORM_DATA_NAME', payload: name })
}

bundle.doCreateOrder = (formData) => ({ dispatch, apiFetch, getState }) => {
  const credentials = getState().accounts.credentials
  const sanitizedCredentials = {
    'access-token': credentials.accessToken,
    'token-type': credentials.tokenType,
    client: credentials.client,
    uid: credentials.uid,
    expiry: credentials.expiry
  }
  dispatch({ type: 'CREATE_ORDER_START' })
  apiFetch('api/v1/orders', {
    method: 'POST',
    body: JSON.stringify(formData),
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
      dispatch({ actionCreator: 'doUpdateHash', args: [`orders`] })
    })
    .catch((error) => {
      dispatch({ type: 'CREATE_ORDER_ERROR', payload: error })
    })
}

bundle.doConfirmOrder = (orderId) => ({ dispatch, apiFetch, getState }) => {
  const formData = {
    id: orderId
  }
  const credentials = getState().accounts.credentials
  const sanitizedCredentials = {
    'access-token': credentials.accessToken,
    'token-type': credentials.tokenType,
    client: credentials.client,
    uid: credentials.uid,
    expiry: credentials.expiry
  }
  dispatch({ type: 'CONFIRM_ORDER_START' })
  apiFetch(`api/v1/orders/${orderId}/confirm`, {
    method: 'PATCH',
    body: JSON.stringify(formData),
    headers: sanitizedCredentials
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(`${response.status} ${response.statusText}`))
      }
      return response.json()
    })
    .then((data) => {
      dispatch({ type: 'CONFIRM_ORDER_SUCCESS', payload: data })
      dispatch({ actionCreator: 'doUpdateHash', args: [`orders`] })
    })
    .catch((error) => {
      dispatch({ type: 'CONFIRM_ORDER_ERROR', payload: error })
    })
}

bundle.reactOrdersFetch = createSelector(
  'selectOrdersShouldUpdate',
  'selectIsSignedIn',
  (shouldUpdate, isSignedIn) => {
    if (shouldUpdate && isSignedIn) {
      return { actionCreator: 'doFetchOrders' }
    }
    return false
  }
)

bundle.reactTryingtoCreateOrderButHasNoGroupSoRedirect = createSelector(
  'selectIsSignedIn', // should be true
  'selectIsCreateOrderRoute', // should be true
  'selectMyProfileShouldUpdate', // should be false
  'selectHasCurrentUser', // should be true
  'selectCurrentUserHasGroup', // should be false
  (isSignedIn, isCreateOrderRoute, myProfileShouldUpdate, hasCurrentUser, currentUserHasGroup) => {
    if (isSignedIn && isCreateOrderRoute && !myProfileShouldUpdate && hasCurrentUser && !currentUserHasGroup) {
      return { actionCreator: 'doUpdateHash', args: ['my-group'] }
    }
    return false
  }
)

bundle.reactTryingtoCreateOrderButHasNoSupplierSoRedirect = createSelector(
  'selectIsSignedIn', // should be true
  'selectIsCreateOrderRoute', // should be true
  'selectGroupsShouldUpdate', // should be false
  'selectSuppliersShouldUpdate', // should be false
  'selectGroupHasSuppliers', // should be false
  (isSignedIn, isCreateOrderRoute, groupsShouldUpdate, suppliersShouldUpdate, groupHasSuppliers) => {
    if (isSignedIn && isCreateOrderRoute && !groupsShouldUpdate && !suppliersShouldUpdate && !groupHasSuppliers) {
      return { actionCreator: 'doUpdateHash', args: ['suppliers'] }
    }
    return false
  }
)
// bundle.reactTryingtoCreateOrderButHasNoGroupSoNotify = createSelector(
//   'selectIsSignedIn', // should be true
//   'selectIsCreateOrderRoute', // should be true
//   'selectMyProfileShouldUpdate', // should be false
//   'selectHasCurrentUser', // should be true
//   'selectCurrentUserHasGroup', // should be false
//   (isSignedIn, isCreateOrderRoute, myProfileShouldUpdate, hasCurrentUser, currentUserHasGroup) => {
//     if (isSignedIn && isCreateOrderRoute && !myProfileShouldUpdate && hasCurrentUser && !currentUserHasGroup) {
//       return { actionCreator: 'doAddNotification', args: ['no group'] }
//     }
//     return false
//   }
// )
//
// bundle.reactTryingtoCreateOrderButHasNoSupplierSoNotify = createSelector(
//   'selectIsSignedIn', // should be true
//   'selectIsCreateOrderRoute', // should be true
//   'selectGroupsShouldUpdate', // should be false
//   'selectSuppliersShouldUpdate', // should be false
//   'selectGroupHasSuppliers', // should be false
//   (isSignedIn, isCreateOrderRoute, groupsShouldUpdate, suppliersShouldUpdate, groupHasSuppliers) => {
//     if (isSignedIn && isCreateOrderRoute && !groupsShouldUpdate && !suppliersShouldUpdate && !groupHasSuppliers) {
//       return { actionCreator: 'doAddNotification', args: ['no supplier'] }
//     }
//     return false
//   }
// )

export default bundle
