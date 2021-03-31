import React from 'react'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'

import Row from 'commons/Forms/Row'
import OverlaySpinner from 'commons/OverlaySpinner'
import { PasswordField } from 'commons/Forms/InputField'
import { HeaderText, LeftContentWrapper, Form } from 'components/commons/AuthAndWizard'

import { ButtonsWrapper, CustomButton } from '../styled'

const ResetPassword = ({ handleFormSubmit, handleSubmit, loading, disabled }) => (
  <LeftContentWrapper>
    <HeaderText text="Reset Password" subText="Enter a new password for your account." />
    <OverlaySpinner loading={loading} />
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Row>
        <Field name="password" label="Password" component={PasswordField} />
      </Row>
      <Row>
        <Field
          name="password_confirmation"
          label="Confirm Password"
          component={PasswordField}
        />
      </Row>
      <ButtonsWrapper>
        <CustomButton primary type="submit" disabled={disabled}>
          Reset
        </CustomButton>
      </ButtonsWrapper>
    </Form>
  </LeftContentWrapper>
)


ResetPassword.propTypes = {
  disabled        : PropTypes.bool.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit    : PropTypes.func.isRequired,
  loading         : PropTypes.bool.isRequired,
}

export default ResetPassword
