import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import ArbeidsgiverHeader from './ArbeidsgiverHeader';
import StoreProvider from '../data/store/StoreProvider';
import { testFnr } from '../mockdata/testFnr';

describe('ArbeidsgiverHeader', () => {
  beforeEach(() => {
    jest.mock('../data/useYtelsesperioder');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the component and display wait and then an error', async () => {
    const fetchSpy = jest.spyOn(window, 'fetch');
    const rendered = render(
      <StoreProvider>
        <ArbeidsgiverHeader
          arbeidsgiverNavn='ArbeidsgiverNavn'
          arbeidsgiverId='123'
        />
      </StoreProvider>
    );

    const fnrField = rendered.getByPlaceholderText('IDENTITY_NUMBER_EXT');

    fireEvent.change(fnrField, {
      target: { value: testFnr.GyldigeFraDolly.TestPerson1 }
    });

    const searchButton = rendered.getByRole('button', { name: 'SEARCH' });

    fireEvent.click(searchButton);

    expect(rendered.getByText(/ArbeidsgiverNavn/)).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://helse-spion.dev.nav.no/api/v1/ytelsesperioder/virksomhet/123?fom=2010-01-01&tom=2022-01-01',
      { credentials: 'include', method: 'GET' }
    );
  });

  it('should have no a11y violations', async () => {
    const { container } = render(
      <StoreProvider>
        <ArbeidsgiverHeader arbeidsgiverNavn='test' arbeidsgiverId='123' />
      </StoreProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
