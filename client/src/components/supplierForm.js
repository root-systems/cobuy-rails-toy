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

const SupplierForm = (props) => {
  const {
    submitAction,
    nameChangeAction,
    nameFieldValue,
    currentUser
  } = props

  const handleNameChange = (e) => {
    return nameChangeAction(e.target.value)
  }

  const handleSubmit = () => {
    const formData = {
      name: nameFieldValue,
      group_id: currentUser.group_id
    }
    return submitAction(formData)
  }

  return (
    <div style={containerStyle}>
      <form style={formStyle}>
        <TextField
          label={'Name'}
          type='email'
          value={nameFieldValue}
          onChange={handleNameChange}
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

export default SupplierForm
