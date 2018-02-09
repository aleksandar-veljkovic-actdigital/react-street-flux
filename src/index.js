import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, /*BrowserRouter as Router*/ } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import './index.scss';

import App from './components/App'

ReactDOM.render(
  (
    <Router>
      <App/>
    </Router>
  )
  , document.getElementById('root')
);

registerServiceWorker();
