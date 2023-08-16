import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BidContextProvider } from './context/Bid';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BidContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BidContextProvider>
);
