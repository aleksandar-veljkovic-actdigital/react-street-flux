import React, { Component } from 'react';

//import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faBinoculars, faSignInAlt, faSignOutAlt, faCamera, faSpinner} from '@fortawesome/fontawesome-free-solid'
import { Route, Link,  Switch } from 'react-router-dom';

import './App.scss';
import Articles from './article/Articles';
import Login from './user/Login';
import Logout from './user/Logout';

import UserStore from "./user/UserStore";
import * as RequestActions from "../actions/RequestActions"

class App extends Component {

  constructor(props) {
    super(props);
    this.setUser = this.setUser.bind(this);
    this.state = {
      user: false
    }
    RequestActions.userFetch();
    window.__app = this;
    //console.log(require('@fortawesome/fontawesome-free-solid'))
  }

  componentWillMount() {
    UserStore.on('change', this.setUser)
  }

  componentWillUnmount() {
    UserStore.removeListener("change", this.setUser);
  }

  setUser() {
    let user = UserStore.get();
    this.setState({user: user});
  }

  loginLogout() {
    if (!this.state.user) {
      return (<span><FontAwesomeIcon icon={faSpinner} size="2x" spin /></span>)
    }
    else if (this.state.user.uid === 0) {
      return (<Link to="/login"><FontAwesomeIcon icon={faSignInAlt} size="2x" /></Link>)
    }
    else {
      return (<Link to="/logout"><FontAwesomeIcon icon={faSignOutAlt} size="2x" /></Link>)
    }
  }

  render() {
    return (
      <div id="#container" className="container">
        <header id="header">
          <div className="left">
            <Link to="/"><FontAwesomeIcon icon={faBinoculars} size="2x" /></Link>
            <a href="/shoot"><FontAwesomeIcon icon={faCamera} size="2x" /></a>
          </div>
          <div className="right">
            {this.loginLogout()}
          </div>
        </header>
        <main id="main">
          <Switch>
            <Route exact path="/" component={Articles}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
