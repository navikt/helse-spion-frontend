import { testFnr } from './testFnr';

const mockFetchedYtelsesperioder = [
  {
    periode: {
      fom: '2020-01-03',
      tom: '2020-01-30'
    },
    kafkaOffset: 3,
    forbrukteSykedager: 0,
    gjenståendeSykedager: 0,
    arbeidsforhold: {
      arbeidsforholdId: '',
      arbeidstaker: {
        fornavn: 'Donald',
        etternavn: 'Schneider',
        identitetsnummer: testFnr.GyldigeFraDolly.TestPerson1
      },
      arbeidsgiver: {
        arbeidsgiverId: '711485759'
      }
    },
    refusjonsbeløp: null,
    status: 'UNDER_BEHANDLING',
    grad: null,
    dagsats: null,
    ytelse: 'SP',
    sistEndret: '2020-07-28'
  },
  {
    periode: {
      fom: '2020-04-07',
      tom: '2020-04-30'
    },
    kafkaOffset: 10,
    forbrukteSykedager: 0,
    gjenståendeSykedager: 0,
    arbeidsforhold: {
      arbeidsforholdId: '',
      arbeidstaker: {
        fornavn: 'Donald',
        etternavn: 'Schneider',
        identitetsnummer: testFnr.GyldigeFraDolly.TestPerson1
      },
      arbeidsgiver: {
        arbeidsgiverId: '711485759'
      }
    },
    refusjonsbeløp: null,
    status: 'UNDER_BEHANDLING',
    grad: null,
    dagsats: null,
    ytelse: 'SP',
    sistEndret: '2020-07-28'
  },
  {
    periode: {
      fom: '2020-09-06',
      tom: '2020-09-19'
    },
    kafkaOffset: 29,
    forbrukteSykedager: 0,
    gjenståendeSykedager: 0,
    arbeidsforhold: {
      arbeidsforholdId: '',
      arbeidstaker: {
        fornavn: 'Donald',
        etternavn: 'Schneider',
        identitetsnummer: testFnr.GyldigeFraDolly.TestPerson1
      },
      arbeidsgiver: {
        arbeidsgiverId: '711485759'
      }
    },
    refusjonsbeløp: null,
    status: 'AVSLÅTT',
    grad: null,
    dagsats: null,
    ytelse: 'SP',
    sistEndret: '2020-07-28'
  },
  {
    periode: {
      fom: '2020-07-22',
      tom: '2020-07-30'
    },
    kafkaOffset: 25,
    forbrukteSykedager: 0,
    gjenståendeSykedager: 0,
    arbeidsforhold: {
      arbeidsforholdId: '',
      arbeidstaker: {
        fornavn: 'Donald',
        etternavn: 'Schneider',
        identitetsnummer: testFnr.GyldigeFraDolly.TestPerson1
      },
      arbeidsgiver: {
        arbeidsgiverId: '711485759'
      }
    },
    refusjonsbeløp: 1787.5240939370642,
    status: 'INNVILGET',
    grad: 20,
    dagsats: 480.16556089625584,
    ytelse: 'SP',
    sistEndret: '2020-07-28'
  },
  {
    periode: {
      fom: '2021-10-16',
      tom: '2021-10-26'
    },
    kafkaOffset: 36,
    forbrukteSykedager: 0,
    gjenståendeSykedager: 0,
    arbeidsforhold: {
      arbeidsforholdId: '',
      arbeidstaker: {
        fornavn: 'Donald',
        etternavn: 'Schneider',
        identitetsnummer: testFnr.GyldigeFraDolly.TestPerson1
      },
      arbeidsgiver: {
        arbeidsgiverId: '711485759'
      }
    },
    refusjonsbeløp: 1418.7081347606631,
    status: 'INNVILGET',
    grad: 80,
    dagsats: 375.07173691381973,
    ytelse: 'SP',
    sistEndret: '2020-07-28'
  },
  {
    periode: {
      fom: '2021-04-29',
      tom: '2021-05-13'
    },
    kafkaOffset: 2,
    forbrukteSykedager: 0,
    gjenståendeSykedager: 0,
    arbeidsforhold: {
      arbeidsforholdId: '',
      arbeidstaker: {
        fornavn: 'Donald',
        etternavn: 'Schneider',
        identitetsnummer: testFnr.GyldigeFraDolly.TestPerson1
      },
      arbeidsgiver: {
        arbeidsgiverId: '711485759'
      }
    },
    refusjonsbeløp: null,
    status: 'UNDER_BEHANDLING',
    grad: null,
    dagsats: null,
    ytelse: 'SP',
    sistEndret: '2020-07-28'
  },
  {
    periode: {
      fom: '2022-01-29',
      tom: '2022-01-31'
    },
    kafkaOffset: 23,
    forbrukteSykedager: 0,
    gjenståendeSykedager: 0,
    arbeidsforhold: {
      arbeidsforholdId: '',
      arbeidstaker: {
        fornavn: 'Donald',
        etternavn: 'Schneider',
        identitetsnummer: testFnr.GyldigeFraDolly.TestPerson1
      },
      arbeidsgiver: {
        arbeidsgiverId: '711485759'
      }
    },
    refusjonsbeløp: 7649.920507606071,
    status: 'INNVILGET',
    grad: 50,
    dagsats: 534.7787036061458,
    ytelse: 'SP',
    sistEndret: '2020-07-28'
  },
  {
    periode: {
      fom: '2020-01-17',
      tom: '2020-01-18'
    },
    kafkaOffset: 30,
    forbrukteSykedager: 0,
    gjenståendeSykedager: 0,
    arbeidsforhold: {
      arbeidsforholdId: '',
      arbeidstaker: {
        fornavn: 'Donald',
        etternavn: 'Schneider',
        identitetsnummer: testFnr.GyldigeFraDolly.TestPerson1
      },
      arbeidsgiver: {
        arbeidsgiverId: '711485759'
      }
    },
    refusjonsbeløp: 220.62716197768117,
    status: 'INNVILGET',
    grad: 80,
    dagsats: 621.1433287941456,
    ytelse: 'SP',
    sistEndret: '2020-08-03'
  }
];

export default mockFetchedYtelsesperioder;
