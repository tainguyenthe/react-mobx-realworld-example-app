import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Icon, Input, Button } from "antd";
import { withRouter, Link } from "react-router-dom";
import ListErrors from "./ListErrors";

import { inject, observer } from "mobx-react";

@inject("authStore")
@withRouter
@observer
class Login extends Component {
  constructor() {
    super();
    this.state = {
      formLayout: "horizontal"
    };
  }

  componentWillUnmount() {
    this.props.authStore.reset();
  }

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.authStore
          .login()
          .then(() => this.props.history.replace("/"));
      }
    });
  };

  // handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
  // handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);

  // handleSubmitForm = e => {
  //   e.preventDefault();
  //   this.props.authStore.login().then(() => this.props.history.replace("/"));
  // };

  render() {
    const { values, errors, inProgress } = this.props.authStore;
    const { formLayout } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div id="components-form-login">
        <Form
          layout={formLayout}
          onSubmit={this.handleSubmitForm}
          className="login-form"
        >
          <h1>Login Form</h1>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: "Please input your email!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your Password!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Link className="login-form-register" to={"/register"}>
              Register
            </Link>
            <Link className="login-form-forgot" to={"/forgot"}>
              Forgot password
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={inProgress}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  form: PropTypes.object.isRequired
};

// export default Login;
export default Form.create()(Login);

