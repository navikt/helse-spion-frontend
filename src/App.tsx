import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';
import { ArbeidsgiverProvider } from '@navikt/helse-arbeidsgiver-felles-frontend';
import i18n from './locales/i18n';
import Redirecter from './components/Redirecter';
import StoreProvider from './data/store/StoreProvider';
import './App.sass';
import env from './Environment';
import Personoppslag from './components/Personoppslag';

const App = () => {
  return (
    // <EnvironmentProvider loginServiceUrl={env.loginServiceUrl} sideTittel={'Min side - Refusjonsportal'}
    //                      basePath={env.baseUrl}>
    <I18nextProvider i18n={i18n}>
      <StoreProvider>
        <ArbeidsgiverProvider baseUrl={env.baseUrl}>
          <Switch>
            <Route path='/personoppslag' render={() => <Personoppslag />} />
            <Route path='/' render={() => <Redirecter />} />
          </Switch>
        </ArbeidsgiverProvider>
      </StoreProvider>
    </I18nextProvider>
    // </EnvironmentProvider>
  );
};

export default App;
