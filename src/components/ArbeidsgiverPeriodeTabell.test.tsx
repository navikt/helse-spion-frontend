import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import ArbeidsgiverPeriodeTabell from './ArbeidsgiverPeriodeTabell';
import StoreProvider from '../data/store/StoreProvider';

import mockArbeidsgivere from '../mockdata/mockArbeidsgivere';

import {
  ArbeidsgiverProvider,
  ArbeidsgiverStatus,
  useArbeidsgiver
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

import { testFnr } from '../mockdata/testFnr';
import YtelseSammendragProvider from '../data/store/YtelseSammendrag';
import { YtelseSammendrag } from '../util/helseSpionTypes';

import mockYtelsesammendrag from '../mockdata/mockYtelsesammendrag';
import mockFetchYtelsesperioder from '../mockdata/mockFetchedYtelsesperioder';
import { act } from 'react-dom/test-utils';
expect.extend(toHaveNoViolations);

const mockYtelsesperiode: YtelseSammendrag[] = mockYtelsesammendrag;

describe('ArbeidsgiverPeriodeTabell', () => {
  const arbeidsgivere: Organisasjon[] = mockArbeidsgivere;

  it('should render the component and display the stuff behind the toggle', async () => {
    const history = createMemoryHistory();
    history.push('/the/route?feature=true');

    const fetchSpy = mockFetch200();

    const rendered = render(
      <StoreProvider>
        <Router history={history}>
          <ArbeidsgiverProvider
            arbeidsgivere={arbeidsgivere}
            status={ArbeidsgiverStatus.Successfully}
            baseUrl='/'
          >
            <YtelseSammendragProvider ytelseSammendrag={mockYtelsesperiode}>
              <ArbeidsgiverPeriodeTabell />
            </YtelseSammendragProvider>
          </ArbeidsgiverProvider>
        </Router>
      </StoreProvider>
    );

    const fnrField = rendered.getByPlaceholderText('IDENTITY_NUMBER_EXT');

    act(() => {
      fireEvent.change(fnrField, {
        target: { value: testFnr.GyldigeFraDolly.TestPerson1 }
      });
    });

    const searchButton = screen.getByRole('button', { name: 'SEARCH' });

    act(() => {
      fireEvent.click(searchButton);
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://helse-spion.dev.nav.no/api/v1/ytelsesperioder/oppslag',
      {
        body: '{"identitetsnummer":"25087327879","arbeidsgiverId":""}',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    );
    expect(rendered.getByText(/FIND_OTHER_EMPLOYEE/)).toBeInTheDocument();
  });

  it('should render the component and not display the stuff behind the toggle, but show the searchbox in stead', async () => {
    const history = createMemoryHistory();
    history.push('/the/route');

    mockFetch200();

    const rendered = render(
      <StoreProvider>
        <Router history={history}>
          <ArbeidsgiverProvider
            arbeidsgivere={arbeidsgivere}
            status={ArbeidsgiverStatus.Successfully}
            baseUrl='/'
          >
            <YtelseSammendragProvider ytelseSammendrag={mockYtelsesperiode}>
              <ArbeidsgiverPeriodeTabell />
            </YtelseSammendragProvider>
          </ArbeidsgiverProvider>
        </Router>
      </StoreProvider>
    );

    expect(rendered.getByText(/EMPLOYEE_SEARCH/)).toBeInTheDocument();
    expect(rendered.getByText(/IDENTITY_NUMBER_EXT/)).toBeInTheDocument();
  });

  it('should have no a11y violations', async () => {
    const history = createMemoryHistory();
    history.push('/the/route');

    mockFetch200();

    let ytreContainer;
    act(() => {
      const { container } = render(
        <StoreProvider>
          <Router history={history}>
            <ArbeidsgiverProvider
              arbeidsgivere={mockArbeidsgivere}
              status={ArbeidsgiverStatus.Successfully}
              baseUrl='/'
            >
              {() => {
                var { setFirma } = useArbeidsgiver();
                setFirma('Frima');
                return (
                  <YtelseSammendragProvider
                    ytelseSammendrag={mockYtelsesperiode}
                  >
                    <ArbeidsgiverPeriodeTabell />
                  </YtelseSammendragProvider>
                );
              }}
            </ArbeidsgiverProvider>
          </Router>
        </StoreProvider>
      );
      ytreContainer = container;
    });
    const results = await axe(ytreContainer);
    expect(results).toHaveNoViolations();
  });
});

function mockFetch200() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockFetchYtelsesperioder)
    })
  );
}
