import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen, wait, waitFor } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe';
import { createMemoryHistory } from 'history'
import * as useYtelsesperioder from '../data/Ytelsesperioder';
import { Router } from 'react-router-dom';

import ArbeidsgiverPeriodeTabell from './ArbeidsgiverPeriodeTabell';
import StoreProvider from '../data/store/StoreProvider';

// jest.mock('../data/useYtelseSammendrag');

import useYtelseSammendrag from '../data/useYtelseSammendrag';
import { ArbeidsgiverProvider, Status } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

import { testFnr } from '../mockdata/testFnr';
import YtelseSammendragProvider from '../data/store/YtelseSamendrag';
import { YtelseSammendrag, Status as yStatus } from '../util/helseSpionTypes';

// jest.mock('../data/Ytelsesperioder');

expect.extend(toHaveNoViolations);


const mockHookFetch = jest.fn().mockResolvedValue([]);

const mockYtelsesperiode: YtelseSammendrag[] = [ {
  "navn" : "Donald Schneider",
  "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson1,
  "antall_refusjoner" : 3,
  "merknad": "",
  "max_refusjon_dager": 2,
  "refusjonsbeløp" : 234
}, {
  "navn" : "Donald Duck",
  "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson2,
  "antall_refusjoner" : 3,
  "merknad": "",
  "max_refusjon_dager": 2,
  "refusjonsbeløp" : 234
}, {
  "navn" : "Donald Thump",
  "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson3,
  "antall_refusjoner" : 3,
  "merknad": "",
  "max_refusjon_dager": 2,
  "refusjonsbeløp" : 234
}, {
  "navn" : "Donald von Schneider",
  "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson4,
  "antall_refusjoner" : 3,
  "merknad": "",
  "max_refusjon_dager": 2,
  "refusjonsbeløp" : 234
} ];
// );

// useYtelseSammendrag.mockImplementation(() => {
//   return mockHookFetch;
// });


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
      "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson1
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
      "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson1
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
      "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson1
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
      "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson1
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
      "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson1
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
      "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson1
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
      "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson1
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
      "identitetsnummer" : testFnr.GyldigeFraDolly.TestPerson1
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

// useYtelseSammendrag.mockImplementation(() => {
// return mockHookFetch;
// });



describe('ArbeidsgiverPeriodeTabell', () => {
  const arbeidsgivere: Organisasjon[] = [
    {
    'Name' : 'STADLANDET OG SINGSÅS',
    'Type' : 'Enterprise',
    'ParentOrganizationNumber' : '123456778',
    'OrganizationForm' : 'AS',
    'OrganizationNumber' : '911366940',
    'Status' : 'Active'
  }, {
    'Name' : 'HØNEFOSS OG ØLEN',
    'Type' : 'Enterprise',
    'ParentOrganizationNumber' : '123456778',
    'OrganizationForm' : 'AS',
    'OrganizationNumber' : '910020102',
    'Status' : 'Active'
  }, {
    'Name' : 'JØA OG SEL',
    'Type' : 'Business',
    'ParentOrganizationNumber' : '911366940',
    'OrganizationForm' : 'BEDR',
    'OrganizationNumber' : '910098896',
    'Status' : 'Active'
  }];

  it('should render the component and display the stuff behind the toggle', async () => {
    const history = createMemoryHistory();
    history.push('/the/route?feature=true');
    const rendered = render(
      <StoreProvider>
        <YtelseSammendragProvider ytelseSammendrag={mockYtelsesperiode}>
          <Router history={history}>
            <ArbeidsgiverProvider arbeidsgivere={arbeidsgivere} status={Status.Successfully}>
              <ArbeidsgiverPeriodeTabell />
            </ArbeidsgiverProvider>
          </Router>
        </YtelseSammendragProvider>
      </StoreProvider>
      );

    const fnrField = rendered.getByPlaceholderText('IDENTITY_NUMBER_EXT');

    fireEvent.change(fnrField,{ target: { value: testFnr.GyldigeFraDolly.TestPerson1 } });

    // const searchButton = rendered.getByText(/SEARCH/);

    const searchButton = screen.getByRole('button', { name: 'SEARCH' })

    fireEvent.click(searchButton);

    const fetchSpy = jest.spyOn(window, 'fetch');


    const mockHook = jest.fn();

    jest.spyOn(useYtelsesperioder,'default').mockImplementation(mockHook);


    expect(rendered.getByText(/FIND_OTHER_EMPLOYEE/)).toBeInTheDocument();
  })

  it('should render the component and not display the stuff behind the toggle, but show the searchbox in stead', async () => {
    const history = createMemoryHistory();
    history.push('/the/route');

    const rendered = render(
      <StoreProvider>
        <Router history={history}>
         <ArbeidsgiverProvider arbeidsgivere={arbeidsgivere} status={Status.Successfully}>
            <ArbeidsgiverPeriodeTabell />
          </ArbeidsgiverProvider>
        </Router>
      </StoreProvider>
      );

    expect(rendered.getByText(/EMPLOYEE_SEARCH/)).toBeInTheDocument();
    expect(rendered.getByText(/IDENTITY_NUMBER_EXT/)).toBeInTheDocument();
  })



  it('should have no a11y violations', async () => {
    const history = createMemoryHistory();
    history.push('/the/route');
    const { container } = render(
      <StoreProvider>
        <Router history={history}>
          <ArbeidsgiverPeriodeTabell />
        </Router>
      </StoreProvider>
      );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
