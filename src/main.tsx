import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Use HashRouter for GitHub Pages and BrowserRouter for development
const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;
const basename = import.meta.env.PROD ? '/awesome-scalability-talks' : '/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router basename={basename}>
      <App />
    </Router>
  </React.StrictMode>,
);
