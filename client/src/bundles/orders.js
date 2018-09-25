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
      orderFormData: {},
      data: concat(state.data, action.payload)
    }
  }

  return baseReducer(state, action)
}

bundle.selectOrderFormData = state => state.orders.orderFormData

bundle.selectOrders = (state) => state.orders.data

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
    })
    .catch((error) => {
      dispatch({ type: 'CREATE_ORDER_ERROR', payload: error })
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

export default bundle
