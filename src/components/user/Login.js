import React, { Component } from 'react';
import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.css';

import * as RequestActions from "../../actions/RequestActions"
import UserStore from "./UserStore";

/* eslint-disable import/extensions, import/no-unresolved, import/no-extraneous-dependencies */
import {
  //Checkbox,
  //CheckboxGroup,
  Input,
  //RadioGroup,
  //Row,
  //Select,
  //File,
  //Textarea,
  Form,
} from 'formsy-react-components';
/* eslint-enable */

const Styled = styled.div`
.login-form {
  padding-top: 15vh;
  .btn-submit-w {
    padding-top: 2rem;
    .btn-submit {
      width: 100%;
    }
  }
}
`;

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      user: false
    };
    window.__login = this;
    this.loginError = this.loginError.bind(this)
    this.onSubmit = this.onSubmit.bind(this);
    this.conditionalRedirect = this.conditionalRedirect.bind(this);
    this.conditionalRedirect()
  }

  componentWillMount() {
    UserStore.on('loginError', this.loginError);
    UserStore.on('change', this.conditionalRedirect);
  }

  componentWillUnmount() {
    UserStore.removeListener("loginError", this.loginError);
    UserStore.removeListener('change', this.conditionalRedirect);
  }

  loginError () {
    console.log("LOGIN :: loginError")
    this.setState({message: UserStore.message()})
  }

  conditionalRedirect () {
    let user = UserStore.get();
    if (user && user.uid !== 0) {
      this.props.history.replace('/');
    }
  }

  onSubmit(data) {
    console.log(this)
    //RequestActions.login.bind(this)(data.username, data.password);
    RequestActions.userLogin(data.username, data.password);
  }

  message() {
    if (this.state.message) {
      return(
        <div className="alert alert-danger">{this.state.message}</div>
      )
    }
  }

  render() {
    return (
      <Styled>
        <Form
          onValidSubmit={this.onSubmit}
          layout='vertical'
          className='login-form'>
          {this.message()}
          <Input
            name="username"
            type="text"
            label="username"
            placeholder="your username here..."
            validationError="username cannot be empty."
            required
          />
          <Input
            name="password"
            type="password"
            label="password"
            placeholder="your pass here..."
            required
          />
          <div className='form-group btn-submit-w'>
            <input
              className="btn btn-submit btn-primary"
              formNoValidate
              type="submit"
              defaultValue="Login"
            />
          </div>
        </Form>
      </Styled>
    );

  }
}

export default Login;
