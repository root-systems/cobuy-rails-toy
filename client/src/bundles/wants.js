import { createAsyncResourceBundle, createSelector } from 'redux-bundler'
import cuid from 'cuid'
import { omit, concat, isNil, find, filter, isEmpty, reduce } from 'lodash'
import ms from 'milliseconds'

const bundle = createAsyncResourceBundle({
  name: 'wants',
  getPromise: async ({ apiFetch, getState }) => {
    const credentials = getState().accounts.credentials
    const sanitizedCredentials = {
      'access-token': credentials.accessToken,
      'token-type': credentials.tokenType,
      client: credentials.client,
      uid: credentials.uid,
      expiry: credentials.expiry
    }
    return apiFetch(`api/v1/wants`, {
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
  wantsFormData: {},
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
  if (action.type === 'ADD_WANTS_CONTAINER') {
    const nextId = cuid()
    return {
      ...state,
      wantsFormData: {
        ...state.wantsFormData,
        [nextId]: {
          product_id: null,
          wants: {}
        }
      }
    }
  }

  if (action.type === 'UPDATE_WANTS_CONTAINER_PRODUCT_ID') {
    const { products, productId } = action.payload
    const product = find(products, { 'id': productId })
    const priceSpecs = product.price_specs
    return {
      ...state,
      wantsFormData: {
        ...state.wantsFormData,
        [action.payload.wantsContainerKey]: {
          ...state.wantsFormData[action.payload.wantsContainerKey],
          product_id: productId,
          unit: product.unit,
          description: product.description,
          wants: reduce(priceSpecs, (sofar, priceSpec) => {
            return {
              ...sofar,
              [cuid()]: {
                quantity: '',
                price_spec_id: priceSpec.id,
                product_id: productId,
                order_id: action.payload.orderId,
                priceSpec: priceSpec
              }
            }
          }, {})
        }
      }
    }
  }

  if (action.type === 'UPDATE_WANT_QUANTITY') {
    const { wantsContainerKey, wantId, quantity } = action.payload
    return {
      ...state,
      wantsFormData: {
        ...state.wantsFormData,
        [wantsContainerKey]: {
          ...state.wantsFormData[wantsContainerKey],
          wants: {
            ...state.wantsFormData[wantsContainerKey].wants,
            [wantId]: {
              ...state.wantsFormData[wantsContainerKey].wants[wantId],
              quantity: quantity
            }
          }
        }
      }
    }
  }

  return baseReducer(state, action)
}

bundle.selectWants = state => state.wants.data
bundle.selectWantsFormData = state => state.wants.wantsFormData

bundle.doAddWantsContainer = (data) => ({ dispatch }) => {
  dispatch({ type: 'ADD_WANTS_CONTAINER' })
}

bundle.doUpdateWantsContainerProductId = (wantsContainerKey, productId, products, orderId) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_WANTS_CONTAINER_PRODUCT_ID', payload: { wantsContainerKey, productId, products, orderId } })
}

bundle.doUpdateWantQuantity = (wantsContainerKey, wantId, quantity) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_WANT_QUANTITY', payload: { wantsContainerKey, wantId, quantity } })
}

bundle.doCreateGroup = (formData) => ({ dispatch, apiFetch, getState }) => {
  const credentials = getState().accounts.credentials
  const sanitizedCredentials = {
    'access-token': credentials.accessToken,
    'token-type': credentials.tokenType,
    client: credentials.client,
    uid: credentials.uid,
    expiry: credentials.expiry
  }
  dispatch({ type: 'CREATE_GROUP_START' })
  apiFetch('api/v1/groups', {
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
      dispatch({ type: 'CREATE_GROUP_SUCCESS', payload: data })
      dispatch({ actionCreator: 'doUpdateHash', args: ['my-group'] })
    })
    .catch((error) => {
      dispatch({ type: 'CREATE_GROUP_ERROR', payload: error })
    })
}


// bundle.reactGroupsFetch = createSelector(
//   'selectGroupsShouldUpdate',
//   'selectIsSignedIn',
//   'selectCurrentUserHasGroup',
//   (shouldUpdate, isSignedIn, currentUserHasGroup) => {
//     if (shouldUpdate && isSignedIn && currentUserHasGroup) {
//       return { actionCreator: 'doFetchGroups' }
//     }
//     return false
//   }
// )

export default bundle
