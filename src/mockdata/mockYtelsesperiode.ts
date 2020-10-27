import { Status, Ytelsesperiode } from '../util/helseSpionTypes';
import { testFnr } from './testFnr';

const mockYtelsesperioder: Ytelsesperiode[] = [ {
  "periode" : {
    "fom" : new Date("2020-01-03"),
    "tom" : new Date("2020-01-30")
  },
  "forbrukteSykedager" : 0,
  "gjenståendeSykedager" : 0,
  "arbeidsforhold" : {
    "arbeidsforholdId" : "",
    "arbeidstaker" : {
      "fornavn" : "Donald",
      "etternavn" : "Schneider",
      "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson1
    },
    "arbeidsgiver" : {
      "arbeidsgiverId" : "711485759"
    }
  },
  "refusjonsbeløp" : 234,
  "status" : Status.UNDER_BEHANDLING,
  "grad" : 1,
  "dagsats" : 333,
  "ytelse" : "SP",
  "sistEndret" : new Date("2020-07-28")
}, {
  "periode" : {
    "fom" : new Date("2020-04-07"),
    "tom" : new Date("2020-04-30")
  },
  "forbrukteSykedager" : 0,
  "gjenståendeSykedager" : 0,
  "arbeidsforhold" : {
    "arbeidsforholdId" : "",
    "arbeidstaker" : {
      "fornavn" : "Donald",
      "etternavn" : "Schneider",
      "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson1
    },
    "arbeidsgiver" : {
      "arbeidsgiverId" : "711485759"
    }
  },
  "refusjonsbeløp" : 222,
  "status" : Status.UNDER_BEHANDLING,
  "grad" : 1,
  "dagsats" : 123,
  "ytelse" : "SP",
  "sistEndret" : new Date("2020-07-28")
}, {
  "periode" : {
    "fom" : new Date("2020-09-06"),
    "tom" : new Date("2020-09-19")
  },
  "forbrukteSykedager" : 0,
  "gjenståendeSykedager" : 0,
  "arbeidsforhold" : {
    "arbeidsforholdId" : "",
    "arbeidstaker" : {
      "fornavn" : "Donald",
      "etternavn" : "Schneider",
      "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson1
    },
    "arbeidsgiver" : {
      "arbeidsgiverId" : "711485759"
    }
  },
  "refusjonsbeløp" : 123,
  "status" : Status.AVSLÅTT,
  "grad" : 1,
  "dagsats" : 55,
  "ytelse" : "SP",
  "sistEndret" : new Date("2020-07-28")
}, {
  "periode" : {
    "fom" : new Date("2020-07-22"),
    "tom" : new Date("2020-07-30")
  },
  "forbrukteSykedager" : 0,
  "gjenståendeSykedager" : 0,
  "arbeidsforhold" : {
    "arbeidsforholdId" : "",
    "arbeidstaker" : {
      "fornavn" : "Donald",
      "etternavn" : "Schneider",
      "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson1
    },
    "arbeidsgiver" : {
      "arbeidsgiverId" : "711485759"
    }
  },
  "refusjonsbeløp" : 1787,
  "status" : Status.INNVILGET,
  "grad" : 20,
  "dagsats" : 480.16556089625584,
  "ytelse" : "SP",
  "sistEndret" : new Date("2020-07-28")
}, {
  "periode" : {
    "fom" : new Date("2021-10-16"),
    "tom" : new Date("2021-10-26")
  },
  "forbrukteSykedager" : 0,
  "gjenståendeSykedager" : 0,
  "arbeidsforhold" : {
    "arbeidsforholdId" : "",
    "arbeidstaker" : {
      "fornavn" : "Donald",
      "etternavn" : "Schneider",
      "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson1
    },
    "arbeidsgiver" : {
      "arbeidsgiverId" : "711485759"
    }
  },
  "refusjonsbeløp" : 1418,
  "status" : Status.INNVILGET,
  "grad" : 80,
  "dagsats" : 375.07173691381973,
  "ytelse" : "SP",
  "sistEndret" : new Date("2020-07-28")
}, {
  "periode" : {
    "fom" : new Date("2021-04-29"),
    "tom" : new Date("2021-05-13")
  },
  "forbrukteSykedager" : 0,
  "gjenståendeSykedager" : 0,
  "arbeidsforhold" : {
    "arbeidsforholdId" : "",
    "arbeidstaker" : {
      "fornavn" : "Donald",
      "etternavn" : "Schneider",
      "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson1
    },
    "arbeidsgiver" : {
      "arbeidsgiverId" : "711485759"
    }
  },
  "refusjonsbeløp" : 135,
  "status" : Status.UNDER_BEHANDLING,
  "grad" : 2,
  "dagsats" : 123,
  "ytelse" : "SP",
  "sistEndret" : new Date("2020-07-28")
}, {
  "periode" : {
    "fom" : new Date("2022-01-29"),
    "tom" : new Date("2022-01-31")
  },
  "forbrukteSykedager" : 0,
  "gjenståendeSykedager" : 0,
  "arbeidsforhold" : {
    "arbeidsforholdId" : "",
    "arbeidstaker" : {
      "fornavn" : "Donald",
      "etternavn" : "Schneider",
      "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson1
    },
    "arbeidsgiver" : {
      "arbeidsgiverId" : "711485759"
    }
  },
  "refusjonsbeløp" : 7649,
  "status" : Status.INNVILGET,
  "grad" : 50,
  "dagsats" : 534.7787036061458,
  "ytelse" : "SP",
  "sistEndret" : new Date("2020-07-28")
}, {
  "periode" : {
    "fom" : new Date("2020-01-17"),
    "tom" : new Date("2020-01-18")
  },
  "forbrukteSykedager" : 0,
  "gjenståendeSykedager" : 0,
  "arbeidsforhold" : {
    "arbeidsforholdId" : "",
    "arbeidstaker" : {
      "fornavn" : "Donald",
      "etternavn" : "Schneider",
      "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson1
    },
    "arbeidsgiver" : {
      "arbeidsgiverId" : "711485759"
    }
  },
  "refusjonsbeløp" : 220,
  "status" : Status.INNVILGET,
  "grad" : 80,
  "dagsats" : 621.1433287941456,
  "ytelse" : "SP",
  "sistEndret" : new Date("2020-08-03")
} ];

export default mockYtelsesperioder;
