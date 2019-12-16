export interface HelseSpionState {
  fødselsnummerSøk?: string
  person?: Person
}

export interface Person {
  fornavne: string
  etternavn: string
  fødselsnummer: string
  virksomhetsNr: string
  virksomhetsNavn: string
  arbeidsgiverPerioder: ArbeidsgiverPeriode[]
}

export interface ArbeidsgiverPeriode {
  fom: string // todo: localdate
  tom: string // todo: localdate
  grad?: number
  referanseBeløp: string // todo: Enum
  ytelse: string // todo: Enum
  merknad?: string
  status: string // todo: Enum
}

export const FETCH_PERSON = 'FETCH_PERSON';

interface FetchPersonAction {
  type: typeof FETCH_PERSON
}

export type HelseSpionActionTypes = FetchPersonAction
