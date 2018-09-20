import { createSelector } from 'redux-bundler'
import { isNil } from 'lodash'

import { setObject, removeObject } from '../util/cache'

const name = 'invitations'

const initialState = {
  isAcceptingInvitation: false,
  invitationPasswordField: '',
  invitationPasswordConfirmationField: ''
}

const reducer = (state = initialState, action) => {
  if (action.type === 'UPDATE_INVITATION_PASSWORD_FIELD') {
    return {
      ...state,
      invitationPasswordField: action.payload
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
    apiFetch('admin/invitation', {
    // GK: TODO: i don't understand why the path below doesn't work, while the one above does
    // i also don't understand why devise-invitable created two sets of routes
    // apiFetch('api/v1/auth/invitation', {
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
