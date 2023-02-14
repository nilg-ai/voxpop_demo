import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey="6Lc-dn8kAAAAAOotjI9flVy3gSivuHP2ZjbXwksZ">
      <App />
      <GoogleReCaptcha
        onVerify={token => {
          console.log("🚀  file: ReCaptcha.tsx:20  token", token)
        }}
      />
    </GoogleReCaptchaProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
