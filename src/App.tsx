import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import env from './Environment';
import {
  ArbeidsgiverStatus,
  ArbeidsgiverProvider,
  LoginProvider,
  LoginStatus,
  LanguageProvider
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import i18next from 'i18next';
import translatedKeys from './locales/keys';

import Personoppslag from './components/Personoppslag';
import Redirecter from './components/Redirecter';
import StoreProvider from './data/store/StoreProvider';
import Personoversikt from './components/Personoversikt';
import Person from './components/person';

interface ApplicationProps {
  loginStatus?: LoginStatus;
  arbeidsgiverStatus?: ArbeidsgiverStatus;
  arbeidsgivere?: Array<Organisasjon>;
  basePath?: string;
  loginServiceUrl?: string;
}

export const Application = ({
  loginStatus = LoginStatus.Checking,
  arbeidsgiverStatus = ArbeidsgiverStatus.NotStarted,
  arbeidsgivere,
  basePath = env.baseUrl,
  loginServiceUrl = env.loginServiceUrl
}: ApplicationProps) => (
  <LoginProvider
    baseUrl={basePath}
    status={loginStatus}
    loginServiceUrl={loginServiceUrl}
  >
    <ArbeidsgiverProvider
      baseUrl={basePath}
      status={arbeidsgiverStatus}
      arbeidsgivere={arbeidsgivere}
    >
      <StoreProvider>
        <LanguageProvider
          languages={['nb', 'en']}
          i18n={i18next}
          bundle={translatedKeys}
        >
          <Switch>
            <Route path='/personoppslag' render={() => <Personoppslag />} />
            <Route path='/personoversikt' render={() => <Personoversikt />} />
            <Route path='/person' render={() => <Person />} />
            <Route path='/' render={() => <Redirecter />} />
          </Switch>
        </LanguageProvider>
      </StoreProvider>
    </ArbeidsgiverProvider>
  </LoginProvider>
);

const App = () => (
  <BrowserRouter>
    <Application />
  </BrowserRouter>
);

export default App;
