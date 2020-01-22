import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "../store/rootState";
import 'nav-frontend-tabell-style';
import 'nav-frontend-skjema-style';
import { Sak, Status, Ytelsesperiode } from "../store/types/helseSpionTypes";
import { Input } from "nav-frontend-skjema";
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import './ArbeidsgiverPeriodeTabell.less';
import Lenke from "nav-frontend-lenker";
import { Innholdstittel, Normaltekst, Sidetittel } from "nav-frontend-typografi";
import 'nav-frontend-alertstriper-style';
import Ikon from 'nav-frontend-ikoner-assets';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import nb from 'date-fns/locale/nb';
import { fetchPerson } from "../store/thunks/fetchPerson";
import { thousandSeparation } from "../util/thousandSeparation";
import { identityNumberSeparation } from "../util/identityNumberSeparation";
import AlertStripe from "nav-frontend-alertstriper";

registerLocale('nb', nb);

type StateProps = {
  sak?: Sak
  error: boolean
}

type DispatchProps = {
  fetchPerson: (identitetsnummerSøk: string) => void
}

type Props = StateProps & DispatchProps;

type State = {
  identitetsnummerSøk: string
  sortColumn: number
  sortDescending: boolean
  fom?: Date
  tom?: Date
}

class ArbeidsgiverPeriodeTabell extends Component<Props, State> {
  state = {
    identitetsnummerSøk: '',
    sortColumn: -1,
    sortDescending: true,
    fom: undefined,
    tom: undefined,
  };
  
  setIdentitetsnummerSøk = (input: string) => {
    input = input.replace(/\D/g,'').substring(0, 11);
    this.setState({ identitetsnummerSøk: input });
  };

  onEnterClick = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.submitSøk();
    }
  };

  submitSøk = (): void => {
    this.props.fetchPerson(this.state.identitetsnummerSøk);
  };
  
  setSort = (index: number): void => {
    this.state.sortColumn == index
      ? this.setState({ sortDescending: !this.state.sortDescending })
      : this.setState({ sortColumn: index, sortDescending: true })
  };
  
  getClassnameFromStatus = (status: Status): string => {
    switch (status) {
      case Status.UNDER_BEHANDLING: return 'under-behandling';
      case Status.AVSLÅTT: return 'avslått';
      case Status.INNVILGET: return 'innvilget';
      default: return '';
    }
  };

  render() {
    const { sak, error, } = this.props;
    const { identitetsnummerSøk, sortColumn, sortDescending, fom, tom, } = this.state;
    
    const filteredYtelsesperioder: Ytelsesperiode[] = sak?.ytelsesperioder.filter(ytelsesperiode => fom
      ? ytelsesperiode[0].fom > fom!
      : ytelsesperiode
    ).filter(ytelsesperiode => tom
      ? ytelsesperiode[0].tom < tom!
      : ytelsesperiode
    ) ?? [];
    
    let totalBeløp: number = 0;
    
    filteredYtelsesperioder.map((ytelsesperiode) => {
      totalBeløp += ytelsesperiode.refusjonsbeløp;
    });
    
    const sortedYtelsesperioder: Ytelsesperiode[] = filteredYtelsesperioder.sort((a, b) => {
      let sort: number = 0;
      switch (sortColumn) {
        case 0:
          sort = b.periode.fom.getTime() - a.periode.fom.getTime();
          break;
        case 1:
          sort = b.status.localeCompare(a.status);
          break;
        case 2:
          sort = b.refusjonsbeløp - a.refusjonsbeløp;
          break;
        case 3:
          sort = b.ytelse.localeCompare(a.ytelse);
          break;
        case 4:
          sort = (b.grad ?? -1) - (a.grad ?? 0);
          break;
        case 5:
          sort = (b.merknad ?? '').localeCompare(a.merknad ?? '');
          break;
        default: break;
      }
      return sortDescending ? sort : -sort;
    });
    
    const columnHeaders: string[] = ['Periode', 'Status', 'Beløp', 'Ytelse', 'Grad', 'Merknad'];
    
    const table =
      <table className="tabell tabell--stripet arbeidsgiver-periode-tabell--tabell">
        <thead>
        <tr>
          {
            columnHeaders.map((columnHeader, index) => {
              if (sortColumn == index) {
                return sortDescending
                  ? <th key={index} role="columnheader" className="tabell__th--sortert-desc" aria-sort="descending" onClick={() => this.setSort(index)}><a>{columnHeader}</a></th>
                  : <th key={index} role="columnheader" className="tabell__th--sortert-asc" aria-sort="ascending" onClick={() => this.setSort(index)}><a>{columnHeader}</a></th>
              } else {
                return <th key={index} role="columnheader" aria-sort="none" onClick={() => this.setSort(index)}><a>{columnHeader}</a></th>
              }
            })
          }
        </tr>
        </thead>
        <tbody>
        {
          sortedYtelsesperioder.map((ytelsesperiode, index ) =>
            <tr key={index}>
              <td>{ytelsesperiode.periode.fom.toLocaleDateString('nb')} - {ytelsesperiode.periode.tom.toLocaleDateString('nb')}</td>
              <td>
                <span className={"arbeidsgiver-periode-tabell__sirkel arbeidsgiver-periode-tabell__sirkel--"+this.getClassnameFromStatus(ytelsesperiode.status)}/>
                {ytelsesperiode.status}
              </td>
              <td>{ytelsesperiode.refusjonsbeløp}</td>
              <td>{ytelsesperiode.ytelse}</td>
              <td>{ytelsesperiode.grad}</td>
              <td>{ytelsesperiode.merknad}</td>
            </tr>
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
                    sak &&
                    <>
                      <div className="arbeidsgiver-periode-tabell--person-nummer">
                        Fødselsnummer: {identityNumberSeparation(sak?.arbeidsgiver.identitetsnummer ?? '')}
                      </div>
                      <Innholdstittel id="arbeidsgiver-periode-tabell--person-navn">
                        {sak?.person.fornavn} {sak?.person.etternavn}
                      </Innholdstittel>
                    </>
                  }
                </div>
                <div className="arbeidsgiver-periode-tabell--søke-gruppe">
                  <Input
                    className="arbeidsgiver-periode-tabell--søke-input"
                    label="Finn en annen ansatt"
                    placeholder="Fødselsnummer 11 siffer"
                    onChange={e => this.setIdentitetsnummerSøk(e.target.value)}
                    value={identityNumberSeparation(identitetsnummerSøk)}
                    onKeyDown={this.onEnterClick}
                  />
                  <Søkeknapp
                    className="arbeidsgiver-periode-tabell--søke-knapp"
                    onClick={this.submitSøk}
                  />
                </div>
              </div>
              {
                error
                ? <AlertStripe type="feil">En feil har skjedd. Prøv igjen senere</AlertStripe>
                : <>
                    <div className="arbeidsgiver-periode-tabell--periode-velger">
                      <div id="periode">Periode:</div>
                      <DatePicker
                        locale="nb"
                        dateFormat="dd.MM.yyyy"
                        selected={fom}
                        onChange={e => this.setState({ fom: e })}
                        showYearDropdown
                        ariaLabelledBy="periode"
                      />
                      <b>-</b>
                      <DatePicker
                        locale="nb"
                        dateFormat="dd.MM.yyyy"
                        selected={tom}
                        onChange={e => this.setState({ tom: e })}
                        showYearDropdown
                        ariaLabelledBy="periode"
                      />
                      <div className="arbeidsgiver-periode-tabell--periode-velger-total">
                        Total refundert: <b>{thousandSeparation(totalBeløp)}</b>
                      </div>
                      <div className="arbeidsgiver-periode-tabell--periode-velger-max-dato">Maxdato: <b>15.03.20</b></div>
                    </div>
                    {table}
                  </>
              }
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
  fetchPerson: fetchPerson,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ArbeidsgiverPeriodeTabell);
