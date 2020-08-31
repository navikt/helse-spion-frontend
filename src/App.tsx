import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import { Route, Switch } from 'react-router-dom';
import Redirecter from './components/Redirecter';
import StoreProvider from './data/store/StoreProvider';
import { ArbeidsgiverProvider } from './components/ArbeidsgiverProvider';
import ArbeidsgiverPeriodeTabell from './components/ArbeidsgiverPeriodeTabell';

const App = () => {
  return (
    <StoreProvider>
      <ArbeidsgiverProvider>
          <I18nextProvider i18n={i18n}>
            <Switch>
              <Route path="/personoppslag" render={() => <ArbeidsgiverPeriodeTabell />} />
              <Route path="/" render={() => <Redirecter />} />
            </Switch>
          </I18nextProvider>
      </ArbeidsgiverProvider>
    </StoreProvider>
  );
};

export default App;
