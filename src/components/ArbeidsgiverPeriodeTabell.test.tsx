import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createMemoryHistory } from 'history';
import * as useYtelsesperioder from '../data/Ytelsesperioder';
import { Router } from 'react-router-dom';

import ArbeidsgiverPeriodeTabell from './ArbeidsgiverPeriodeTabell';
import StoreProvider from '../data/store/StoreProvider';

import mockArbeidsgivere from '../mockdata/mockArbeidsgivere';
import mockFetchedYtelsesperioder from '../mockdata/mockFetchedYtelsesperioder';

import useYtelseSammendrag from '../data/useYtelseSammendrag';
import {
  ArbeidsgiverProvider,
  Status
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

import { testFnr } from '../mockdata/testFnr';
import YtelseSammendragProvider from '../data/store/YtelseSamendrag';
import { YtelseSammendrag, Status as yStatus } from '../util/helseSpionTypes';

import mockYtelsesammendrag from '../mockdata/mockYtelsesammendrag';

expect.extend(toHaveNoViolations);

const mockHookFetch = jest.fn().mockResolvedValue([]);

const mockYtelsesperiode: YtelseSammendrag[] = mockYtelsesammendrag;

const mockHookYtelsesperioder = jest
  .fn()
  .mockResolvedValue(mockFetchedYtelsesperioder);

describe('ArbeidsgiverPeriodeTabell', () => {
  const arbeidsgivere: Organisasjon[] = mockArbeidsgivere;

  it('should render the component and display the stuff behind the toggle', async () => {
    const history = createMemoryHistory();
    history.push('/the/route?feature=true');
    const rendered = render(
      <StoreProvider>
        <YtelseSammendragProvider ytelseSammendrag={mockYtelsesperiode}>
          <Router history={history}>
            <ArbeidsgiverProvider
              arbeidsgivere={arbeidsgivere}
              status={Status.Successfully}
            >
              <ArbeidsgiverPeriodeTabell />
            </ArbeidsgiverProvider>
          </Router>
        </YtelseSammendragProvider>
      </StoreProvider>
    );

    const fnrField = rendered.getByPlaceholderText('IDENTITY_NUMBER_EXT');

    fireEvent.change(fnrField, {
      target: { value: testFnr.GyldigeFraDolly.TestPerson1 }
    });

    const searchButton = screen.getByRole('button', { name: 'SEARCH' });

    fireEvent.click(searchButton);

    const fetchSpy = jest.spyOn(window, 'fetch');

    const mockHook = jest.fn();

    jest.spyOn(useYtelsesperioder, 'default').mockImplementation(mockHook);

    expect(rendered.getByText(/FIND_OTHER_EMPLOYEE/)).toBeInTheDocument();
  });

  it('should render the component and not display the stuff behind the toggle, but show the searchbox in stead', async () => {
    const history = createMemoryHistory();
    history.push('/the/route');

    const rendered = render(
      <StoreProvider>
        <Router history={history}>
          <ArbeidsgiverProvider
            arbeidsgivere={arbeidsgivere}
            status={Status.Successfully}
          >
            <ArbeidsgiverPeriodeTabell />
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
    const { container } = render(
      <StoreProvider>
        <Router history={history}>
          <ArbeidsgiverProvider
            arbeidsgivere={mockArbeidsgivere}
            status={Status.Successfully}
          >
            <ArbeidsgiverPeriodeTabell />
          </ArbeidsgiverProvider>
        </Router>
      </StoreProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
