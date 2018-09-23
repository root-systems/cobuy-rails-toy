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

// const EditGroupForm = (props) => {
//   const {
//     doUpdateGroup,
//     doUpdateGroupNameField,
//     groupNameField,
//     currentUser,
//     group
//   } = props
//
//   const handleNameChange = (e) => {
//     return doUpdateGroupNameField(e.target.value)
//   }
//
//   const handleSubmit = () => {
//     const formData = {
//       name: groupNameField,
//       id: group.id
//     }
//     return doUpdateGroup(formData)
//   }
//
//   return (
//     <div style={containerStyle}>
//       <h1 style={headerStyle}>Edit Group</h1>
//       <GroupForm
//         submitAction={doUpdateGroup}
//         handleNameChange={handleNameChange}
//         handleSubmit={handleSubmit}
//         currentUser={currentUser}
//       />
//     </div>
//   )
// }

class EditGroupForm extends React.Component {
  componentDidMount () {
    const { doUpdateGroupNameField, group } = this.props
    doUpdateGroupNameField(group.name)
  }

  render () {
    const {
      doUpdateGroup,
      doUpdateGroupNameField,
      groupNameField,
      group
    } = this.props

    const handleNameChange = (e) => {
      return doUpdateGroupNameField(e.target.value)
    }

    const handleSubmit = () => {
      const formData = {
        name: groupNameField,
        id: group.id
      }
      return doUpdateGroup(formData)
    }

    return (
      <div style={containerStyle}>
        <h1 style={headerStyle}>Edit Group</h1>
        <GroupForm
          handleNameChange={handleNameChange}
          handleSubmit={handleSubmit}
          nameFieldValue={groupNameField}
        />
      </div>
    )
  }
}

export default EditGroupForm
