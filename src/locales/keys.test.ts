import { translationsToJson, Languages } from './keys'

const expected = {
  "ALL_REFUNDS": "Alle refusjoner",
  "AVSLÅTT": "Avslått",
  "BACK": "Tilbake",
  "BENEFIT": "Ytelse",
  "CHANGE": "Endre",
  "DOCUMENT_TITLE": "Min side arbeidsgiver",
  "EMPLOYEE_SEARCH": "Søk etter ansatt",
  "FIND_OTHER_EMPLOYEE": "Finn annen ansatt",
  "FOR_INFO": "Til info",
  "GRADE": "Grad",
  "HENLAGT": "Henlagt",
  "IDENTITETSNUMMERCONSTRAINT": "En feil har skjedd. Prøv igjen senere.",
  "IDENTITY_NUMBER": "Fødselsnummer",
  "IDENTITY_NUMBER_EXT": "Fødselsnummer 11 siffer",
  "INFO_TEXT": "Vi jobber med å få på plass en tabellvisning av ansatte med refusjoner. Dette vil først være klart høsten 2020.",
  "INNVILGET": "Innvilget",
  "MARK": "Merknad",
  "MY_PAGE": "Min side - Refusjonsportal",
  "NAME": "Navn",
  "NEXT": "neste",
  "NOTNULL": "En feil har skjedd. Prøv igjen senere.",
  "ORGANISASJONSNUMMERCONSTRAINT": "En feil har skjedd. Prøv igjen senere.",
  "PERIOD": "Periode",
  "PREVIOUS": "forrige",
  "REFUND": "Refusjon",
  "REFUNDABLE_DAYS_MAX": "Gjenstående sykedager",
  "REFUNDS": "Refusjoner",
  "REFUND_COUNT": "Antall ref.",
  "REFUND_DAYS_MAX": "Max ref. dager",
  "SEARCH": "SØK",
  "STATUS": "Status",
  "TOTAL_REFUNDED": "Sum refusjoner",
  "TOTAL_REFUNDED_IN_PERIOD": "Sum refusjoner fra",
  "UNDER_BEHANDLING": "Under behandling",
  "UNKNOWN": "En feil har skjedd. Prøv igjen senere.",
};

describe('translationsToJson', () => {
	it('can sort by date ascending', () => {
		const input = translationsToJson(Languages.nb);
		expect(input).toEqual(expected);
  })
});
