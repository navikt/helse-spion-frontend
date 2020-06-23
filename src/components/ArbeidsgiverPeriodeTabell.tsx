import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "../store/rootState";
import 'nav-frontend-tabell-style';
import 'nav-frontend-skjema-style';
import { ErrorType, Ytelsesperiode } from "../store/types/helseSpionTypes";
import { Input } from "nav-frontend-skjema";
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import './ArbeidsgiverPeriodeTabell.less';
import Lenke from "nav-frontend-lenker";
import { Innholdstittel } from "nav-frontend-typografi";
import 'nav-frontend-alertstriper-style';
import "react-datepicker/dist/react-datepicker.css";
import { fetchPerson } from "../store/thunks/fetchPerson";
import { identityNumberSeparation } from "../util/identityNumberSeparation";
import AlertStripe from "nav-frontend-alertstriper";
import { withTranslation } from "react-i18next";
import { Keys } from "../locales/keys";
import { filterStringToNumbersOnly } from "../util/filterStringToNumbersOnly";
import YtelsesperiodeTable from "./YtelsesperiodeTable";
import { fetchArbeidsgivere } from "../store/thunks/fetchArbeidsgivere";
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { withRouter } from 'react-router-dom';
import { Organisasjon } from "@navikt/bedriftsmeny/lib/organisasjon";
import NavFrontendSpinner from 'nav-frontend-spinner';

type OwnProps = {
  t: (str: string) => string
  history: History
}

type StateProps = {
  arbeidsgivere: Organisasjon[]
  ytelsesperioder: Ytelsesperiode[]
  personErrorType?: string,
  personErrorMessage?: string,
  personLoading: boolean,
}

type DispatchProps = {
  fetchPerson: (identityNumber?: string, arbeidsgiverId?: string) => void
  fetchArbeidsgivere: () => void
}

type Props = OwnProps & StateProps & DispatchProps;

type State = {
  identityNumberInput: string
  arbeidsgiverId: string
}

class ArbeidsgiverPeriodeTabell extends Component<Props, State> {
  state: State = {
    identityNumberInput: '',
    arbeidsgiverId: '',
  };
  
  componentDidMount = async (): Promise<void> => {
    this.props.fetchArbeidsgivere();
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
    this.props.fetchPerson(this.state.identityNumberInput, this.state.arbeidsgiverId);
  };
  
  render() {
    const {
      t, history, arbeidsgivere, ytelsesperioder, personErrorType, personErrorMessage, personLoading
    } = this.props;
    const { identityNumberInput } = this.state;
    const arbeidstaker = ytelsesperioder[0]?.arbeidsforhold.arbeidstaker;

    if (arbeidstaker) {
      document.title = `${t(Keys.REFUNDS)}/${arbeidstaker.fornavn} ${arbeidstaker.etternavn} - www.nav.no`;
    } else {
      document.title = `${t(Keys.DOCUMENT_TITLE)}/${t(Keys.REFUNDS)} - www.nav.no`;
    }

    return (
      <div className="arbeidsgiver-periode-tabell">
        <Bedriftsmeny
          history={history}
          onOrganisasjonChange={(org: Organisasjon) => this.setState({arbeidsgiverId: org.OrganizationNumber})}
          sidetittel={t(Keys.MY_PAGE)}
          organisasjoner={arbeidsgivere}
        />
        <div className="container">
          <Lenke href="">&lt;&lt; {t(Keys.ALL_REFUNDS)}</Lenke>
          <div className="arbeidsgiver-periode-tabell--header">
            <div className="arbeidsgiver-periode-tabell--søke-gruppe">
                {
                    arbeidstaker ?
                        <>
                            <div className="container-sm">
                                <div className="arbeidsgiver-periode-tabell--person-nummer">
                                    {t(Keys.IDENTITY_NUMBER)}: {identityNumberSeparation(arbeidstaker.identitetsnummer)}
                                </div>
                                <Innholdstittel id="arbeidsgiver-periode-tabell--person-navn">
                                    {arbeidstaker.fornavn} {arbeidstaker.etternavn}
                                </Innholdstittel>
                            </div>
                            <div className="container-sm">
                                <div>Max refunderbare dager</div>
                                <Innholdstittel id="arbeidsgiver-periode-tabell--max-dager">2</Innholdstittel>
                            </div>
                        </>
                        :
                        <>
                            <div/>
                            <div/>
                        </>
                }
                <div className="container-sm arbeidsgiver-periode-tabell--person-gruppe">
                <div>
                  <Input
                    className="arbeidsgiver-periode-tabell--søke-input container-sm"
                    label={t(Keys.FIND_OTHER_EMPLOYEE)}
                    placeholder={t(Keys.IDENTITY_NUMBER_EXT)}
                    onChange={e => this.setIdentityNumberInput(e.target.value)}
                    value={identityNumberSeparation(identityNumberInput)}
                    onKeyDown={this.onEnterClick}
                  />
                </div>
                <div>
                  <label className="skjemaelement__label">&nbsp;</label>
                  <Søkeknapp
                    disabled={this.state.identityNumberInput.length < 11 || personLoading }
                    className="arbeidsgiver-periode-tabell--søke-knapp"
                    onClick={this.submitSearch}
                  >
                    <span>{t(Keys.SEARCH)}</span>
                  </Søkeknapp>
                </div>
                </div>
            </div>
          </div>
      </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              {
                personErrorType &&
                (
                  personErrorType in ErrorType
                    ? <AlertStripe type="feil">{t(personErrorType)}</AlertStripe>
                    : <AlertStripe type="feil">{personErrorMessage}</AlertStripe>
                )
              }
              {
                personLoading &&
                <div className="arbeidsgiver-periode-tabell--loading-spinner"> <NavFrontendSpinner /> </div>
              }
              {
                ytelsesperioder.length > 0 && !personLoading &&
                <YtelsesperiodeTable ytelsesperioder={ytelsesperioder}/>
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
  personErrorType: state.helseSpionState.personErrorType,
  personErrorMessage: state.helseSpionState.personErrorMessage,
  personLoading: state.helseSpionState.personLoading
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => bindActionCreators({
  fetchPerson,
  fetchArbeidsgivere,
}, dispatch);

export default withRouter(withTranslation()(connect(mapStateToProps, mapDispatchToProps)(ArbeidsgiverPeriodeTabell)));
