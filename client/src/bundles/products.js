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
  newProduct: {
    name: '',
    description: '',
    unit: ''
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

  if (action.type === 'UPDATE_NEW_PRODUCT_NAME') {
    return {
      ...state,
      newProduct: {
        ...state.newProduct,
        name: action.payload
      }
    }
  }

  if (action.type === 'UPDATE_NEW_PRODUCT_DESCRIPTION') {
    return {
      ...state,
      newProduct: {
        ...state.newProduct,
        description: action.payload
      }
    }
  }

  if (action.type === 'UPDATE_NEW_PRODUCT_UNIT') {
    return {
      ...state,
      newProduct: {
        ...state.newProduct,
        unit: action.payload
      }
    }
  }

  if (action.type === 'CREATE_PRODUCT_SUCCESS') {
    return {
      ...state,
      newProduct: {
        name: '',
        description: '',
        unit: ''
      },
      data: concat(state.data, action.payload)
    }
  }

  if (action.type === 'SIGN_OUT_SUCCESS') {
    return initialState
  }

  return baseReducer(state, action)
}

bundle.selectProducts = state => state.products.data
bundle.selectNewProduct = state => state.products.newProduct
bundle.selectThisSupplierProducts = createSelector(
  'selectThisSupplierId',
  'selectProducts',
  (supplierId, products) => {
    if (isNil(supplierId) || isNil(products)) return null
    return filter(products, (product) => { return supplierId === product.supplier_id })
  }
)

bundle.doUpdateNewProductName = (name) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_NEW_PRODUCT_NAME', payload: name })
}

bundle.doUpdateNewProductDescription = (description) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_NEW_PRODUCT_DESCRIPTION', payload: description })
}

bundle.doUpdateNewProductUnit = (unit) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_NEW_PRODUCT_UNIT', payload: unit })
}

bundle.doCreateProduct = (formData) => ({ dispatch, apiFetch, getState }) => {
  const credentials = getState().accounts.credentials
  const supplierId = formData.supplier_id
  const sanitizedCredentials = {
    'access-token': credentials.accessToken,
    'token-type': credentials.tokenType,
    client: credentials.client,
    uid: credentials.uid,
    expiry: credentials.expiry
  }
  dispatch({ type: 'CREATE_PRODUCT_START' })
  apiFetch('api/v1/products', {
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
      dispatch({
        type: 'CREATE_PRODUCT_SUCCESS',
        payload: data
      })
      dispatch({ actionCreator: 'doUpdateHash', args: [`suppliers/${supplierId}/products`] })
    })
    .catch((error) => {
      dispatch({ type: 'CREATE_PRODUCT_ERROR', payload: error })
    })
}

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
