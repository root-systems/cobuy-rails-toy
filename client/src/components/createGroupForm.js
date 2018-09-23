import React from 'react'
import { Button, TextField } from '@material-ui/core'

import GroupForm from './groupForm'

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

const CreateGroupForm = (props) => {
  const {
    doCreateGroup,
    doUpdateGroupNameField,
    groupNameField,
    currentUser
  } = props

  const handleNameChange = (e) => {
    return doUpdateGroupNameField(e.target.value)
  }

  const handleSubmit = () => {
    const formData = {
      name: groupNameField,
      creator_id: currentUser.id
    }
    return doCreateGroup(formData)
  }

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Create Group</h1>
      <GroupForm
        submitAction={doCreateGroup}
        handleNameChange={handleNameChange}
        handleSubmit={handleSubmit}
        currentUser={currentUser}
      />
    </div>
  )
}

export default CreateGroupForm
