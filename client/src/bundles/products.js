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
  productFormData: {
    name: '',
    description: '',
    unit: ''
  },
  priceSpecsFormData: {},
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
  if (action.type === 'UPDATE_PRODUCT_FORM_DATA') {
    return {
      ...state,
      productFormData: action.payload
    }
  }

  if (action.type === 'UPDATE_PRODUCT_FORM_DATA_NAME') {
    return {
      ...state,
      productFormData: {
        ...state.productFormData,
        name: action.payload
      }
    }
  }

  if (action.type === 'UPDATE_PRODUCT_FORM_DATA_DESCRIPTION') {
    return {
      ...state,
      productFormData: {
        ...state.productFormData,
        description: action.payload
      }
    }
  }

  if (action.type === 'UPDATE_PRODUCT_FORM_DATA_UNIT') {
    return {
      ...state,
      productFormData: {
        ...state.productFormData,
        unit: action.payload
      }
    }
  }

  if (action.type === 'CREATE_PRODUCT_SUCCESS') {
    return {
      ...state,
      productFormData: {
        name: '',
        description: '',
        unit: ''
      },
      priceSpecsFormData: {},
      data: concat(state.data, action.payload)
    }
  }

  if (action.type === 'UPDATE_PRODUCT_SUCCESS') {
    return {
      ...state,
      productFormData: {
        name: '',
        description: '',
        unit: ''
      },
      data: concat(filter(state.data, (product) => { return product.id !== action.payload.id }), action.payload)
    }
  }

  if (action.type === 'ADD_PRICE_SPEC') {
    const nextId = cuid()
    return {
      ...state,
      priceSpecsFormData: {
        ...state.priceSpecsFormData,
        [nextId]: {
          price: '',
          minimum: ''
        }
      }
    }
  }

  if (action.type === 'UPDATE_PRICE_SPEC_PRICE') {
    return {
      ...state,
      priceSpecsFormData: {
        ...state.priceSpecsFormData,
        [action.payload.priceSpecKey]: {
          price: action.payload.price,
          minimum: state.priceSpecsFormData[action.payload.priceSpecKey].minimum
        }
      }
    }
  }
  if (action.type === 'UPDATE_PRICE_SPEC_MINIMUM') {
    return {
      ...state,
      priceSpecsFormData: {
        ...state.priceSpecsFormData,
        [action.payload.priceSpecKey]: {
          price: state.priceSpecsFormData[action.payload.priceSpecKey].price,
          minimum: action.payload.minimum
        }
      }
    }
  }
  if (action.type === 'REMOVE_PRICE_SPEC') {
    return {
      ...state,
      priceSpecsFormData: omit(state.priceSpecsFormData, action.payload)
    }
  }

  if (action.type === 'SIGN_OUT_SUCCESS') {
    return initialState
  }

  return baseReducer(state, action)
}

bundle.selectProducts = state => state.products.data
bundle.selectProductFormData = state => state.products.productFormData
bundle.selectPriceSpecsFormData = state => state.products.priceSpecsFormData
bundle.selectThisSupplierProducts = createSelector(
  'selectThisSupplierId',
  'selectProducts',
  (supplierId, products) => {
    if (isNil(supplierId) || isNil(products)) return null
    return filter(products, (product) => { return supplierId === product.supplier_id })
  }
)
bundle.selectThisProductId = createSelector(
  'selectHash',
  (urlHash) => {
    const urlHashArray = urlHash.split('/')
    const path = urlHashArray[0]
    if (path !== 'products') return null
    const productId = urlHashArray[1]
    return Number(productId)
  }
)
bundle.selectThisProduct = createSelector(
  'selectThisProductId',
  'selectProducts',
  (productId, products) => {
    if (isNil(productId) || isNil(products)) return null
    const product = find(products, { 'id': productId })
    return product
  }
)

bundle.doUpdateProductFormData = (formData) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_PRODUCT_FORM_DATA', payload: formData })
}

bundle.doUpdateProductFormDataName = (name) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_PRODUCT_FORM_DATA_NAME', payload: name })
}

bundle.doUpdateProductFormDataDescription = (description) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_PRODUCT_FORM_DATA_DESCRIPTION', payload: description })
}

bundle.doUpdateProductFormDataUnit = (unit) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_PRODUCT_FORM_DATA_UNIT', payload: unit })
}

bundle.doAddPriceSpec = () => ({ dispatch }) => {
  dispatch({ type: 'ADD_PRICE_SPEC' })
}

bundle.doUpdatePriceSpecMinimum = (priceSpecKeyAndValue) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_PRICE_SPEC_MINIMUM', payload: priceSpecKeyAndValue })
}

bundle.doUpdatePriceSpecPrice = (priceSpecKeyAndValue) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_PRICE_SPEC_PRICE', payload: priceSpecKeyAndValue })
}

bundle.doRemovePriceSpec = (priceSpecKey) => ({ dispatch }) => {
  dispatch({ type: 'REMOVE_PRICE_SPEC', payload: priceSpecKey })
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

bundle.doUpdateProduct = (formData) => ({ dispatch, apiFetch, getState }) => {
  const credentials = getState().accounts.credentials
  const sanitizedCredentials = {
    'access-token': credentials.accessToken,
    'token-type': credentials.tokenType,
    client: credentials.client,
    uid: credentials.uid,
    expiry: credentials.expiry
  }
  dispatch({ type: 'UPDATE_PRODUCT_START' })
  apiFetch(`api/v1/products/${formData.id}`, {
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
      dispatch({
        type: 'UPDATE_PRODUCT_SUCCESS',
        payload: data
      })
      dispatch({ actionCreator: 'doUpdateHash', args: [`suppliers/${data.supplier_id}/products`] })
    })
    .catch((error) => {
      dispatch({ type: 'UPDATE_PRODUCT_ERROR', payload: error })
    })
}

bundle.reactProductsFetch = createSelector(
  'selectProductsShouldUpdate',
  'selectIsSignedIn',
  'selectGroup',
  (shouldUpdate, isSignedIn, group) => {
    if (shouldUpdate && isSignedIn && !isNil(group)) {
      return { actionCreator: 'doFetchProducts' }
    }
    return false
  }
)

export default bundle
