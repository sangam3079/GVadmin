import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import OverlaySpinner from 'commons/OverlaySpinner'
import { HeaderText, LeftContentWrapper } from 'components/commons/AuthAndWizard'
import {Form, Input, Button, Checkbox } from 'antd'
import {connect} from 'react-redux';
import { login } from 'services/profile'
import {setTokenValue} from 'services/url'
import setSession from '../commons/setSession'

const Login = ({
  disabled,
  message,
  dispatch,
  history
}) => {
  const infoMessage = 'Don\'t have an account with us?'

const [form] = Form.useForm();
const [remember_me, setRemember] = useState(true);
const [loading, setLoading] = useState(false);

const handleFormFail = err => {
  console.log(err)
}

console.log('at login');

const handleFormSubmit = value => {
  let params = {
    remember_me,
    ...value
  }
  // console.log(values);
  setLoading(true);
  dispatch(login({params, setTokenValue, setSession, callback : handleCallback}))
}

const handleCallback = () => {
  setLoading(true)
  history.push('/')
}

const handleRememberMe = e => {
  let checked = e.target.checked
  setRemember(checked);
}

  return (
    <LeftContentWrapper>
      <HeaderText message={message} text="Login" subText="Please enter your credentials" />
      <OverlaySpinner loading={loading} />
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFormSubmit}
        onFinishFailed={handleFormFail}
        name="login_form"
      >
      <div className="row">
        <div className="col-lg-12">
          <Form.Item
            label="Email"
            name="email"
            rules={[{required : true, message : 'Email is required'}]}
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
      <div className="d-flex justify-content-between">
        <div className="">
          <Checkbox defaultChecked={true} onChange={handleRememberMe} value={remember_me}/><span className="mx-2">Remember me</span>
        </div>
        <div className="">
          <Link to="/auth/forgot-password">Forget password?</Link>
        </div>
      </div>
      <div className="d-flex justify-content-center">
          <Button type="primary" htmlType="submit" size="large" shape="round">Log in</Button>
      </div>
      <div className="mt-5 d-flex justify-content-center">
        <p className="text-muted">New to goodvibes? <Link to="/auth/signup">Register here</Link></p>
      </div>
      </Form>

    </LeftContentWrapper>
  )
}

Login.propTypes = {
  disabled        : PropTypes.bool.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit    : PropTypes.func.isRequired,
  loading         : PropTypes.bool.isRequired,
  message         : PropTypes.object,
}

export default connect()(withRouter(Login))
