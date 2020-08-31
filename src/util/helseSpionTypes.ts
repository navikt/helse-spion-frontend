import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

export interface HelseSpionState {
  arbeidsgivere: Organisasjon[]
  ytelsesperioder: Ytelsesperiode[]
  arbeidsgivereLoading: boolean
  arbeidsgivereErrorType?: string
  arbeidsgivereErrorMessage?: string
  personLoading: boolean
  personErrorType?: string
  personErrorMessage?: string
}

export enum OrganisationType {
  ENTERPRISE = 'Enterprise',
  BUSINESS = 'Business',
  PERSON = 'Person',
}

export enum ErrorType {
  NOTNULL = 'NOTNULL',
  IDENTITETSNUMMERCONSTRAINT = 'IDENTITETSNUMMERCONSTRAINT',
  ORGANISASJONSNUMMERCONSTRAINT = 'ORGANISASJONSNUMMERCONSTRAINT',
  // GREATEROREQUAL = 'GREATEROREQUAL', // Todo: unused untill search on dates is implemented
  UNKNOWN = 'UNKNOWN',
}

export interface Ytelsesperiode {
  periode: Periode
  arbeidsforhold: Arbeidsforhold
  forbrukteSykedager: number
  gjenståendeSykedager: number
  dagsats: number
  grad?: number
  refusjonsbeløp?: number
  sistEndret: Date
  status: Status
  ytelse: string
  merknad?: string
}

export interface Arbeidsforhold {
  arbeidsforholdId: string,
  arbeidsgiver: YtelsesperioderArbeidsgiver
  arbeidstaker: Arbeidstaker
}

// fra Ytelsesperioder API
export interface YtelsesperioderArbeidsgiver {
  arbeidsgiverId: string
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
  HENLAGT = 'HENLAGT',
}

export enum HelseSpionTypes {
  FETCH_ARBEIDSGIVERE_STARTED = 'FETCH_ARBEIDSGIVERE_STARTED',
  FETCH_ARBEIDSGIVERE_SUCCESS = 'FETCH_ARBEIDSGIVERE_SUCCESS',
  FETCH_ARBEIDSGIVERE_ERROR = 'FETCH_ARBEIDSGIVERE_ERROR',
  FETCH_PERSON_STARTED = 'FETCH_PERSON_STARTED',
  FETCH_PERSON_SUCCESS = 'FETCH_PERSON_SUCCESS',
  FETCH_PERSON_ERROR = 'FETCH_PERSON_ERROR',
}

export type HelseSpionActionTypes =
  | { type: HelseSpionTypes.FETCH_ARBEIDSGIVERE_STARTED }
  | { type: HelseSpionTypes.FETCH_ARBEIDSGIVERE_SUCCESS, arbeidsgivere: Organisasjon[] }
  | { type: HelseSpionTypes.FETCH_ARBEIDSGIVERE_ERROR, errorType: string, errorMessage?: string }
  | { type: HelseSpionTypes.FETCH_PERSON_STARTED }
  | { type: HelseSpionTypes.FETCH_PERSON_SUCCESS, ytelsesperioder: Ytelsesperiode[] }
  | { type: HelseSpionTypes.FETCH_PERSON_ERROR, errorType: string, errorMessage?: string };

