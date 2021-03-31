/* Copyright (C) Go9, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Bryan Starbuck <bryan@go9.com>, October 2019
 */
import React from 'react'
// import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Form, Input, Button} from 'antd'
import OverlaySpinner from 'commons/OverlaySpinner'
// import Row from 'commons/Forms/Row'
// import { TextField } from 'commons/Forms/InputField'
import { HeaderText, LeftContentWrapper } from 'components/commons/AuthAndWizard'

import { ButtonsWrapper, CustomButton, ChangePage, AccountInfo, StyledLink } from '../styled'

const ForgotPassword = ({
  handleFormSubmit,
  handleSubmit,
  loading,
  disabled,
  message,
  dispatch,
  history
}) => {
  const infoMessage = 'Go back to'
  const [form] = Form.useForm();
  const handleFormError = err => {
    console.log(err)
  }
  const handleForm = value => {
    console.log(value)
  }
  return (
    <LeftContentWrapper>
      <HeaderText message={message} text="Forgot Password" subText="Enter your email to help us identify you." />
      <OverlaySpinner loading={loading} />
      <Form
        form={form}
        onFinish={handleForm}
        onFinishFailed={handleFormError}
        name="forgot_form"
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{required : true, message : 'Email is required'}]}
        >
          <Input size="large" />
        </Form.Item>
        <div className="d-flex align-items-center justify-content-end">
            <Link to="/auth/login">Log in instead</Link>
          </div>
        <div className="d-flex justify-content-center">
          <div>
            <Form.Item>
            <Button htmlType="submit" type="primary" size="large" shape="round">Submit</Button>
          </Form.Item>
          </div>
        </div>
      </Form>
    </LeftContentWrapper>
  )
}

ForgotPassword.propTypes = {
  disabled        : PropTypes.bool.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit    : PropTypes.func.isRequired,
  loading         : PropTypes.bool.isRequired,
  message         : PropTypes.object,
}

export default connect()(withRouter(ForgotPassword))
