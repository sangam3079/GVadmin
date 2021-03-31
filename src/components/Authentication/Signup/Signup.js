import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Link, withRouter} from 'react-router-dom'
import OverlaySpinner from 'commons/OverlaySpinner'
import { LeftContentWrapper, HeaderText } from 'components/commons/AuthAndWizard'
import {Form, Input, Checkbox, Button} from 'antd'
import { signup } from 'services/profile'
import setSession from '../commons/setSession'
import {setTokenValue} from 'services/url'
import {connect} from 'react-redux'

const Signup = ({
  loading,
  message,
  dispatch,
  history
}) => {
  const infoMessage = 'Already have an account with us?'
  const [sign_form] = Form.useForm();
  const [checked, setChecked] = useState(false);

  const handleFormFinish = value => {
    console.log('finish')
    let params = {
      agreement : checked,
      ...value
    }
    console.log(params);
    dispatch(signup({params, setTokenValue, setSession, callback : handleCallback}))
  }

  const handleFormError = err => {
    console.log('error',err);
  }

  const handleCallback = () => {
    history.push('/')
  }

  const handleCheck = e => {
    let checked = e.target.checked;
    setChecked(checked);
  }
  return (
    <LeftContentWrapper>
      <HeaderText message={message} text="Sign Up" subText="Please fill up the form to sign up." />
      <OverlaySpinner loading={loading} />
      <Form
        name="signup_form"
        layout="vertical"
        onFinish={handleFormFinish}
        onFinishFailed={handleFormError}
        form={sign_form}
      >
          <div className="row">
              <div className="col-lg-12">
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{required : true, message : 'Email field is required', type : 'email'}]}
                  >
                      <Input size="large"/>
                  </Form.Item>
              </div>
          </div>
          <div className="row">
                <div className="col-lg-12">
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required : true, message : 'Password is required'}]}
                      >
                            <Input.Password size="large"/>
                      </Form.Item>
                </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Checkbox onChange={handleCheck} checked={checked}/><span className="mx-2">I agree to all the terms and condition</span>
            </div>
          </div>
          <div className="d-flex justify-content-center my-5">
            <Button size="large" type="primary" htmlType="submit" shape="round" disabled={!checked}>Sign up</Button>
          </div>
          <div className="d-flex justify-content-center my-5">
            <p className="text-muted">I am already a member, <Link to="/auth/login">Log in here</Link></p>
          </div>
      </Form>
    </LeftContentWrapper>
  )
}

Signup.propTypes = {
  disabled        : PropTypes.bool.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit    : PropTypes.func.isRequired,
  loading         : PropTypes.bool.isRequired,
  message         : PropTypes.object,
}

export default connect()(withRouter(Signup))
