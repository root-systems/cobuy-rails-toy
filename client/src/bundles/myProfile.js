import { createAsyncResourceBundle, createSelector } from 'redux-bundler'
import cuid from 'cuid'
import { omit } from 'lodash'
import ms from 'milliseconds'

const bundle = createAsyncResourceBundle({
  name: 'myProfile',
  getPromise: async ({ apiFetch, getState }) => {
    const credentials = getState().accounts.credentials
    const currentUserId = credentials.currentUserId
    const sanitizedCredentials = {
      'access-token': credentials.accessToken,
      'token-type': credentials.tokenType,
      client: credentials.client,
      uid: credentials.uid,
      expiry: credentials.expiry
    }
    return apiFetch(`/users/${currentUserId}`, {
      headers: sanitizedCredentials
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(new Error(`${response.status} ${response.statusText}`))
        }
        return response.json()
      })
  },
  staleAfter: ms.minutes(5),
  retryAfter: ms.minutes(2)
})

const initialState = {
  phoneField: '',
  businessNameField: '',
  shippingAddressField: '',
  billingAddressField: '',
  nameField: '',
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
  if (action.type === 'SIGN_IN_SUCCESS') {
    return {
      ...state,
      data: action.payload.user,
      phoneField: action.payload.user.phone,
      businessNameField: action.payload.user.business_name,
      nameField: action.payload.user.name,
      shippingAddressField: action.payload.user.shipping_address,
      billingAddressField: action.payload.user.billing_address
    }
  }
  if (action.type === 'MYPROFILE_FETCH_FINISHED') {
    return {
      ...state,
      data: action.payload,
      phoneField: action.payload.phone,
      businessNameField: action.payload.business_name,
      nameField: action.payload.name,
      shippingAddressField: action.payload.shipping_address,
      billingAddressField: action.payload.billing_address
    }
  }
  if (action.type === 'SIGN_OUT_SUCCESS') {
    return {
      ...state,
      data: {},
      phoneField: null,
      businessNameField: null,
      nameField: null,
      shippingAddressField: null,
      billingAddressField: null
    }
  }
  if (action.type === 'UPDATE_MY_PROFILE_SUCCESS') {
    return {
      ...state,
      data: action.payload,
      phoneField: action.payload.phone,
      businessNameField: action.payload.business_name,
      nameField: action.payload.name,
      shippingAddressField: action.payload.shipping_address,
      billingAddressField: action.payload.billing_address
    }
  }
  if (action.type === 'UPDATE_PHONE_FIELD') {
    return {
      ...state,
      phoneField: action.payload
    }
  }
  if (action.type === 'UPDATE_BUSINESS_NAME_FIELD') {
    return {
      ...state,
      businessNameField: action.payload
    }
  }
  if (action.type === 'UPDATE_SHIPPING_ADDRESS_FIELD') {
    return {
      ...state,
      shippingAddressField: action.payload
    }
  }
  if (action.type === 'UPDATE_BILLING_ADDRESS_FIELD') {
    return {
      ...state,
      billingAddressField: action.payload
    }
  }
  if (action.type === 'UPDATE_NAME_FIELD') {
    return {
      ...state,
      nameField: action.payload
    }
  }
  return baseReducer(state, action)
}

bundle.selectCurrentUser = state => state.myProfile.data
bundle.selectNameField = state => state.myProfile.nameField
bundle.selectPhoneField = state => state.myProfile.phoneField
bundle.selectBusinessNameField = state => state.myProfile.businessNameField
bundle.selectShippingAddressField = state => state.myProfile.shippingAddressField
bundle.selectBillingAddressField = state => state.myProfile.billingAddressField

bundle.doUpdateNameField = (name) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_NAME_FIELD', payload: name })
}
bundle.doUpdatePhoneField = (phone) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_PHONE_FIELD', payload: phone })
}
bundle.doUpdateBusinessNameField = (businessName) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_BUSINESS_NAME_FIELD', payload: businessName })
}
bundle.doUpdateBillingAddressField = (billingAddress) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_BILLING_ADDRESS_FIELD', payload: billingAddress })
}
bundle.doUpdateShippingAddressField = (shippingAddress) => ({ dispatch }) => {
  dispatch({ type: 'UPDATE_SHIPPING_ADDRESS_FIELD', payload: shippingAddress })
}

bundle.doUpdateMyProfile = (profileData) => ({ dispatch, apiFetch, getState }) => {
  const credentials = getState().accounts.credentials
  const sanitizedCredentials = {
    'access-token': credentials.accessToken,
    'token-type': credentials.tokenType,
    client: credentials.client,
    uid: credentials.uid,
    expiry: credentials.expiry
  }
  dispatch({ type: 'UPDATE_MY_PROFILE_START' })
  apiFetch(`/users/${credentials.currentUserId}`, {
    method: 'PATCH',
    body: JSON.stringify(profileData),
    headers: sanitizedCredentials
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(`${response.status} ${response.statusText}`))
      }
      return response.json()
    })
    .then((data) => {
      dispatch({ type: 'UPDATE_MY_PROFILE_SUCCESS', payload: data })
    })
    .catch((error) => {
      dispatch({ type: 'UPDATE_MY_PROFILE_ERROR', payload: error })
    })
}

bundle.reactMyProfileFetch = createSelector(
  'selectMyProfileShouldUpdate',
  'selectIsSignedIn',
  (shouldUpdate, isSignedIn) => {
    if (shouldUpdate && isSignedIn) {
      return { actionCreator: 'doFetchMyProfile' }
    }
    return false
  }
)

export default bundle
