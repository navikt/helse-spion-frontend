import { testFnr } from './testFnr';

const ytelsesammendrag = [
  {
    navn: 'Donald Schneider',
    identitetsnummer: testFnr.GyldigeFraDolly.TestPerson1,
    antall_refusjoner: 3,
    merknad: 'Merknad på ytelse',
    max_refusjon_dager: 2,
    refusjonsbeløp: 234
  },
  {
    navn: 'Donald Duck',
    identitetsnummer: testFnr.GyldigeFraDolly.TestPerson2,
    antall_refusjoner: 4,
    merknad: 'merknad 2',
    max_refusjon_dager: 2,
    refusjonsbeløp: 235
  },
  {
    navn: 'Donald Thump',
    identitetsnummer: testFnr.GyldigeFraDolly.TestPerson3,
    antall_refusjoner: 5,
    merknad: '',
    max_refusjon_dager: 2,
    refusjonsbeløp: 236
  },
  {
    navn: 'Donald von Schneider',
    identitetsnummer: testFnr.GyldigeFraDolly.TestPerson4,
    antall_refusjoner: 6,
    merknad: '',
    max_refusjon_dager: 2,
    refusjonsbeløp: 237
  }
];

export default ytelsesammendrag;
