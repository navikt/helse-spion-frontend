import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe';
import StoreProvider from '../data/store/StoreProvider';

import YtelsesperiodeTable from './YtelsesperiodeTable';
import { Status, YtelseSammendrag, Ytelsesperiode } from '../util/helseSpionTypes';

expect.extend(toHaveNoViolations);

describe('YtelsesperiodeTable', () => {
  const ytelsesperioder: Ytelsesperiode[] = [ {
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
        "identitetsnummer" : "11036434890"
      },
      "arbeidsgiver" : {
        "arbeidsgiverId" : "711485759"
      }
    },
    "refusjonsbeløp" : 232,
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
        "identitetsnummer" : "11036434890"
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
        "identitetsnummer" : "11036434890"
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
        "identitetsnummer" : "11036434890"
      },
      "arbeidsgiver" : {
        "arbeidsgiverId" : "711485759"
      }
    },
    "refusjonsbeløp" : 1787.5240939370642,
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
        "identitetsnummer" : "11036434890"
      },
      "arbeidsgiver" : {
        "arbeidsgiverId" : "711485759"
      }
    },
    "refusjonsbeløp" : 1418.7081347606631,
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
        "identitetsnummer" : "11036434890"
      },
      "arbeidsgiver" : {
        "arbeidsgiverId" : "711485759"
      }
    },
    "refusjonsbeløp" : 123,
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
        "identitetsnummer" : "11036434890"
      },
      "arbeidsgiver" : {
        "arbeidsgiverId" : "711485759"
      }
    },
    "refusjonsbeløp" : 7649.920507606071,
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
        "identitetsnummer" : "11036434890"
      },
      "arbeidsgiver" : {
        "arbeidsgiverId" : "711485759"
      }
    },
    "refusjonsbeløp" : 220.62716197768117,
    "status" : Status.INNVILGET,
    "grad" : 80,
    "dagsats" : 621.1433287941456,
    "ytelse" : "SP",
    "sistEndret" : new Date("2020-08-03")
  } ];

  const sammendrag: YtelseSammendrag[] = [
    {
      navn: 'Navn Navnesen',
      identitetsnummer: '12345678901',
      antall_refusjoner: 3,
      merknad: 'merknad',
      max_refusjon_dager: 3,
      refusjonsbeløp: 123.4
    },
    {
      navn: 'Test Testesen',
      identitetsnummer: '12348878901',
      antall_refusjoner: 2,
      merknad: 'merknad 2',
      max_refusjon_dager: 2,
      refusjonsbeløp: 234.5
    }
  ];

  it('should render the component and display data', () => {
    render(<YtelsesperiodeTable ytelsesperioder={ytelsesperioder} />);

    expect(screen.getByText(/20-01-03 - 20-01-30/)).toBeInTheDocument();
    expect(screen.getByText(/220.62.716.197.768.117/)).toBeInTheDocument();
    expect(screen.getByText(/1.418.7.081.347.606.631/)).toBeInTheDocument();
    expect(screen.getByText(/232/)).toBeInTheDocument();
    expect(screen.getByText(/20-04-07 - 20-04-30/)).toBeInTheDocument();
    expect(screen.getByText(/AVSLÅTT/)).toBeInTheDocument();
  });

  it('should render the component and display data', () => {
    render(<YtelsesperiodeTable ytelsesperioder={ytelsesperioder} />);

    expect(screen.getByText(/20-01-03 - 20-01-30/)).toBeInTheDocument();
    expect(screen.getByText(/220.62.716.197.768.117/)).toBeInTheDocument();
    expect(screen.getByText(/1.418.7.081.347.606.631/)).toBeInTheDocument();
    expect(screen.getByText(/232/)).toBeInTheDocument();
    expect(screen.getByText(/20-04-07 - 20-04-30/)).toBeInTheDocument();
    expect(screen.getByText(/AVSLÅTT/)).toBeInTheDocument();
  });

  it('should have no a11y violations', async () => {

    const mockFunction = jest.fn();

    const rendered = render(<YtelsesperiodeTable ytelsesperioder={ytelsesperioder} />);

    const results = await axe(rendered.container);
    expect(results).toHaveNoViolations();
  });
});
