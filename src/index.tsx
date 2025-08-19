/*
Copyright (c) 2025 Bosla

All rights reserved.
This software and brand ("Bosla") are proprietary and under development as part of a private company initiative.
The company is currently in pre-registration status and not yet formally incorporated.
No part of this software, its name, or associated trademarks may be copied, modified, or redistributed without explicit permission from Bosla.
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // ✅ استيراد BrowserRouter

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
