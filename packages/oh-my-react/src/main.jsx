import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store } from './store/index.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  //Provider可以将store透传下去
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
