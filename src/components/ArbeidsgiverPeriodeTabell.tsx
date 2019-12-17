import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "../store/rootState";
import 'nav-frontend-tabell-style';
import 'nav-frontend-skjema-style';
import { Person} from "../store/types/helseSpionTypes";
import { Input } from "nav-frontend-skjema";
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import './ArbeidsgiverPeriodeTabell.less';
import Lenke from "nav-frontend-lenker";
import { Innholdstittel, Normaltekst, Sidetittel } from "nav-frontend-typografi";
import 'nav-frontend-alertstriper-style';
import Ikon from 'nav-frontend-ikoner-assets';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {fetchPerson, setFOM, setTOM} from "../store/actions/helseSpionActions";
import nb from 'date-fns/locale/nb';
import { registerLocale } from  "react-datepicker";
registerLocale('nb', nb)

interface OwnProps {

}

type StateProps = {
  fødselsnummerSøk?: string
  person?: Person
  fom?: Date
  tom?: Date
}

type DispatchProps = {
  fetchPerson: () => void
  setFOM: (date: Date) => void
  setTOM: (date: Date) => void
}

type Props = OwnProps & StateProps & DispatchProps;

class ArbeidsgiverPeriodeTabell extends Component<Props> {
  table =
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
      <tr>
        <td>17.12-19 - 01.01.20</td>
        <td>Under behandling</td>
        <td>-</td>
        <td>SP</td>
        <td>100%</td>
        <td>-</td>
      </tr>
      <tr>
        <td>10.03.19 - 07.04.19</td>
        <td>Avslått</td>
        <td>0,-</td>
        <td>PP</td>
        <td>-</td>
        <td>-</td>
      </tr>
      <tr>
        <td>21.01.19 - 02.03.19</td>
        <td>Innvilget</td>
        <td>9.500,-</td>
        <td>PP</td>
        <td>50%</td>
        <td>-</td>
      </tr>
      <tr>
        <td>21.01.19 - 02.03.19</td>
        <td>Innvilget</td>
        <td>12.000,-</td>
        <td>SP</td>
        <td>50%</td>
        <td>Fritak AGP</td>
      </tr>
      </tbody>
    </table>;

  render() {
    const { fødselsnummerSøk, person } = this.props;

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
                    <u> bjørn.byråkrat@oslo.kommune.no</u>
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
                  <div className="arbeidsgiver-periode-tabell--person-nummer">Personnummer: 12345678912</div>
                  <Innholdstittel id="arbeidsgiver-periode-tabell--person-navn">Ola Nordmann</Innholdstittel>
                </div>
                <div className="arbeidsgiver-periode-tabell--søke-gruppe">
                  <Input
                    className="arbeidsgiver-periode-tabell--søke-input"
                    label="Finn en annen ansatt"
                    placeholder="Personnummer 11 siffer"
                  />
                  <Søkeknapp className="arbeidsgiver-periode-tabell--søke-knapp"></Søkeknapp>
                </div>
              </div>
              <div>
                <DatePicker
                  locale="nb"
                  selected={this.props.fom}
                  onChange={e => this.props.setFOM(e)}
                />
                <DatePicker
                  locale="nb"
                  selected={this.props.tom}
                  onChange={e => this.props.setTOM(e)}
                />
              </div>
              {this.table}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  fødselsnummerSøk: state.helseSpionState.fødselsnummerSøk,
  person: state.helseSpionState.person,
  fom: state.helseSpionState.fom,
  tom: state.helseSpionState.tom,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => bindActionCreators({
  fetchPerson: fetchPerson,
  setFOM: setFOM,
  setTOM: setTOM,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ArbeidsgiverPeriodeTabell);
