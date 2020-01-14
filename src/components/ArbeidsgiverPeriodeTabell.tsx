import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "../store/rootState";
import 'nav-frontend-tabell-style';
import 'nav-frontend-skjema-style';
import { ArbeidsgiverPeriode, Person } from "../store/types/helseSpionTypes";
import { Input } from "nav-frontend-skjema";
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import './ArbeidsgiverPeriodeTabell.less';
import Lenke from "nav-frontend-lenker";
import { Innholdstittel, Normaltekst, Sidetittel } from "nav-frontend-typografi";
import 'nav-frontend-alertstriper-style';
import Ikon from 'nav-frontend-ikoner-assets';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setFom, setTom } from "../store/actions/helseSpionActions";
import nb from 'date-fns/locale/nb';
import { fetchPerson } from "../store/thunks/fetchPerson";

registerLocale('nb', nb);

interface OwnProps {

}

type StateProps = {
  person?: Person
  fom?: Date
  tom?: Date
}

type DispatchProps = {
  fetchPerson: (fødselsnummerSøk: string) => void
  setFom: (date: Date) => void
  setTom: (date: Date) => void
}

type Props = OwnProps & StateProps & DispatchProps;

type State = {
  fødselsnummerSøk: string
}

class ArbeidsgiverPeriodeTabell extends Component<Props, State> {
  constructor(p) {
    super(p);
    this.state = {
      fødselsnummerSøk: '',
    }
  }
  
  setFødselsnummerSøk = (input: string) => {
    input = input.replace(/\D/g,'').substring(0, 11);
    this.setState({ fødselsnummerSøk: input });
  };
  
  render() {
    const { person, fom, tom } = this.props;
    
    const filteredPerioder: ArbeidsgiverPeriode[] = person
      ? person.arbeidsgiverPerioder.filter(periode => fom
        ? periode.fom > fom
        : periode
      ).filter(periode => tom
        ? periode.tom < tom
        : periode
      )
      : [];
    
    const table =
      <table className="tabell tabell--stripet arbeidsgiver-periode-tabell--tabell">
        <thead>
        <tr>
          <th>Periode</th>
          <th>Status</th>
          <th>Beløp</th>
          <th>Ytelse</th>
          <th>Grad</th>
          <th>Merknad</th>
        </tr>
        </thead>
        <tbody>
          {
            filteredPerioder.map((periode, index ) => {
                return <tr key={index}>
                  <td>{periode.fom.toLocaleDateString('nb')} - {periode.tom.toLocaleDateString('nb')}</td>
                  <td>{periode.status}</td>
                  <td>{periode.referanseBeløp}</td>
                  <td>{periode.ytelse}</td>
                  <td>{periode.grad}</td>
                  <td>{periode.merknad}</td>
                </tr>
              }
            )
          }
        </tbody>
      </table>;

    return (
      <div className="arbeidsgiver-periode-tabell">
        <div className="arbeidsgiver-periode-tabell--banner">
          <div className="container">
            <div className="row arbeidsgiver-periode-tabell--banner-rad">
              <div className="col-sm-8">
                <Sidetittel id="arbeidsgiver-periode-tabell--tittel">Min side - refusjoner</Sidetittel>
              </div>
              <div className="col-sm-4 alertstripe--info arbeidsgiver-periode-tabell--alertstripe">
                <Ikon kind="info-sirkel-fyll"></Ikon>
                <div>
                  <Normaltekst className="arbeidsgiver-periode-tabell--email">
                    <u>bjørn.byråkrat@oslo.kommune.no</u>
                  </Normaltekst>
                  <Normaltekst>Grünerløkka pleiehjem</Normaltekst>
                  <Normaltekst>
                    org. nr. 12345678912 <Lenke className="arbeidsgiver-periode-tabell--lenke" href="">Endre</Lenke>
                  </Normaltekst>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <Lenke href="">&lt;&lt; Alle refusjoner</Lenke>
              <div className="arbeidsgiver-periode-tabell--header">
                <div className="arbeidsgiver-periode-tabell--info-gruppe">
                  {
                    person &&
                    <>
                      <div className="arbeidsgiver-periode-tabell--person-nummer">Personnummer: {person?.fødselsnummer}</div>
                      <Innholdstittel id="arbeidsgiver-periode-tabell--person-navn">
                        {person?.fornavn} {person?.etternavn}
                      </Innholdstittel>
                    </>
                  }
                </div>
                <div className="arbeidsgiver-periode-tabell--søke-gruppe">
                  <Input
                    className="arbeidsgiver-periode-tabell--søke-input"
                    label="Finn en annen ansatt"
                    placeholder="Personnummer 11 siffer"
                    onChange={e => this.setFødselsnummerSøk(e.target.value)}
                    value={this.state.fødselsnummerSøk}
                  />
                  <Søkeknapp
                    className="arbeidsgiver-periode-tabell--søke-knapp"
                    onClick={() => this.props.fetchPerson(this.state.fødselsnummerSøk)}
                  />
                </div>
              </div>
              <div className="arbeidsgiver-periode-tabell--periode-velger">
                <div>Periode:</div>
                <DatePicker
                  locale="nb"
                  dateFormat="dd.MM.yyyy"
                  selected={this.props.fom}
                  onChange={e => this.props.setFom(e)}
                />
                <b>-</b>
                <DatePicker
                  locale="nb"
                  dateFormat="dd.MM.yyyy"
                  selected={this.props.tom}
                  onChange={e => this.props.setTom(e)}
                />
                <div className="arbeidsgiver-periode-tabell--periode-velger-total">Total refundert: <b>21.500</b></div>
                <div className="arbeidsgiver-periode-tabell--periode-velger-max-dato">Maxdato: <b>15.03.20</b></div>
              </div>
              {table}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  person: state.helseSpionState.person,
  fom: state.helseSpionState.fom,
  tom: state.helseSpionState.tom,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => bindActionCreators({
  fetchPerson: fetchPerson,
  setFom: setFom,
  setTom: setTom,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ArbeidsgiverPeriodeTabell);
