import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen, wait, waitFor } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe';

import ArbeidsgiverHeader from './ArbeidsgiverHeader';
import StoreProvider from '../data/store/StoreProvider';
import { ArbeidsgiverProvider } from './ArbeidsgiverProvider';

jest.mock('../data/useYtelseSammendrag');

import useYtelseSammendrag from '../data/useYtelseSammendrag';

jest.mock('../data/Ytelsesperioder');

import useYtelsesperioder from '../data/Ytelsesperioder';

expect.extend(toHaveNoViolations);


const mockHookFetch = jest.fn().mockResolvedValue( [ {
    "periode" : {
      "fom" : "2020-01-03",
      "tom" : "2020-01-30"
    },
    "kafkaOffset" : 3,
    "forbrukteSykedager" : 0,
    "gjenståendeSykedager" : 0,
    "arbeidsforhold" : {
      "arbeidsforholdId" : "",
      "arbeidstaker" : {
        "fornavn" : "Donald",
        "etternavn" : "Schneider",
        "identitetsnummer" : "11036434890"
      },
      "arbeidsgiver" : {
        "arbeidsgiverId" : "711485759"
      }
    },
    "refusjonsbeløp" : null,
    "status" : "UNDER_BEHANDLING",
    "grad" : null,
    "dagsats" : null,
    "ytelse" : "SP",
    "sistEndret" : "2020-07-28"
  }, {
    "periode" : {
      "fom" : "2020-01-01",
      "tom" : "2020-01-30"
    },
    "kafkaOffset" : 0,
    "forbrukteSykedager" : 0,
    "gjenståendeSykedager" : 0,
    "arbeidsforhold" : {
      "arbeidsforholdId" : "",
      "arbeidstaker" : {
        "fornavn" : "Jennine",
        "etternavn" : "Schamberger",
        "identitetsnummer" : "14096864648"
      },
      "arbeidsgiver" : {
        "arbeidsgiverId" : "711485759"
      }
    },
    "refusjonsbeløp" : 4989.619296096518,
    "status" : "INNVILGET",
    "grad" : 50,
    "dagsats" : 930.4768638290789,
    "ytelse" : "SP",
    "sistEndret" : "2020-07-28"
  }, {
    "periode" : {
      "fom" : "2020-01-01",
      "tom" : "2020-01-15"
    },
    "kafkaOffset" : 2,
    "forbrukteSykedager" : 0,
    "gjenståendeSykedager" : 0,
    "arbeidsforhold" : {
      "arbeidsforholdId" : "",
      "arbeidstaker" : {
        "fornavn" : "Ming",
        "etternavn" : "Cummerata",
        "identitetsnummer" : "30086433202"
      },
      "arbeidsgiver" : {
        "arbeidsgiverId" : "711485759"
      }
    },
    "refusjonsbeløp" : 5688.54111810369,
    "status" : "INNVILGET",
    "grad" : 50,
    "dagsats" : 255.64594768780185,
    "ytelse" : "SP",
    "sistEndret" : "2020-07-28"
  }]
);

useYtelseSammendrag.mockImplementation(() => {
  return mockHookFetch;
});


const mockHookYtelsesperioder = jest.fn().mockResolvedValue( [ {
  "periode" : {
    "fom" : "2020-01-03",
    "tom" : "2020-01-30"
  },
  "kafkaOffset" : 3,
  "forbrukteSykedager" : 0,
  "gjenståendeSykedager" : 0,
  "arbeidsforhold" : {
    "arbeidsforholdId" : "",
    "arbeidstaker" : {
      "fornavn" : "Donald",
      "etternavn" : "Schneider",
      "identitetsnummer" : "11036434890"
    },
    "arbeidsgiver" : {
      "arbeidsgiverId" : "711485759"
    }
  },
  "refusjonsbeløp" : null,
  "status" : "UNDER_BEHANDLING",
  "grad" : null,
  "dagsats" : null,
  "ytelse" : "SP",
  "sistEndret" : "2020-07-28"
}, {
  "periode" : {
    "fom" : "2020-04-07",
    "tom" : "2020-04-30"
  },
  "kafkaOffset" : 10,
  "forbrukteSykedager" : 0,
  "gjenståendeSykedager" : 0,
  "arbeidsforhold" : {
    "arbeidsforholdId" : "",
    "arbeidstaker" : {
      "fornavn" : "Donald",
      "etternavn" : "Schneider",
      "identitetsnummer" : "11036434890"
    },
    "arbeidsgiver" : {
      "arbeidsgiverId" : "711485759"
    }
  },
  "refusjonsbeløp" : null,
  "status" : "UNDER_BEHANDLING",
  "grad" : null,
  "dagsats" : null,
  "ytelse" : "SP",
  "sistEndret" : "2020-07-28"
}, {
  "periode" : {
    "fom" : "2020-09-06",
    "tom" : "2020-09-19"
  },
  "kafkaOffset" : 29,
  "forbrukteSykedager" : 0,
  "gjenståendeSykedager" : 0,
  "arbeidsforhold" : {
    "arbeidsforholdId" : "",
    "arbeidstaker" : {
      "fornavn" : "Donald",
      "etternavn" : "Schneider",
      "identitetsnummer" : "11036434890"
    },
    "arbeidsgiver" : {
      "arbeidsgiverId" : "711485759"
    }
  },
  "refusjonsbeløp" : null,
  "status" : "AVSLÅTT",
  "grad" : null,
  "dagsats" : null,
  "ytelse" : "SP",
  "sistEndret" : "2020-07-28"
}, {
  "periode" : {
    "fom" : "2020-07-22",
    "tom" : "2020-07-30"
  },
  "kafkaOffset" : 25,
  "forbrukteSykedager" : 0,
  "gjenståendeSykedager" : 0,
  "arbeidsforhold" : {
    "arbeidsforholdId" : "",
    "arbeidstaker" : {
      "fornavn" : "Donald",
      "etternavn" : "Schneider",
      "identitetsnummer" : "11036434890"
    },
    "arbeidsgiver" : {
      "arbeidsgiverId" : "711485759"
    }
  },
  "refusjonsbeløp" : 1787.5240939370642,
  "status" : "INNVILGET",
  "grad" : 20,
  "dagsats" : 480.16556089625584,
  "ytelse" : "SP",
  "sistEndret" : "2020-07-28"
}, {
  "periode" : {
    "fom" : "2021-10-16",
    "tom" : "2021-10-26"
  },
  "kafkaOffset" : 36,
  "forbrukteSykedager" : 0,
  "gjenståendeSykedager" : 0,
  "arbeidsforhold" : {
    "arbeidsforholdId" : "",
    "arbeidstaker" : {
      "fornavn" : "Donald",
      "etternavn" : "Schneider",
      "identitetsnummer" : "11036434890"
    },
    "arbeidsgiver" : {
      "arbeidsgiverId" : "711485759"
    }
  },
  "refusjonsbeløp" : 1418.7081347606631,
  "status" : "INNVILGET",
  "grad" : 80,
  "dagsats" : 375.07173691381973,
  "ytelse" : "SP",
  "sistEndret" : "2020-07-28"
}, {
  "periode" : {
    "fom" : "2021-04-29",
    "tom" : "2021-05-13"
  },
  "kafkaOffset" : 2,
  "forbrukteSykedager" : 0,
  "gjenståendeSykedager" : 0,
  "arbeidsforhold" : {
    "arbeidsforholdId" : "",
    "arbeidstaker" : {
      "fornavn" : "Donald",
      "etternavn" : "Schneider",
      "identitetsnummer" : "11036434890"
    },
    "arbeidsgiver" : {
      "arbeidsgiverId" : "711485759"
    }
  },
  "refusjonsbeløp" : null,
  "status" : "UNDER_BEHANDLING",
  "grad" : null,
  "dagsats" : null,
  "ytelse" : "SP",
  "sistEndret" : "2020-07-28"
}, {
  "periode" : {
    "fom" : "2022-01-29",
    "tom" : "2022-01-31"
  },
  "kafkaOffset" : 23,
  "forbrukteSykedager" : 0,
  "gjenståendeSykedager" : 0,
  "arbeidsforhold" : {
    "arbeidsforholdId" : "",
    "arbeidstaker" : {
      "fornavn" : "Donald",
      "etternavn" : "Schneider",
      "identitetsnummer" : "11036434890"
    },
    "arbeidsgiver" : {
      "arbeidsgiverId" : "711485759"
    }
  },
  "refusjonsbeløp" : 7649.920507606071,
  "status" : "INNVILGET",
  "grad" : 50,
  "dagsats" : 534.7787036061458,
  "ytelse" : "SP",
  "sistEndret" : "2020-07-28"
}, {
  "periode" : {
    "fom" : "2020-01-17",
    "tom" : "2020-01-18"
  },
  "kafkaOffset" : 30,
  "forbrukteSykedager" : 0,
  "gjenståendeSykedager" : 0,
  "arbeidsforhold" : {
    "arbeidsforholdId" : "",
    "arbeidstaker" : {
      "fornavn" : "Donald",
      "etternavn" : "Schneider",
      "identitetsnummer" : "11036434890"
    },
    "arbeidsgiver" : {
      "arbeidsgiverId" : "711485759"
    }
  },
  "refusjonsbeløp" : 220.62716197768117,
  "status" : "INNVILGET",
  "grad" : 80,
  "dagsats" : 621.1433287941456,
  "ytelse" : "SP",
  "sistEndret" : "2020-08-03"
} ]
);

useYtelseSammendrag.mockImplementation(() => {
return mockHookFetch;
});



describe('ArbeidsgiverHeader', () => {
  it('should render the component and display wait and then an error', async () => {
    const rendered = render(
      <StoreProvider>
        <ArbeidsgiverHeader arbeidsgiverNavn="ArbeidsgiverNavn" arbeidsgiverId="123" />
      </StoreProvider>
      );

    expect(rendered.getByText(/ArbeidsgiverNavn/)).toBeInTheDocument();
  })

  it('should have no a11y violations', async () => {
    const { container } = render(
      <StoreProvider>
        <ArbeidsgiverHeader arbeidsgiverNavn="test" arbeidsgiverId="123" />
      </StoreProvider>
      );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
