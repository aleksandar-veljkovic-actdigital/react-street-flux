import React, { Component } from 'react';
import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.css'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/fontawesome-free-solid'

import UserStore from "./UserStore";
import * as RequestActions from "../../actions/RequestActions"

const Styled = styled.div`
  .spinner {
    opacity: .4;
    text-align: center;
    padding-top: 25vh;
  }
}
`;

class Logout extends Component {

  constructor(props) {
    super(props);
    RequestActions.userLogout();
    this.conditionalRedirect = this.conditionalRedirect.bind(this);
  }

  conditionalRedirect () {
    let user = UserStore.get();
    console.log("LOGOUT", user)
    if (user && user.uid === 0) {
      console.log('this.props.history');
      this.props.history.replace('/login');
    }
  }

  componentWillMount() {
    UserStore.on('change', this.conditionalRedirect)
  }

  componentWillUnmount() {
    UserStore.removeListener("change", this.conditionalRedirect);
  }

  render() {
    return (

      <Styled>
        <div className="spinner">
          <FontAwesomeIcon icon={faSpinner} size="8x" spin />
        </div>
      </Styled>

    );

  }
}

export default Logout;
