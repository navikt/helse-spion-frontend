import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducers } from "./store/rootState";
import ArbeidsgiverPeriodeTabell from "./components/ArbeidsgiverPeriodeTabell";
import { I18nextProvider } from "react-i18next";
import i18n from "./locales/i18n";

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
export const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <ArbeidsgiverPeriodeTabell/>}/>
          {/*<Route render={() => <404/>}/> // Todo: 404 fallback */}
        </Switch>
      </Router>
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
