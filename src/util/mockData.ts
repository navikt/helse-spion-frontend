import { Status, Ytelsesperiode, YtelseSammendrag } from './helseSpionTypes';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

export const mockYtelsesperiode1: Ytelsesperiode = {
  forbrukteSykedager: 3,
  gjenståendeSykedager: 81,
  periode: {
    fom: new Date(2010, 1, 1),
    tom: new Date(2014, 1, 1)
  },
  refusjonsbeløp: 20,
  status: Status.INNVILGET,
  ytelse: 'SP',

  grad: 20,
  arbeidsforhold: {
    arbeidsforholdId: '1',
    arbeidstaker: {
      etternavn: 'etternavn',
      fornavn: 'fornavn',
      identitetsnummer: '1213123'
    },
    arbeidsgiver: {
      arbeidsgiverId: '12321'
    }
  },
  dagsats: 123,
  sistEndret: new Date(2015, 10, 10)
};

export const mockYtelsesperiode2: Ytelsesperiode = {
  ...mockYtelsesperiode1,
  periode: {
    fom: new Date(2012, 1, 1),
    tom: new Date(2016, 1, 1)
  },
  refusjonsbeløp: 10,
  status: Status.AVSLÅTT,
  ytelse: 'PP',
  grad: 100
};

export const mockYtelsesperiode3: Ytelsesperiode = {
  ...mockYtelsesperiode1,
  periode: {
    fom: new Date(2016, 1, 1),
    tom: new Date(2020, 1, 1)
  },
  refusjonsbeløp: 30,
  status: Status.UNDER_BEHANDLING,
  ytelse: 'FP',
  grad: 50
};

export const mockYtelsesperiode4: Ytelsesperiode = {
  ...mockYtelsesperiode1,
  periode: {
    fom: new Date(2016, 1, 1),
    tom: new Date(2020, 1, 1)
  },
  refusjonsbeløp: 30,
  status: Status.HENLAGT,
  ytelse: 'FP',
  grad: 50
};

export const mockYtelsesperioder: Ytelsesperiode[] = [
  mockYtelsesperiode1,
  mockYtelsesperiode2,
  mockYtelsesperiode3
];

export const mockOrganisasjon1: Organisasjon = {
  Name: 'ORG1',
  OrganizationForm: 'BEDR',
  OrganizationNumber: '1',
  ParentOrganizationNumber: '0',
  Status: 'Active',
  Type: 'Enterprise'
};

export const mockOrganisasjon2: Organisasjon = {
  Name: 'ORG2',
  OrganizationForm: 'BEDR',
  OrganizationNumber: '2',
  ParentOrganizationNumber: '1',
  Status: 'Active',
  Type: 'Business'
};

export const mockOrganisasjon3: Organisasjon = {
  Name: 'ORG3',
  OrganizationForm: 'BEDR',
  OrganizationNumber: '3',
  ParentOrganizationNumber: '0',
  Status: 'Active',
  Type: 'Enterprise'
};

export const mockOrganisasjon4: Organisasjon = {
  Name: 'ORG4',
  OrganizationForm: 'BEDR',
  OrganizationNumber: '4',
  ParentOrganizationNumber: '0',
  Status: 'Active',
  Type: 'Business'
};

export const mockOrganisasjoner: Organisasjon[] = [
  mockOrganisasjon1,
  mockOrganisasjon2,
  mockOrganisasjon3,
  mockOrganisasjon4
];

export const mockYtelseSammendrag1: YtelseSammendrag = {
  navn: 'Testesen jr',
  identitetsnummer: '72345678901',
  antall_refusjoner: 1,
  merknad: 'merknad a',
  max_refusjon_dager: 4,
  refusjonsbeløp: 123.1
};

export const mockYtelseSammendrag2: YtelseSammendrag = {
  navn: 'Testesen sr',
  identitetsnummer: '12367678901',
  antall_refusjoner: 3,
  merknad: 'merknad y',
  max_refusjon_dager: 2,
  refusjonsbeløp: 453.1
};

export const mockYtelseSammendrag3: YtelseSammendrag = {
  navn: 'Per Testesen day',
  identitetsnummer: '12333458901',
  antall_refusjoner: 5,
  merknad: 'merknad m',
  max_refusjon_dager: 1,
  refusjonsbeløp: 78.3
};

export const mockYtelseSammendrag: YtelseSammendrag[] = [
  mockYtelseSammendrag1,
  mockYtelseSammendrag2,
  mockYtelseSammendrag3
];
