import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary.tsx';
import AppRoutes from './router.tsx';
import { store } from './store/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
