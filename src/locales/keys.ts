import { ErrorType, Status } from '../util/helseSpionTypes';

export enum Keys {
  MY_PAGE = 'MY_PAGE',
  DOCUMENT_TITLE = 'DOCUMENT_TITLE',
  REFUNDS = 'REFUNDS',
  ALL_REFUNDS = 'ALL_REFUNDS',
  CHANGE = 'CHANGE',
  FIND_OTHER_EMPLOYEE = 'FIND_OTHER_EMPLOYEE',
  IDENTITY_NUMBER = 'IDENTITY_NUMBER',
  IDENTITY_NUMBER_EXT = 'IDENTITY_NUMBER_EXT',
  SEARCH = 'SEARCH',
  PERIOD = 'PERIOD',
  TOTAL_REFUNDED = 'TOTAL_REFUNDED',
  TOTAL_REFUNDED_IN_PERIOD = 'TOTAL_REFUNDED_IN_PERIOD',
  STATUS = 'STATUS',
  BENEFIT = 'BENEFIT',
  GRADE = 'GRADE',
  MARK = 'MARK',
  REFUND = 'REFUND',
  NEXT = 'NEXT',
  PREVIOUS = 'PREVIOUS',
  NAME = 'NAME',
  REFUND_COUNT = 'REFUND_COUNT',
  REFUND_DAYS_MAX = 'REFUND_DAYS_MAX',
  REFUNDABLE_DAYS_MAX = 'REFUNDABLE_DAYS_MAX',
  BACK = 'BACK',
  EMPLOYEE_SEARCH = 'EMPLOYEE_SEARCH',
  FOR_INFO = 'FOR_INFO',
  INFO_TEXT = 'INFO_TEXT',
  INNLOGGET_SIDE_MIN_SIDE = 'INNLOGGET_SIDE_MIN_SIDE'
}

const translatedKeys: IncludedKeys = {
  [Keys.MY_PAGE]: {
    nb: 'Min side - Refusjonsportal',
    nn: 'Mi side - Refusjonsportal',
    en: 'My page - Refunds'
  },

  [Keys.DOCUMENT_TITLE]: {
    nb: 'Min side arbeidsgiver',
    nn: 'Mi side arbeidsgivar',
    en: 'My page employer'
  },

  [Keys.REFUNDS]: {
    nb: 'Refusjoner',
    nn: 'Refusjonar',
    en: 'Refunds'
  },

  [Keys.ALL_REFUNDS]: {
    nb: 'Alle refusjoner',
    nn: 'Alle refusjonar',
    en: 'All refunds'
  },

  [Keys.CHANGE]: {
    nb: 'Endre',
    nn: 'Endre',
    en: 'Change'
  },

  [Keys.FIND_OTHER_EMPLOYEE]: {
    nb: 'Finn annen ansatt',
    nn: 'Finn annan tilsett',
    en: 'Find another employee'
  },

  [Keys.IDENTITY_NUMBER]: {
    nb: 'Fødselsnummer',
    nn: 'Fødselsnummer',
    en: 'Identity number'
  },

  [Keys.IDENTITY_NUMBER_EXT]: {
    nb: 'Fødselsnummer 11 siffer',
    nn: 'Fødselsnummer 11 siffer',
    en: 'Identity number 11 numbers'
  },

  [Keys.SEARCH]: {
    nb: 'SØK',
    nn: 'SØK',
    en: 'SEARCH'
  },

  [Keys.PERIOD]: {
    nb: 'Periode',
    nn: 'Periode',
    en: 'Period'
  },

  [Keys.TOTAL_REFUNDED]: {
    nb: 'Sum refusjoner',
    nn: 'Sum refusjonar',
    en: 'Total refunded'
  },

  [Keys.TOTAL_REFUNDED_IN_PERIOD]: {
    nb: 'Sum refusjoner fra',
    nn: 'Sum refusjonar frå',
    en: 'Total refunded from'
  },

  [Keys.STATUS]: {
    nb: 'Status',
    nn: 'Status',
    en: 'Status'
  },

  [Keys.BENEFIT]: {
    nb: 'Ytelse',
    nn: 'Yting',
    en: 'Benefit'
  },

  [Keys.GRADE]: {
    nb: 'Grad',
    nn: 'Grad',
    en: 'Grade'
  },

  [Keys.MARK]: {
    nb: 'Merknad',
    nn: 'Merknad',
    en: 'Mark'
  },

  [Keys.REFUND]: {
    nb: 'Refusjon',
    nn: 'Refusjon',
    en: 'Refund'
  },

  [Keys.NEXT]: {
    nb: 'neste',
    nn: 'neste',
    en: 'next'
  },

  [Keys.PREVIOUS]: {
    nb: 'forrige',
    nn: 'førre',
    en: 'previous'
  },

  [Keys.NAME]: {
    nb: 'Navn',
    nn: 'Namn',
    en: 'Name'
  },

  [Keys.REFUND_COUNT]: {
    nb: 'Antall ref.',
    nn: 'Tal på ref.',
    en: 'Number of ref.'
  },

  [Keys.REFUND_DAYS_MAX]: {
    nb: 'Max ref. dager',
    nn: 'Max ref. dagar',
    en: 'Max ref. days'
  },

  [Keys.REFUNDABLE_DAYS_MAX]: {
    nb: 'Gjenstående sykedager',
    nn: 'Gjenstående sykedager',
    en: 'Remaining sick days'
  },

  [Keys.BACK]: {
    nb: 'Tilbake',
    nn: 'Tilbake',
    en: 'Back'
  },

  [Keys.EMPLOYEE_SEARCH]: {
    nb: 'Søk etter ansatt',
    nn: 'Søk etter ansatt',
    en: 'Search for employee'
  },

  [Keys.FOR_INFO]: {
    nb: 'Til info',
    nn: 'Til info',
    en: 'For information'
  },

  [Keys.INFO_TEXT]: {
    nb: 'Vi jobber med å få på plass en tabellvisning av ansatte med refusjoner. Dette vil først være klart høsten 2020.',
    nn: 'Vi jobber med å få på plass en tabellvisning av ansatte med refusjoner. Dette vil først være klart høsten 2020.',
    en: 'We are working on putting in place a table view of employees with refunds. This will not be ready until the autumn of 2020.'
  },

  [Keys.INNLOGGET_SIDE_MIN_SIDE]: {
    nb: 'Min side',
    nn: 'Min side',
    en: 'My page'
  }
};

const translatedStatus: IncludedStatus = {
  [Status.INNVILGET]: {
    nb: 'Innvilget',
    nn: 'Innvilga',
    en: 'Approved'
  },

  [Status.AVSLÅTT]: {
    nb: 'Avslått',
    nn: 'Avslått',
    en: 'Declined'
  },

  [Status.UNDER_BEHANDLING]: {
    nb: 'Under behandling',
    nn: 'Under behandling',
    en: 'Declined'
  },

  [Status.HENLAGT]: {
    nb: 'Henlagt',
    nn: 'Henlagt',
    en: 'Archived'
  }
};

// Todo: proper texts
const translatedErrors: IncludedErrors = {
  [ErrorType.NOTNULL]: {
    nb: 'En feil har skjedd. Prøv igjen senere.',
    nn: 'Ein feil har skjedd. Prøv igjen seinare',
    en: 'An error occurred. Try again later.'
  },

  [ErrorType.IDENTITETSNUMMERCONSTRAINT]: {
    nb: 'En feil har skjedd. Prøv igjen senere.',
    nn: 'Ein feil har skjedd. Prøv igjen seinare',
    en: 'An error occurred. Try again later.'
  },

  [ErrorType.ORGANISASJONSNUMMERCONSTRAINT]: {
    nb: 'En feil har skjedd. Prøv igjen senere.',
    nn: 'Ein feil har skjedd. Prøv igjen seinare',
    en: 'An error occurred. Try again later.'
  },

  [ErrorType.UNKNOWN]: {
    nb: 'En feil har skjedd. Prøv igjen senere.',
    nn: 'Ein feil har skjedd. Prøv igjen seinare',
    en: 'An error occurred. Try again later.'
  }
};

type IncludedKeys = {
  [P in Keys]: {
    [P in Languages]: string;
  };
};

type IncludedStatus = {
  [P in Status]: {
    [P in Languages]: string;
  };
};

type IncludedErrors = {
  [P in ErrorType]: {
    [P in Languages]: string;
  };
};

const allTranslations: IncludedKeys & IncludedStatus & IncludedErrors = {
  ...translatedKeys,
  ...translatedStatus,
  ...translatedErrors
};

export enum Languages {
  nb = 'nb',
  nn = 'nn',
  en = 'en'
}

export const translationsToJson = (lan: Languages): {} => {
  let translatedKeys = {};
  Object.keys(allTranslations).map(
    (e) => (translatedKeys[e] = allTranslations[e][lan])
  );
  return translatedKeys;
};

export default allTranslations;
