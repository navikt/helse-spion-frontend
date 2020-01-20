export interface HelseSpionState {
  person?: Person
  error: boolean
}

export interface Person {
  fornavn: string
  etternavn: string
  identitetsnummer: string
  virksomhetsNr: string
  virksomhetsNavn: string
  arbeidsgiverPerioder: ArbeidsgiverPeriode[]
}

export interface ArbeidsgiverPeriode {
  fom: Date
  tom: Date
  status: string // todo: Enum
  referanseBeløp: string // todo: Enum
  ytelse: string // todo: Enum
  grad?: string
  merknad?: string
}

export enum HelseSpionTypes {
  FETCH_PERSON_STARTED = 'FETCH_PERSON_STARTED',
  FETCH_PERSON_SUCCESS = 'FETCH_PERSON_SUCCESS',
  FETCH_PERSON_ERROR = 'FETCH_PERSON_ERROR',
}

export type HelseSpionActions =
  | { type: HelseSpionTypes.FETCH_PERSON_STARTED }
  | { type: HelseSpionTypes.FETCH_PERSON_SUCCESS, person: Person }
  | { type: HelseSpionTypes.FETCH_PERSON_ERROR };

