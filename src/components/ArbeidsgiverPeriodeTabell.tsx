import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "../store/rootState";
import 'nav-frontend-tabell-style';
import 'nav-frontend-skjema-style';
import { Person} from "../store/types/helseSpionTypes";
import { fetchPerson } from "../store/actions/helseSpionActions";
import { Input } from "nav-frontend-skjema";
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import './ArbejdsgiverPeriodeTabell.less';
import Lenke from "nav-frontend-lenker";
import { Innholdstittel, Sidetittel } from "nav-frontend-typografi";

interface OwnProps {

}

type StateProps = {
  fødselsnummerSøk?: string
  person?: Person
}

type DispatchProps = {
  fetchPerson: () => void
}

type Props = OwnProps & StateProps & DispatchProps;

class ArbeidsgiverPeriodeTabell extends Component<Props> {
  table =
    <table className="tabell tabell--stripet">
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
          <Sidetittel id="arbeidsgiver-periode-tabell--titel">Min side - refusjoner</Sidetittel>
        </div>
        <Lenke className="arbeidsgiver-periode-tabell--lenke" href="">&lt;&lt; Alle refusjoner</Lenke>
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
        {this.table}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  fødselsnummerSøk: state.helseSpionState.fødselsnummerSøk,
  person: state.helseSpionState.person,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => bindActionCreators({
  fetchPerson: fetchPerson,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ArbeidsgiverPeriodeTabell);
