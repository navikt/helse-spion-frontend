// import React from 'react';
// import { I18nextProvider } from 'react-i18next';
// import { Route, Switch } from 'react-router-dom';
// import { ArbeidsgiverProvider } from '@navikt/helse-arbeidsgiver-felles-frontend';
// import i18n from './locales/i18n';
// import Redirecter from './components/Redirecter';
// import StoreProvider from './data/store/StoreProvider';
// import './App.sass';
// import env from './Environment';
// import Personoppslag from './components/Personoppslag';

// const App = () => {
//   return (
//     // <EnvironmentProvider loginServiceUrl={env.loginServiceUrl} sideTittel={'Min side - Refusjonsportal'}
//     //                      basePath={env.baseUrl}>
//     <I18nextProvider i18n={i18n}>
//       <StoreProvider>
//         <ArbeidsgiverProvider baseUrl={env.baseUrl}>
//           <Switch>
//             <Route path='/personoppslag' render={() => <Personoppslag />} />
//             <Route path='/' render={() => <Redirecter />} />
//           </Switch>
//         </ArbeidsgiverProvider>
//       </StoreProvider>
//     </I18nextProvider>
//     // </EnvironmentProvider>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import env from './Environment';
import {
  ArbeidsgiverStatus,
  ArbeidsgiverProvider,
  LoginProvider,
  LoginStatus
} from '@navikt/helse-arbeidsgiver-felles-frontend';

import Personoppslag from './components/Personoppslag';
import Redirecter from './components/Redirecter';
import StoreProvider from './data/store/StoreProvider';

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
        <Switch>
          <Route path='/personoppslag' render={() => <Personoppslag />} />
          <Route path='/' render={() => <Redirecter />} />
        </Switch>
      </StoreProvider>
    </ArbeidsgiverProvider>
  </LoginProvider>
);

const App = () => (
  <BrowserRouter basename='fritak-agp'>
    <Application />
  </BrowserRouter>
);

export default App;
