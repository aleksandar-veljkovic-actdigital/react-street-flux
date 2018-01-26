import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Articles from './components/articles';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
  (
    <React.Fragment>
      <header>

      </header>
      <main>
        <BrowserRouter>
          <Route path="/" component={Articles}/>
        </BrowserRouter>
      </main>
    </React.Fragment>
  )
  , document.getElementById('root')
);

registerServiceWorker();
