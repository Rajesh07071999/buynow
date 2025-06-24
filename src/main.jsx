import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Provider } from 'react-redux';
import { store } from './store';

// Enable Vercel Analytics
import { inject } from '@vercel/analytics';
inject(); 

// Enable Vercel Speed Insights
import { inject as injectSpeed } from '@vercel/speed-insights';
injectSpeed();

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
