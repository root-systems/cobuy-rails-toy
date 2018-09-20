import { setObject, removeObject } from '../util/cache'

const name = 'accounts'

const initialState = {
  isSignedIn: false,
  isSigningIn: false,
  isSigningOut: false,
  signInEmailField: '',
  signInPasswordField: '',
  credentials: {}
}

const reducer = (state = initialState, action) => {
  if (action.type === 'UPDATE_SIGN_IN_EMAIL_FIELD') {
    return Object.assign({}, state, { signInEmailField: action.payload })
  }
  if (action.type === 'UPDATE_SIGN_IN_PASSWORD_FIELD') {
    return Object.assign({}, state, { signInPasswordField: action.payload })
  }
  if (action.type === 'SIGN_IN_START') {
    return {
      ...state,
      isSigningIn: true
    }
  }
  if (action.type === 'SIGN_IN_SUCCESS') {
    return {
      ...state,
      isSigningIn: false,
      isSignedIn: true,
      credentials: action.payload.credentials,
      signInEmailField: '',
      signInPasswordField: ''
    }
  }
  if (action.type === 'SIGN_IN_ERROR') {
    return {
      ...state,
      isSigningIn: false
    }
  }
  if (action.type === 'SIGN_OUT_START') {
    return {
      ...state,
      isSigningOut: true
    }
  }
  if (action.type === 'SIGN_OUT_SUCCESS') {
    removeObject(['uid', 'expiry', 'tokenType', 'accessToken', 'client', 'currentUserId'])
    return {
      ...state,
      isSigningOut: false,
      isSignedIn: false,
      credentials: {}
    }
  }
  if (action.type === 'SIGN_OUT_ERROR') {
    return {
      ...state,
      isSigningOut: false
    }
  }

  return state
}

const selectors = {
  selectCredentials: (state) => state.accounts.credentials,
  selectIsSignedIn: (state) => state.accounts.isSignedIn,
  selectSignInEmailField: (state) => state.accounts.signInEmailField,
  selectSignInPasswordField: (state) => state.accounts.signInPasswordField
}

const actionCreators = {
  doUpdateSignInEmailField: (email) => ({ dispatch }) => {
    dispatch({ type: 'UPDATE_SIGN_IN_EMAIL_FIELD', payload: email })
  },
  doUpdateSignInPasswordField: (password) => ({ dispatch }) => {
    dispatch({ type: 'UPDATE_SIGN_IN_PASSWORD_FIELD', payload: password })
  },
  doSignIn: (signInData) => ({ dispatch, apiFetch }) => {
    dispatch({ type: 'SIGN_IN_START' })
    apiFetch('/authentication/sign_in', {
      method: 'POST',
      body: JSON.stringify(signInData)
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(new Error(`${response.status} ${response.statusText}`))
        }
        const credentials = {
          accessToken: response.headers.get('access-token'),
          client: response.headers.get('client'),
          expiry: response.headers.get('expiry'),
          tokenType: response.headers.get('token-type'),
          uid: response.headers.get('uid')
        }
        return response.json()
          .then((user) => {
            const credentialsWithCurrentUserId = {
              ...credentials,
              currentUserId: user.data.id
            }
            setObject(credentialsWithCurrentUserId)
            dispatch({ type: 'SIGN_IN_SUCCESS', payload: { user: user.data, credentials: credentialsWithCurrentUserId } })
          })
      })
      .catch((error) => {
        dispatch({ type: 'SIGN_IN_ERROR', payload: error })
      })
  },
  doSignOut: () => ({ dispatch, apiFetch, getState }) => {
    const credentials = getState().accounts.credentials
    const sanitizedCredentials = {
      'access-token': credentials.accessToken,
      'token-type': credentials.tokenType,
      client: credentials.client,
      uid: credentials.uid,
      expiry: credentials.expiry
    }
    dispatch({ type: 'SIGN_OUT_START' })
    apiFetch('/authentication/sign_out', {
      method: 'DELETE',
      headers: sanitizedCredentials
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(new Error(`${response.status} ${response.statusText}`))
        }
        dispatch({ type: 'SIGN_OUT_SUCCESS' })
      })
      .catch((error) => {
        dispatch({ type: 'SIGN_OUT_ERROR', payload: error })
      })
  }
}

const reactors = {}

const persistActions = []

export default {
  name,
  reducer,
  ...selectors,
  ...actionCreators,
  ...reactors,
  persistActions
}
