import React from 'react'
import { connect } from 'redux-bundler-react'

import CreateInvitationForm from '../components/createInvitationForm'

const CreateInvitation = ({
  doCreateInvitation
 }) => {
  return (
    <CreateInvitationForm
      doCreateInvitation={doCreateInvitation}
    />
  )
}

export default connect(
  'selectInvitationToken',
  'doCreateInvitation',
  'doUpdateInvitationPasswordField',
  'doUpdateInvitationPasswordConfirmationField',
  'selectInvitationPasswordField',
  'selectInvitationPasswordConfirmationField',
  CreateInvitation
)
