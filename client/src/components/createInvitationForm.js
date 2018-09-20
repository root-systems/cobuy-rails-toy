import React from 'react'
import { Button, TextField } from '@material-ui/core'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: 20,
  width: 300
}

const buttonStyle = {
  marginTop: 20
}

const headerStyle = {
  textAlign: 'center'
}

const CreateInvitationForm = (props) => {
  const {
    doCreateInvitation
  } = props

  const handlePasswordChange = (e) => {
    // return doUpdateInvitationPasswordField(e.target.value)
  }

  const handleSubmit = () => {
    // const formData = {
    //   user: {
    //     password: invitationPasswordField,
    //     password_confirmation: invitationPasswordConfirmationField,
    //     invitation_token: invitationToken
    //   }
    // }
    // console.log('invitation form data', formData)
    return doCreateInvitation()
  }

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Create Invitation</h1>
      <form style={formStyle}>
        <TextField
          label={'Email'}
          type='email'
          // value={invitationPasswordField}
          // onChange={handlePasswordChange}
        />
        <Button
          variant='outlined'
          style={buttonStyle}
          type='button'
          onClick={handleSubmit}
        >Complete Signup</Button>
      </form>
    </div>
  )
}

export default CreateInvitationForm
