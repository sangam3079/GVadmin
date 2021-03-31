import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import ReactGA from 'react-ga'

import { isEmpty, isSubmitButtonDisabled, customFetch } from 'utils'
import validate from 'utils/validate'
import { getUtmValue } from 'utils/cookie'
import { UserContext } from 'contexts/UserContext'
import setSession from '../commons/setSession'
import Signup from './Signup'

const App = ({ handleSubmit, history, ...props }) => {
  const [loading, setLoading] = useState(false)
  const [signupPop, changeSignupPop] = useState('')
  const [message, changeMessage] = useState()
  // const { refetchUser } = useContext(UserContext)

  const handleFormSubmit = async values => {
    try {
      if(!values.agreement) {
        changeMessage({ type: 'error', text: 'Please accept our terms and privacy policy.' })
        return
      }
      if (!isEmpty(values)) {
        setLoading(true)
        let utmParams = {}
        const utmCookies = getUtmValue()
        if (utmCookies !== undefined && utmCookies !== '' && utmCookies !== null) {
          utmParams = JSON.parse(utmCookies)
        }
        const [response, headers] = await customFetch('signup', 'POST', {
          ...values,
          password_confirmation: values.password,
          utm_params           : utmParams
        })
        if (response.status === 'success') {
          setSession(headers)
          // await refetchUser()
          if (utmCookies !== undefined || utmCookies !== '' || utmCookies !== null) {
            ReactGA.event({
              category: 'accountCreated',
              action  : 'Sign up'
            });
          }
          history.push('/')
        } else {
          changeMessage({ type: 'error', text: response.errors.full_messages[0] })
        }
      }
    } catch (error) {
      changeMessage({
        type: 'error',
        text: 'Oops we ran into internal issue. Will get back to you',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Signup
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
  history     : PropTypes.object,
}

const validateFields = {
  email                : { required: true, label: 'Email', email: true },
  password             : { required: true, label: 'Password', password: true },
  agreement            : { required: true },
  password_confirmation: {
    required: true,
    label   : 'Password Confirmation',
    password: true,
  },
}

export default reduxForm({
  form         : 'signup',
  initialValues: { agreement: false },
  fields       : validateFields,
  validate,
})(App)
