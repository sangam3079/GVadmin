/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React, { useState } from 'react'
import { reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import { isEmpty, isSubmitButtonDisabled, customFetch } from 'utils'
import validate from 'utils/validate'
import ForgotPassword from './ForgotPassword'

const App = ({ handleSubmit, ...props }) => {
  const [loading, setLoading] = useState(false)
  const [message, changeMessage] = useState()
  const handleFormSubmit = async values => {
    if (!isEmpty(values)) {
      setLoading(true)
      const [response] = await customFetch('auth/password', 'POST', { ...values })
      setLoading(false)
      if (response.status === 'ok') {
        changeMessage({ type: 'success', text: 'Reset Password email sent.' })
      } else {
        changeMessage({
          type: 'error',
          text: response.error,
        })
      }
    }
  }
  return (
    <ForgotPassword
      handleSubmit={handleSubmit}
      handleFormSubmit={handleFormSubmit}
      loading={loading}
      disabled={isSubmitButtonDisabled(props)}
      message={message}
    />
  )
}

App.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

const validateFields = {
  email: { required: true, label: 'Email', email: true },
}

export default reduxForm({
  form  : 'forgotPassword',
  fields: validateFields,
  validate,
})(App)
