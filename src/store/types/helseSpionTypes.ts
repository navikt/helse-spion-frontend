export interface HelseSpionState {
  person?: Person
  fom?: Date
  tom?: Date
}

export interface Person {
  fornavn: string
  etternavn: string
  fødselsnummer: string
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
  FETCH_PERSON = 'FETCH_PERSON',
  SET_FOM = 'SET_FOM',
  SET_TOM = 'SET_TOM',
}

export type HelseSpionActions =
  | { type: HelseSpionTypes.FETCH_PERSON, person: Person }
  | { type: HelseSpionTypes.SET_FOM, fom: Date }
  | { type: HelseSpionTypes.SET_TOM, tom: Date };

