import {fetchPersonSuccess} from "../actions/helseSpionActions";
import {ArbeidsgiverPeriode, Person} from "../types/helseSpionTypes";

// Todo: Needs type security
export function fetchPerson(fødselsnummerSøk?: String) {
  return async dispatch => {
    if (fødselsnummerSøk) {
      await fetch(`http://localhost:3000`)
        // .then(data => data.json())
        .then(data => {
          dispatch(fetchPersonSuccess(dummyData))
        });
    }
  };
}

const dummyDataPerioder: ArbeidsgiverPeriode[] = [
  {
    fom: '17.12.19',
    tom: '01.01.20',
    status: 'Under behandling',
    referanseBeløp: '-',
    ytelse: 'SP',
    grad: '100%',
    merknad: '-',
  },
  {
    fom: '10.03.19',
    tom: '07.04.19',
    status: 'Avslått',
    referanseBeløp: '0,-',
    ytelse: 'PP',
    grad: '-',
    merknad: '-',
  },
  {
    fom: '21.01.19',
    tom: '02.03.19',
    status: 'Innvilget',
    referanseBeløp: '9.500,-',
    ytelse: 'PP',
    grad: '50%',
    merknad: '-',
  },
  {
    fom: '21.01.18',
    tom: '02.03.18',
    status: 'Innvilget',
    referanseBeløp: '12.000,-',
    ytelse: 'SP',
    grad: '50%',
    merknad: 'Fritak AGP',
  },
];

const dummyData: Person = {
  fornavne: 'Ola',
  etternavn: 'Nordman',
  fødselsnummer: '12345678912',
  virksomhetsNr: '12345678912',
  virksomhetsNavn: 'Grünerløkka pleiehjem',
  arbeidsgiverPerioder: dummyDataPerioder,
}

