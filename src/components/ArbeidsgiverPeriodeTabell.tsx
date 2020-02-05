import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "../store/rootState";
import 'nav-frontend-tabell-style';
import 'nav-frontend-skjema-style';
import { Sak } from "../store/types/helseSpionTypes";
import { Input } from "nav-frontend-skjema";
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import './ArbeidsgiverPeriodeTabell.less';
import Lenke from "nav-frontend-lenker";
import { Innholdstittel, Normaltekst, Sidetittel } from "nav-frontend-typografi";
import 'nav-frontend-alertstriper-style';
import Ikon from 'nav-frontend-ikoner-assets';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchPerson } from "../store/thunks/fetchPerson";
import { identityNumberSeparation } from "../util/identityNumberSeparation";
import AlertStripe from "nav-frontend-alertstriper";
import { withTranslation } from "react-i18next";
import { Keys } from "../locales/keys";
import { filterStringToNumbersOnly } from "../util/filterStringToNumbersOnly";
import YtelsesperiodeTable from "./YtelsesperiodeTable";

type OwnProps = {
  t: (str: string) => string
}

type StateProps = {
  sak?: Sak
  error: boolean
}

type DispatchProps = {
  fetchPerson: (identityNumber: string) => void
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
    const { t, sak, error } = this.props;
    const { identityNumberInput, fom, tom } = this.state;
    
    return (
      <div className="arbeidsgiver-periode-tabell">
        <div className="arbeidsgiver-periode-tabell--banner">
          <div className="container">
            <div className="row arbeidsgiver-periode-tabell--banner-rad">
              <div className="col-sm-8">
                <Sidetittel id="arbeidsgiver-periode-tabell--tittel">{t(Keys.MY_PAGE)}</Sidetittel>
              </div>
              <div className="col-sm-4 alertstripe--info arbeidsgiver-periode-tabell--alertstripe">
                <Ikon kind="info-sirkel-fyll"/>
                <div>
                  <Normaltekst className="arbeidsgiver-periode-tabell--email">
                    <u>bjørn.byråkrat@oslo.kommune.no</u>
                  </Normaltekst>
                  <Normaltekst>Grünerløkka pleiehjem</Normaltekst>
                  <Normaltekst>
                    org. nr. 12345678912
                    <Lenke className="arbeidsgiver-periode-tabell--lenke" href="">{t(Keys.CHANGE)}</Lenke>
                  </Normaltekst>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <Lenke href="">&lt;&lt; {t(Keys.ALL_REFUNDS)}</Lenke>
              <div className="arbeidsgiver-periode-tabell--header">
                <div className="arbeidsgiver-periode-tabell--info-gruppe">
                  {
                    sak &&
                    <>
                      <div className="arbeidsgiver-periode-tabell--person-nummer">
                        {t(Keys.IDENTITY_NUMBER)}: {identityNumberSeparation(sak.arbeidsgiver.identitetsnummer ?? '')}
                      </div>
                      <Innholdstittel id="arbeidsgiver-periode-tabell--person-navn">
                        {sak.person.fornavn} {sak.person.etternavn}
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
              { error && <AlertStripe type="feil">{t(Keys.ERROR)}</AlertStripe> }
              { sak && <YtelsesperiodeTable ytelsesperioder={sak.ytelsesperioder} fom={fom} tom={tom}/> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  sak: state.helseSpionState.sak,
  error: state.helseSpionState.error,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => bindActionCreators({
  fetchPerson,
}, dispatch);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(ArbeidsgiverPeriodeTabell));
