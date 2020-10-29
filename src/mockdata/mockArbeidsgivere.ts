import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

const arbeidsgivere: Organisasjon[] = [
  {
  'Name' : 'STADLANDET OG SINGSÅS',
  'Type' : 'Enterprise',
  'ParentOrganizationNumber' : '123456778',
  'OrganizationForm' : 'AS',
  'OrganizationNumber' : '911366940',
  'Status' : 'Active'
}, {
  'Name' : 'HØNEFOSS OG ØLEN',
  'Type' : 'Enterprise',
  'ParentOrganizationNumber' : '123456778',
  'OrganizationForm' : 'AS',
  'OrganizationNumber' : '910020102',
  'Status' : 'Active'
}, {
  'Name' : 'JØA OG SEL',
  'Type' : 'Business',
  'ParentOrganizationNumber' : '911366940',
  'OrganizationForm' : 'BEDR',
  'OrganizationNumber' : '910098896',
  'Status' : 'Active'
}];

export default arbeidsgivere;
