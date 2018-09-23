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
  newProducts: {},
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
  if (action.type === 'ADD_NEW_PRODUCT') {
    const nextId = cuid()
    return {
      ...state,
      newProducts: {
        ...state.newProducts,
        [nextId]: {
          name: '',
          description: '',
          unit: ''
        }
      }
    }
  }

  if (action.type === 'SIGN_OUT_SUCCESS') {
    return initialState
  }

  return baseReducer(state, action)
}

bundle.selectProducts = state => state.products.data
bundle.selectNewProducts = state => state.products.newProducts
bundle.selectThisSupplierProducts = createSelector(
  'selectThisSupplierId',
  'selectProducts',
  (supplierId, products) => {
    if (!isNil(supplierId) || isNil(products)) return null
    return filter(products, (product) => { return supplierId === product.supplier_id })
  }
)

bundle.doAddNewProduct = () => ({ dispatch }) => {
  dispatch({ type: 'ADD_NEW_PRODUCT' })
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
