export interface HelseSpionState {
  sak?: Sak
  error: boolean
}

export interface Sak {
  arbeidsgiver: Arbeidsgiver
  oppsummering: Oppsummering
  person: Person
  ytelsesperioder: Ytelsesperiode[]
}

export interface Arbeidsgiver {
  identitetsnummer: string
  navn: string
  orgnr: string
}

export interface Oppsummering {
  maxdato: Date
  periode: Periode
}

export interface Periode {
  fom: Date
  tom: Date
}

export interface Person {
  aktørId: string
  etternavn: string
  fornavn: string
}

export interface Ytelsesperiode {
  grad?: number
  merknad?: string // todo: enum
  periode: Periode
  refusjonsbeløp: number
  status: Status
  ytelse: string // todo: enum
}

export enum Status {
  PENDING = 'UNDER BEHANDLING',
  DECLINED = 'AVSLÅTT',
  APPROVED = 'INNVILGET',
}

export enum HelseSpionTypes {
  FETCH_PERSON_STARTED = 'FETCH_PERSON_STARTED',
  FETCH_PERSON_SUCCESS = 'FETCH_PERSON_SUCCESS',
  FETCH_PERSON_ERROR = 'FETCH_PERSON_ERROR',
}

export type HelseSpionActionTypes =
  | { type: HelseSpionTypes.FETCH_PERSON_STARTED }
  | { type: HelseSpionTypes.FETCH_PERSON_SUCCESS, sak: Sak }
  | { type: HelseSpionTypes.FETCH_PERSON_ERROR };

