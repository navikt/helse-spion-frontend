import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "../store/rootState";
import 'nav-frontend-tabell-style';
import 'nav-frontend-skjema-style';
import { Ytelsesperiode } from "../store/types/helseSpionTypes";
import { Input } from "nav-frontend-skjema";
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import './ArbeidsgiverPeriodeTabell.less';
import Lenke from "nav-frontend-lenker";
import { Innholdstittel } from "nav-frontend-typografi";
import 'nav-frontend-alertstriper-style';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchPerson } from "../store/thunks/fetchPerson";
import { identityNumberSeparation } from "../util/identityNumberSeparation";
import AlertStripe from "nav-frontend-alertstriper";
import { withTranslation } from "react-i18next";
import { Keys } from "../locales/keys";
import { filterStringToNumbersOnly } from "../util/filterStringToNumbersOnly";
import YtelsesperiodeTable from "./YtelsesperiodeTable";
import { fetchToken } from "../store/thunks/fetchToken";
import { fetchArbeidsgivere } from "../store/thunks/fetchArbeidsgivere";
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { withRouter } from 'react-router-dom';
import { Organisasjon } from "@navikt/bedriftsmeny/lib/Organisasjon";
import { buildOrganisasjonstre } from "../util/buildOrganisasjonstre";

type OwnProps = {
  t: (str: string) => string
  history: History
}

type StateProps = {
  arbeidsgivere: Organisasjon[]
  ytelsesperioder: Ytelsesperiode[]
  personError: boolean
  tokenFetched: boolean
}

type DispatchProps = {
  fetchPerson: (identityNumber: string) => void
  fetchToken: () => void
  fetchArbeidsgivere: () => void
}

type Props = OwnProps & StateProps & DispatchProps;

type State = {
  identityNumberInput: string
  fom?: Date
  tom?: Date
}

class ArbeidsgiverPeriodeTabell extends Component<Props, State> {
  state: State = {
    identityNumberInput: '',
  };
  
  componentDidMount = async (): Promise<void> => {
    await this.props.fetchToken();
    if (this.props.tokenFetched) {
      this.props.fetchArbeidsgivere();
    }
  };
  
  setIdentityNumberInput = (input: string) =>
    this.setState({ identityNumberInput: filterStringToNumbersOnly(input, 11) });
  
  onEnterClick = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.submitSearch();
    }
  };
  
  submitSearch = (): void => {
    this.setState({ fom: undefined, tom: undefined });
    this.props.fetchPerson(this.state.identityNumberInput);
  };
  
  render() {
    const { t, history, arbeidsgivere, ytelsesperioder, personError } = this.props;
    const { identityNumberInput, fom, tom } = this.state;
    const arbeidstaker = ytelsesperioder[0]?.arbeidsforhold.arbeidstaker;
    
    return (
      <div className="arbeidsgiver-periode-tabell">
        <Bedriftsmeny
          history={history}
          onOrganisasjonChange={e => {}}
          sidetittel={'Min side - refusjoner'}
          organisasjoner={arbeidsgivere}
        />
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <Lenke href="">&lt;&lt; {t(Keys.ALL_REFUNDS)}</Lenke>
              <div className="arbeidsgiver-periode-tabell--header">
                <div className="arbeidsgiver-periode-tabell--info-gruppe">
                  {
                    arbeidstaker &&
                    <>
                      <div className="arbeidsgiver-periode-tabell--person-nummer">
                        {t(Keys.IDENTITY_NUMBER)}: {identityNumberSeparation(arbeidstaker.identitetsnummer)}
                      </div>
                      <Innholdstittel id="arbeidsgiver-periode-tabell--person-navn">
                        {arbeidstaker.fornavn} {arbeidstaker.etternavn}
                      </Innholdstittel>
                    </>
                  }
                </div>
              </div>
              <div className="arbeidsgiver-periode-tabell--søke-gruppe">
                <div className="arbeidsgiver-periode-tabell--periode-velger">
                  <div id="periode">{t(Keys.PERIOD)}:</div>
                  <DatePicker
                    locale="nb"
                    dateFormat="dd.MM.yy"
                    selected={fom}
                    onChange={e => this.setState({ fom: e })}
                    showYearDropdown
                    ariaLabelledBy="periode fra"
                  />
                  <b>-</b>
                  <DatePicker
                    locale="nb"
                    dateFormat="dd.MM.yy"
                    selected={tom}
                    onChange={e => this.setState({ tom: e })}
                    showYearDropdown
                    ariaLabelledBy="periode til"
                  />
                </div>
                <Input
                  className="arbeidsgiver-periode-tabell--søke-input"
                  label={t(Keys.FIND_OTHER_EMPLOYEE)}
                  placeholder={t(Keys.IDENTITY_NUMBER_EXT)}
                  onChange={e => this.setIdentityNumberInput(e.target.value)}
                  value={identityNumberSeparation(identityNumberInput)}
                  onKeyDown={this.onEnterClick}
                />
                <Søkeknapp
                  className="arbeidsgiver-periode-tabell--søke-knapp"
                  onClick={this.submitSearch}
                >
                  <span>{t(Keys.SEARCH)}</span>
                </Søkeknapp>
              </div>
              { personError && <AlertStripe type="feil">{t(Keys.ERROR)}</AlertStripe> }
              {
                ytelsesperioder.length > 0 &&
                <YtelsesperiodeTable ytelsesperioder={ytelsesperioder} fom={fom} tom={tom}/>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  arbeidsgivere: state.helseSpionState.arbeidsgivere,
  ytelsesperioder: state.helseSpionState.ytelsesperioder,
  personError: state.helseSpionState.personError,
  tokenFetched: state.helseSpionState.tokenFetched,
  
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => bindActionCreators({
  fetchPerson,
  fetchToken,
  fetchArbeidsgivere,
}, dispatch);

export default withRouter(withTranslation()(connect(mapStateToProps, mapDispatchToProps)(ArbeidsgiverPeriodeTabell)));
