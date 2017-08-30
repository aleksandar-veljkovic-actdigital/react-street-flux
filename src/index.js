import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Articles from './components/articles';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
  (
    <BrowserRouter>
      <Route path="/" component={Articles}/>
    </BrowserRouter>
  )
  , document.getElementById('root')
);

registerServiceWorker();
