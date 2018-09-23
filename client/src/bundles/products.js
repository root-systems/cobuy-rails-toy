import { createAsyncResourceBundle, createSelector } from 'redux-bundler'
import cuid from 'cuid'
import { omit, concat, isNil, find, filter } from 'lodash'
import ms from 'milliseconds'

const bundle = createAsyncResourceBundle({
  name: 'products',
  getPromise: async ({ apiFetch, getState }) => {
    const credentials = getState().accounts.credentials
    const sanitizedCredentials = {
      'access-token': credentials.accessToken,
      'token-type': credentials.tokenType,
      client: credentials.client,
      uid: credentials.uid,
      expiry: credentials.expiry
    }
    return apiFetch(`api/v1/products`, {
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
  // if (action.type === 'UPDATE_SUPPLIER_NAME_FIELD') {
  //   return {
  //     ...state,
  //     nameField: action.payload
  //   }
  // }
  // if (action.type === 'CREATE_SUPPLIER_START') {
  //   return {
  //     ...state,
  //     isCreatingSupplier: true
  //   }
  // }
  // if (action.type === 'CREATE_SUPPLIER_SUCCESS') {
  //   return {
  //     ...state,
  //     isCreatingSupplier: false,
  //     data: concat(state.data, action.payload),
  //     nameField: ''
  //   }
  // }
  // if (action.type === 'CREATE_SUPPLIER_ERROR') {
  //   return {
  //     ...state,
  //     isCreatingSupplier: false
  //   }
  // }
  // if (action.type === 'UPDATE_SUPPLIER_START') {
  //   return {
  //     ...state,
  //     isUpdatingSupplier: true
  //   }
  // }
  // if (action.type === 'UPDATE_SUPPLIER_SUCCESS') {
  //   return {
  //     ...state,
  //     isUpdatingSupplier: false,
  //     data: concat(filter(state.data, (supplier) => { return supplier.id !== action.payload.id }), action.payload)
  //   }
  // }
  // if (action.type === 'UPDATE_SUPPLIER_ERROR') {
  //   return {
  //     ...state,
  //     isUpdatingSupplier: false
  //   }
  // }

  if (action.type === 'SIGN_OUT_SUCCESS') {
    return initialState
  }

  return baseReducer(state, action)
}

bundle.selectProducts = state => state.products.data
bundle.selectThisSupplierProducts = createSelector(
  'selectThisSupplierId',
  'selectProducts',
  (supplierId, products) => {
    if (!isNil(supplierId) || isNil(products)) return null
    return filter(products, (product) => { return supplierId === product.supplier_id })
  }
)

// bundle.doCreateSupplier = (formData) => ({ dispatch, apiFetch, getState }) => {
//   const credentials = getState().accounts.credentials
//   const sanitizedCredentials = {
//     'access-token': credentials.accessToken,
//     'token-type': credentials.tokenType,
//     client: credentials.client,
//     uid: credentials.uid,
//     expiry: credentials.expiry
//   }
//   dispatch({ type: 'CREATE_SUPPLIER_START' })
//   apiFetch('api/v1/suppliers', {
//     method: 'POST',
//     body: JSON.stringify(formData),
//     headers: sanitizedCredentials
//   })
//     .then(response => {
//       if (!response.ok) {
//         return Promise.reject(new Error(`${response.status} ${response.statusText}`))
//       }
//       return response.json()
//     })
//     .then((data) => {
//       dispatch({ type: 'CREATE_SUPPLIER_SUCCESS', payload: data })
//       dispatch({ actionCreator: 'doUpdateHash', args: ['suppliers'] })
//     })
//     .catch((error) => {
//       dispatch({ type: 'CREATE_SUPPLIER_ERROR', payload: error })
//     })
// }
//
// bundle.doUpdateSupplier = (formData) => ({ dispatch, apiFetch, getState }) => {
//   const credentials = getState().accounts.credentials
//   const sanitizedCredentials = {
//     'access-token': credentials.accessToken,
//     'token-type': credentials.tokenType,
//     client: credentials.client,
//     uid: credentials.uid,
//     expiry: credentials.expiry
//   }
//   dispatch({ type: 'UPDATE_SUPPLIER_START' })
//   apiFetch(`api/v1/suppliers/${formData.id}`, {
//     method: 'PATCH',
//     body: JSON.stringify(omit(formData, ['id'])),
//     headers: sanitizedCredentials
//   })
//     .then(response => {
//       if (!response.ok) {
//         return Promise.reject(new Error(`${response.status} ${response.statusText}`))
//       }
//       return response.json()
//     })
//     .then((data) => {
//       dispatch({ type: 'UPDATE_SUPPLIER_SUCCESS', payload: data })
//       dispatch({ actionCreator: 'doUpdateHash', args: ['suppliers'] })
//     })
//     .catch((error) => {
//       dispatch({ type: 'UPDATE_SUPPLIER_ERROR', payload: error })
//     })
// }

bundle.reactProductsFetch = createSelector(
  'selectProductsShouldUpdate',
  'selectIsSignedIn',
  'selectGroup',
  (shouldUpdate, isSignedIn, group) => {
    console.log('reactProductsFetch', shouldUpdate, isSignedIn, group)
    if (shouldUpdate && isSignedIn && !isNil(group)) {
      return { actionCreator: 'doFetchProducts' }
    }
    return false
  }
)

export default bundle
