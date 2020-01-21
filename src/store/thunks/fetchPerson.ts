import { fetchPersonError, fetchPersonStarted, fetchPersonSuccess } from "../actions/helseSpionActions";
import { ArbeidsgiverPeriode, Person } from "../types/helseSpionTypes";

//TODO: Needs type safety
export function fetchPerson(identitetsnummerSøk?: String) {
  return async dispatch => {
    if (identitetsnummerSøk) {
      dispatch(fetchPersonStarted());
      await fetch('/api/v1/saker/oppslag', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        //method: 'GET',
        method: 'POST',
        body: JSON.stringify({
          "identitetsnummer": identitetsnummerSøk,
          "arbeidsgiverOrgnr": "2"
        }),
      }).then(response => {
        if (response.status === 401) {
          alert("redirect");
        } else if (response.status === 200) {
          dispatch(fetchPersonSuccess(dummyData));
        } else {
          dispatch(fetchPersonError());
        }
      });
    }
  };
}

const dummyDataPerioder: ArbeidsgiverPeriode[] = [
  {
    fom: new Date(2019,12,17),
    tom: new Date(2020,1,1),
    status: 'Under behandling',
    referanseBeløp: '-',
    ytelse: 'SP',
    grad: '100%',
    merknad: '-',
  },
  {
    fom: new Date(2019,3,10),
    tom: new Date(2019,4,7),
    status: 'Avslått',
    referanseBeløp: '0,-',
    ytelse: 'PP',
    grad: '-',
    merknad: '-',
  },
  {
    fom: new Date(2019,1,21),
    tom: new Date(2019,3,2),
    status: 'Innvilget',
    referanseBeløp: '9.500,-',
    ytelse: 'PP',
    grad: '50%',
    merknad: '-',
  },
  {
    fom: new Date(2018,1,21),
    tom: new Date(2018,3,2),
    status: 'Innvilget',
    referanseBeløp: '12.000,-',
    ytelse: 'SP',
    grad: '50%',
    merknad: 'Fritak AGP',
  },
];

const dummyData: Person = {
  fornavn: 'Ola',
  etternavn: 'Nordman',
  identitetsnummer: '12345678912',
  virksomhetsNr: '12345678912',
  virksomhetsNavn: 'Grünerløkka pleiehjem',
  arbeidsgiverPerioder: dummyDataPerioder,
};

