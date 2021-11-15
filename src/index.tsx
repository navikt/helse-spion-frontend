import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import env, { EnvironmentType } from './Environment';

if (env.environmentMode !== EnvironmentType.LOCAL) {
  Sentry.init({
    dsn: 'https://1fc3da75f22d4356adcfd1a7f7e841f2@sentry.gc.nav.no/49',
    environment: EnvironmentType[env.environmentMode],
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.5
  });
}

ReactDOM.render(
  <BrowserRouter basename='min-side-refusjon'>
    <App />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
