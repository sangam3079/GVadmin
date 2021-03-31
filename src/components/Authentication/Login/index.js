import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import { get } from 'lodash'
import { connect } from 'react-redux'

import { isEmpty, isSubmitButtonDisabled, customFetch } from 'utils'
import validate from 'utils/validate'
import setSession from '../commons/setSession'
import { ResendDiv } from './styled'
import Login from './Login'
import {setTokenValue} from 'services/url'
import {setCurrentUser} from 'store/actions/Profile/ProfileActions'

const App = ({ handleSubmit, history, location, dispatch, ...props }) => {
  const [loading, setLoading] = useState(false)
  const [message, changeMessage] = useState(get(location, 'state.message'))
  // const { refetchUser } = useContext(UserContext)

  const handleResendSubmit = async email => {
    if (email) {
      const [response] = await customFetch('auth/confirmation', 'POST', {
        email,
      })
      if (response.message) {
        changeMessage({ type: 'success', text: response.message })
      }
    }
  }
  const handleFormSubmit = async values => {
    if (!isEmpty(values)) {
      setLoading(true)
      const [response, headers] = await customFetch('login', 'POST', {
        ...values,
      })
      console.log('hello')
      // console.log('response is', response);
      if (response.auth_token) {
        setSession({access_token: response.auth_token, uid: response.uid, role : 'admin'})
        setTokenValue(response.auth_token);
        setLoading(false)
        dispatch(setCurrentUser(response.user))
        history.push('/')
      } else {
        setLoading(false)
        if (response.unconfirmed) {
          changeMessage({
            type: 'error',
            text: (
              <div>
                {response.errors[0]}.{' '}
                <ResendDiv onClick={() => handleResendSubmit(values.email)}>
                  Resend Link
                </ResendDiv>{' '}
                incase you did not receive your email.
              </div>
            ),
          })
          return
        }
        changeMessage({ type: 'error', text: response.errors[0] })
      }
    }
  }

  return (
    <Login
      handleFormSubmit={handleFormSubmit}
      handleSubmit={handleSubmit}
      disabled={isSubmitButtonDisabled(props)}
      loading={loading}
      message={message}
    />
  )
}

App.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  history     : PropTypes.object.isRequired,
  location    : PropTypes.object
}

const validateFields = {
  email   : { required: true, label: 'Email', email: true },
  password: { required: true, label: 'Password', password: true },
}

export default compose(
  connect(() => {
    return {
      initialValues: { remember_me: true },
    }
  }),
  reduxForm({
    form  : 'login',
    fields: validateFields,
    validate,
  }),
)(App)
