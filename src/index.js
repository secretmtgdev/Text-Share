import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './client/App';
import store from './client/redux/Store';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback='loading'>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Suspense>
);
