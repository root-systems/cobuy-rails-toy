import React from 'react'
import { connect } from 'redux-bundler-react'

import SignInForm from '../components/signInForm'

const SignIn = ({
  doUpdateSignInEmailField,
  doUpdateSignInPasswordField,
  signInEmailField,
  signInPasswordField,
  doSignIn
 }) => {
  return (
    <SignInForm
      doUpdateSignInEmailField={doUpdateSignInEmailField}
      doUpdateSignInPasswordField={doUpdateSignInPasswordField}
      signInEmailField={signInEmailField}
      signInPasswordField={signInPasswordField}
      doSignIn={doSignIn}
    />
  )
}

export default connect(
  'doUpdateSignInEmailField',
  'doUpdateSignInPasswordField',
  'selectSignInEmailField',
  'selectSignInPasswordField',
  'doSignIn',
  SignIn
)
