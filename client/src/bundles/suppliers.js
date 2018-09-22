import { createAsyncResourceBundle, createSelector } from 'redux-bundler'
import cuid from 'cuid'
import { omit, concat, isNil, find } from 'lodash'
import ms from 'milliseconds'

const bundle = createAsyncResourceBundle({
  name: 'suppliers',
  getPromise: async ({ apiFetch, getState }) => {
    const credentials = getState().accounts.credentials
    const sanitizedCredentials = {
      'access-token': credentials.accessToken,
      'token-type': credentials.tokenType,
      client: credentials.client,
      uid: credentials.uid,
      expiry: credentials.expiry
    }
    return apiFetch(`api/v1/suppliers`, {
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
  nameField: '',
  isCreatingSupplier: false,
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
  if (action.type === 'UPDATE_SUPPLIER_NAME_FIELD') {
    return {
      ...state,
      nameField: action.payload
    }
  }
  if (action.type === 'CREATE_SUPPLIER_START') {
    return {
      ...state,
      isCreatingSupplier: true
    }
  }
  if (action.type === 'CREATE_SUPPLIER_SUCCESS') {
    return {
      ...state,
      isCreatingSupplier: false,
      data: concat(state.data, action.payload),
      nameField: ''
    }
  }
  if (action.type === 'CREATE_SUPPLIER_ERROR') {
    return {
      ...state,
      isCreatingSupplier: false
    }
  }
  if (action.type === 'UPDATE_SUPPLIER_START') {
    return {
      ...state,
      isUpdatingSupplier: true
    }
  }
  if (action.type === 'UPDATE_SUPPLIER_SUCCESS') {
    return {
      ...state,
      isUpdatingSupplier: false,
      data: concat(state.data, action.payload),
      nameField: ''
    }
  }
  if (action.type === 'UPDATE_SUPPLIER_ERROR') {
    return {
      ...state,
      isUpdatingSupplier: false
    }
  }

  return baseReducer(state, action)
}

bundle.selectSuppliers = state => state.suppliers.data
bundle.selectSupplierNameField = state => state.suppliers.nameField
bundle.selectThisSupplier = createSelector(
  'selectHash',
  'selectSuppliers',
  (urlHash, suppliers) => {
    const urlHashArray = urlHash.split('/')
    const path = urlHashArray[0]
    if (path !== 'suppliers' || isNil(suppliers)) return null
    const supplierId = urlHashArray[1]
    const supplier = find(suppliers, { 'id': Number(supplierId) })
    return supplier
  }
)

bundle.doUpdateSupplierNameField = (name) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_SUPPLIER_NAME_FIELD', payload: name })
}

bundle.doCreateSupplier = (formData) => ({ dispatch, apiFetch, getState }) => {
  const credentials = getState().accounts.credentials
  const sanitizedCredentials = {
    'access-token': credentials.accessToken,
    'token-type': credentials.tokenType,
    client: credentials.client,
    uid: credentials.uid,
    expiry: credentials.expiry
  }
  dispatch({ type: 'CREATE_SUPPLIER_START' })
  apiFetch('api/v1/suppliers', {
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
      dispatch({ type: 'CREATE_SUPPLIER_SUCCESS', payload: data })
      dispatch({ actionCreator: 'doUpdateHash', args: ['suppliers'] })
    })
    .catch((error) => {
      dispatch({ type: 'CREATE_SUPPLIER_ERROR', payload: error })
    })
}

bundle.doUpdateSupplier = (formData) => ({ dispatch, apiFetch, getState }) => {
  const credentials = getState().accounts.credentials
  const sanitizedCredentials = {
    'access-token': credentials.accessToken,
    'token-type': credentials.tokenType,
    client: credentials.client,
    uid: credentials.uid,
    expiry: credentials.expiry
  }
  dispatch({ type: 'UPDATE_SUPPLIER_START' })
  apiFetch(`api/v1/suppliers/${formData.id}`, {
    method: 'PATCH',
    body: JSON.stringify(omit(formData, ['id'])),
    headers: sanitizedCredentials
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(`${response.status} ${response.statusText}`))
      }
      return response.json()
    })
    .then((data) => {
      dispatch({ type: 'UPDATE_SUPPLIER_SUCCESS', payload: data })
    })
    .catch((error) => {
      dispatch({ type: 'UPDATE_SUPPLIER_ERROR', payload: error })
    })
}

bundle.reactSuppliersFetch = createSelector(
  'selectSuppliersShouldUpdate',
  'selectIsSignedIn',
  (shouldUpdate, isSignedIn) => {
    if (shouldUpdate && isSignedIn) {
      return { actionCreator: 'doFetchSuppliers' }
    }
    return false
  }
)

export default bundle
