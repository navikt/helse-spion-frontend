export interface HelseSpionState {
  arbeidsgivere: Arbeidsgiver[]
  ytelsesperioder?: Ytelsesperiode
  arbeidsgivereLoading: boolean
  arbeidsgivereError: boolean
  personLoading: boolean
  personError: boolean
  tokenLoading: boolean
  tokenError: boolean
  tokenFetched: boolean
}

// fra Arbeidsgivere API
export interface Arbeidsgiver {
  name: string
  organizationForm?: string
  organizationNumber?: string
  parentOrganizationNumber?: string
  socialSecurityNumber?: string
  status?: string
  type: string
}

export interface Ytelsesperiode {
  arbeidsforhold: Arbeidsforhold
  dagsats: number
  ferieperioder: Periode[]
  grad: number
  maxdato: Date
  merknad: string
  periode: Periode
  refusjonsbeløp: number
  sistEndret: Date
  status: Status
  vedtaksId: string
  ytelse: string
}

export interface Arbeidsforhold {
  arbeidsforholdId: string,
  arbeidsgiver: YtelsesperioderArbeidsgiver
  arbeidstaker: Arbeidstaker
}

// fra Ytelsesperioder API
export interface YtelsesperioderArbeidsgiver {
  identitetsnummer: null
  navn: string
  organisasjonsnummer: string
  virksomhetsnummer: string
}

export interface Arbeidstaker {
  etternavn: string
  fornavn: string
  identitetsnummer: string
}

export interface Periode {
  fom: Date
  tom: Date
}

export enum Status {
  UNDER_BEHANDLING = 'UNDER BEHANDLING',
  AVSLÅTT = 'AVSLÅTT',
  INNVILGET = 'INNVILGET',
}

export enum HelseSpionTypes {
  FETCH_ARBEIDSGIVERE_STARTED = 'FETCH_ARBEIDSGIVERE_STARTED',
  FETCH_ARBEIDSGIVERE_SUCCESS = 'FETCH_ARBEIDSGIVERE_SUCCESS',
  FETCH_ARBEIDSGIVERE_ERROR = 'FETCH_ARBEIDSGIVERE_ERROR',
  FETCH_PERSON_STARTED = 'FETCH_PERSON_STARTED',
  FETCH_PERSON_SUCCESS = 'FETCH_PERSON_SUCCESS',
  FETCH_PERSON_ERROR = 'FETCH_PERSON_ERROR',
  FETCH_TOKEN_STARTED = 'FETCH_TOKEN_STARTED',
  FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS',
  FETCH_TOKEN_ERROR = 'FETCH_TOKEN_ERROR',
}

export type HelseSpionActionTypes =
  | { type: HelseSpionTypes.FETCH_ARBEIDSGIVERE_STARTED }
  | { type: HelseSpionTypes.FETCH_ARBEIDSGIVERE_SUCCESS, arbeidsgivere: Arbeidsgiver[] }
  | { type: HelseSpionTypes.FETCH_ARBEIDSGIVERE_ERROR }
  | { type: HelseSpionTypes.FETCH_PERSON_STARTED }
  | { type: HelseSpionTypes.FETCH_PERSON_SUCCESS, ytelsesperioder: Ytelsesperiode }
  | { type: HelseSpionTypes.FETCH_PERSON_ERROR }
  | { type: HelseSpionTypes.FETCH_TOKEN_STARTED }
  | { type: HelseSpionTypes.FETCH_TOKEN_SUCCESS }
  | { type: HelseSpionTypes.FETCH_TOKEN_ERROR }
  ;

