import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {store} from './store';
import App from './components/app/app';
import {fetchProductsAction, fetchPromoProductsAction} from './store/api-actions';

store.dispatch(fetchProductsAction()).then((response) => {
  if (response.meta.requestStatus === 'fulfilled') {
    store.dispatch(fetchPromoProductsAction());
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
