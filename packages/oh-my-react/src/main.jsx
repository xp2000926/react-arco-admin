import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './store/index.js';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  //Provider可以将store透传下去
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
