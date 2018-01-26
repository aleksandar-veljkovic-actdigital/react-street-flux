import React from 'react';
import ReactDOM from 'react-dom';
import { /*HashRouter,*/ BrowserRouter } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import './index.scss';

import App from './components/App'

ReactDOM.render(
  (
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  )
  , document.getElementById('root')
);

registerServiceWorker();
