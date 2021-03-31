import React, { useState } from 'react'
import { reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types'

import { isEmpty, isSubmitButtonDisabled, customFetch } from 'utils'
import validate from 'utils/validate'
import ResetPassword from './ResetPassword'

function splitToken(token) {
  return token.slice(1).split('&')
}

const App = ({ handleSubmit, history, ...props }) => {
  const { location } = props;
  const header = splitToken(location.search).reduce((acc, val) => {
    const b = val.split('=');
    return { ...acc, [b[0]]: decodeURIComponent(b[1]) };
  }, {});

  const [loading, setLoading] = useState(false)
  const handleFormSubmit = async values => {
    if (!isEmpty(values)) {
      setLoading(true)
      const [response] = await customFetch('auth/password', 'PUT', { ...values }, header)
      setLoading(false)
      if (response.success === true) {
        history.push({
          pathname: '/auth/login',
          state   : { message: { type: 'success', text: 'Successfully changed password. Please enter your new password to continue.' } }
        })
      } else {
        throw new SubmissionError({ password: 'Oops! Cannot change the password' })
      }
    }
  }
  return (
    <ResetPassword
      handleSubmit={handleSubmit}
      handleFormSubmit={handleFormSubmit}
      loading={loading}
      disabled={isSubmitButtonDisabled(props)}
    />
  )
}

App.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  history     : PropTypes.object,
  location    : PropTypes.object
}

const requiredFields = {
  password             : 'Password',
  password_confirmation: 'Password Confirmation',
}

export default reduxForm({
  form  : 'resetPassword',
  fields: { ...requiredFields },
  validate
})(App)
