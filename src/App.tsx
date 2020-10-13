import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import { Route, Switch } from 'react-router-dom';
import Redirecter from './components/Redirecter';
import StoreProvider from './data/store/StoreProvider';
import './App.sass';
import {
  ArbeidsgiverProvider,
  EnvironmentProvider,
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import env from './Environment';
import ArbeidsgiverPeriodePage from './pages/ArbeidsgiverPerioderPage';

const App = () => {
  return (
    <StoreProvider>
      <EnvironmentProvider loginServiceUrl={env.loginServiceUrl} >
        <ArbeidsgiverProvider>
          <I18nextProvider i18n={i18n}>
            <Switch>
              <Route path="/personoppslag" render={() => <ArbeidsgiverPeriodePage />} />
              <Route path="/" render={() => <Redirecter />} />
            </Switch>
          </I18nextProvider>
        </ArbeidsgiverProvider>
      </EnvironmentProvider>
    </StoreProvider>
  );
};

export default App;
