import React, { Component } from 'react';

//import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faBinoculars, faSignInAlt, faSignOutAlt, faCamera} from '@fortawesome/fontawesome-free-solid'
import { Route, Link,  Switch } from 'react-router-dom';

import './App.scss';
import Articles from './articles';
import Login from './login';

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <header id="header">
          <div className="left">
            <Link to="/"><FontAwesomeIcon icon={faBinoculars} size="2x" /></Link>
            <a href="/shoot"><FontAwesomeIcon icon={faCamera} size="2x" /></a>
          </div>
          <div className="right">
            <Link to="/login"><FontAwesomeIcon icon={faSignInAlt} size="2x" /></Link>
            <a href="/logout"><FontAwesomeIcon icon={faSignOutAlt} size="2x" /></a>
          </div>
        </header>
        <main id="main">
          <Switch>
            <Route exact path="/" component={Articles}/>
            <Route path="/login" component={Login}/>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
