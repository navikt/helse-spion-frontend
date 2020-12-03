import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import * as Sentry from '@sentry/browser';
import env, { EnvironmentType } from './Environment';

Sentry.init({
  dsn: 'https://1fc3da75f22d4356adcfd1a7f7e841f2@sentry.gc.nav.no/49',
  environment: EnvironmentType[env.environmentMode],
});

ReactDOM.render(
  <BrowserRouter basename="min-side-refusjon">
    <App />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
