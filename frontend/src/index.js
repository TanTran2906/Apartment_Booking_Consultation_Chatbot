import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback";

import { PayPalScriptProvider } from '@paypal/react-paypal-js'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.replace("/")}
        >
          <App />
        </ErrorBoundary>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

