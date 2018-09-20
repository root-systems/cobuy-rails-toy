import React from 'react'
import { connect } from 'redux-bundler-react'

import ProfileForm from '../components/profileForm'

const Profile = ({
  currentUser,
  doUpdatePhoneField,
  doUpdateNameField,
  doUpdateBusinessNameField,
  doUpdateShippingAddressField,
  doUpdateBillingAddressField,
  nameField,
  phoneField,
  businessNameField,
  billingAddressField,
  shippingAddressField,
  doUpdateMyProfile
 }) => {
  return (
    <ProfileForm
      currentUser={currentUser}
      doUpdatePhoneField={doUpdatePhoneField}
      doUpdateNameField={doUpdateNameField}
      doUpdateBusinessNameField={doUpdateBusinessNameField}
      doUpdateShippingAddressField={doUpdateShippingAddressField}
      doUpdateBillingAddressField={doUpdateBillingAddressField}
      nameField={nameField}
      phoneField={phoneField}
      businessNameField={businessNameField}
      billingAddressField={billingAddressField}
      shippingAddressField={shippingAddressField}
      doUpdateMyProfile={doUpdateMyProfile}
    />
  )
}

export default connect(
  'selectCurrentUser',
  'doUpdatePhoneField',
  'doUpdateNameField',
  'doUpdateBusinessNameField',
  'doUpdateShippingAddressField',
  'doUpdateBillingAddressField',
  'selectPhoneField',
  'selectNameField',
  'selectBusinessNameField',
  'selectBillingAddressField',
  'selectShippingAddressField',
  'doUpdateMyProfile',
  Profile
)
