import { createSelector } from 'redux-bundler'
import { isNil } from 'lodash'

import { setObject, removeObject } from '../util/cache'

const name = 'invitations'

const initialState = {
  isAcceptingInvitation: false,
  invitationPasswordField: '',
  invitationPasswordConfirmationField: '',
  isCreatingInvitation: false,
  invitationEmail: ''
}

const reducer = (state = initialState, action) => {
  if (action.type === 'UPDATE_INVITATION_PASSWORD_FIELD') {
    return {
      ...state,
      invitationPasswordField: action.payload
    }
  }
  if (action.type === 'ACCEPT_INVITATION_START') {
    return {
      ...state,
      isAcceptingInvitation: true
    }
  }
  if (action.type === 'ACCEPT_INVITATION_SUCCESS') {
    return {
      ...state,
      isAcceptingInvitation: false
    }
  }
  if (action.type === 'CREATE_INVITATION_START') {
    return {
      ...state,
      isCreatingInvitation: true
    }
  }
  if (action.type === 'CREATE_INVITATION_SUCCESS') {
    return {
      ...state,
      isCreatingInvitation: false
    }
  }
  if (action.type === 'UPDATE_INVITATION_PASSWORD_CONFIRMATION_FIELD') {
    return {
      ...state,
      invitationPasswordConfirmationField: action.payload
    }
  }
  return state
}

const selectors = {
  selectIsAcceptingInvitation: (state) => state.invitations.isAcceptingInvitation,
  selectInvitationPasswordField: (state) => state.invitations.invitationPasswordField,
  selectInvitationPasswordConfirmationField: (state) => state.invitations.invitationPasswordConfirmationField,
  selectInvitationToken: createSelector(
    'selectHashObject',
    (hashObject) => {
      if (isNil(hashObject['invitation'])) return null
      return hashObject['invitation'].replace('?token=', '')
    }
  )
}

const actionCreators = {
  doUpdateInvitationPasswordField: (password) => ({ dispatch }) => {
    dispatch({ type: 'UPDATE_INVITATION_PASSWORD_FIELD', payload: password })
  },
  doUpdateInvitationPasswordConfirmationField: (passwordConfirmation) => ({ dispatch }) => {
    dispatch({ type: 'UPDATE_INVITATION_PASSWORD_CONFIRMATION_FIELD', payload: passwordConfirmation })
  },
  doAcceptInvitation: (formData) => ({ dispatch, apiFetch, getState }) => {
    dispatch({ type: 'ACCEPT_INVITATION_START' })
    // GK: TODO: stop using the normal invitations controller for accepting invitations
    // instead use the new api invitations controller
    apiFetch('admin/invitation', {
      method: 'PATCH',
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(new Error(`${response.status} ${response.statusText}`))
        }
        dispatch({ type: 'ACCEPT_INVITATION_SUCCESS', payload: 'Success! Please login with your new password.' })
        dispatch({ actionCreator: 'doUpdateHash', args: ['#'] })
      })
      .catch((error) => {
        dispatch({ type: 'ACCEPT_INVITATION_ERROR', payload: error })
      })
  },
  doCreateInvitation: (formData) => ({ dispatch, apiFetch, getState }) => {
    const credentials = getState().accounts.credentials
    const sanitizedCredentials = {
      'access-token': credentials.accessToken,
      'token-type': credentials.tokenType,
      client: credentials.client,
      uid: credentials.uid,
      expiry: credentials.expiry
    }
    dispatch({ type: 'CREATE_INVITATION_START' })
    apiFetch('api/v1/auth/invitation', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@test.com'
      }),
      headers: sanitizedCredentials
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(new Error(`${response.status} ${response.statusText}`))
        }
        dispatch({ type: 'CREATE_INVITATION_SUCCESS', payload: 'Success! Invitation sent.' })
        dispatch({ actionCreator: 'doUpdateHash', args: ['#'] })
      })
      .catch((error) => {
        dispatch({ type: 'CREATE_INVITATION_ERROR', payload: error })
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
