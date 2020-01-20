export interface HelseSpionState {
  person?: Person
  fom?: Date
  tom?: Date
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
  SET_FOM = 'SET_FOM',
  SET_TOM = 'SET_TOM',
}

export type HelseSpionActions =
  | { type: HelseSpionTypes.FETCH_PERSON_STARTED }
  | { type: HelseSpionTypes.FETCH_PERSON_SUCCESS, person: Person }
  | { type: HelseSpionTypes.FETCH_PERSON_ERROR }
  | { type: HelseSpionTypes.SET_FOM, fom: Date }
  | { type: HelseSpionTypes.SET_TOM, tom: Date };

