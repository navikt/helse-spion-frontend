import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import PersonOversiktTabell from './PersonOversiktTabell';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { useAppStore } from '../data/store/AppStore';
import { ErrorType } from '../util/helseSpionTypes';

jest.mock('../data/store/AppStore');

const ytelsesperioderMock = [
  {
    periode: {
      fom: new Date(),
      tom: new Date()
    },
    arbeidsforhold: {
      arbeidstaker: {
        etternavn: 'string',
        fornavn: 'string',
        identitetsnummer: 'string'
      }
    }
  }
];

describe('PersonOversiktTabell', () => {
  it('should have now a11y violations, just go back', async () => {
    const history = createMemoryHistory();
    const goBackSpy = jest.spyOn(history, 'goBack'); // or 'replace', 'goBack', etc.
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    useAppStore.mockImplementation(() => ({
      // eslint-disable-line
      ytelsesperioderLoading: false,
      ytelsesperioderErrorType: undefined,
      ytelsesperioderErrorMessage: undefined,
      ytelsesperioder: []
    }));

    const { container } = render(
      <Router history={history}>
        <PersonOversiktTabell />
      </Router>
    );
    const results = await axe(container);
    expect(goBackSpy).toHaveBeenCalled();
    expect(results).toHaveNoViolations();
  });

  it('should have now a11y violations, just show the stuff', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    useAppStore.mockImplementation(() => ({
      // eslint-disable-line
      ytelsesperioderLoading: false,
      ytelsesperioderErrorType: undefined,
      ytelsesperioderErrorMessage: undefined,
      ytelsesperioder: ytelsesperioderMock
    }));

    const history = createMemoryHistory();
    const goBackSpy = jest.spyOn(history, 'goBack'); // or 'replace', 'goBack', etc.

    const { container } = render(
      <Router history={history}>
        <PersonOversiktTabell />
      </Router>
    );
    const results = await axe(container);
    expect(goBackSpy).not.toHaveBeenCalled();
    expect(results).toHaveNoViolations();
  });

  it('should have now a11y violations, just show the error', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    useAppStore.mockImplementation(() => ({
      // eslint-disable-line
      ytelsesperioderLoading: false,
      ytelsesperioderErrorType: ErrorType.IDENTITETSNUMMERCONSTRAINT,
      ytelsesperioderErrorMessage: undefined,
      ytelsesperioder: ytelsesperioderMock
    }));

    const history = createMemoryHistory();
    const goBackSpy = jest.spyOn(history, 'goBack'); // or 'replace', 'goBack', etc.

    const { container } = render(
      <Router history={history}>
        <PersonOversiktTabell />
      </Router>
    );
    const results = await axe(container);
    expect(container.textContent).toContain('feil');
    expect(goBackSpy).not.toHaveBeenCalled();
    expect(results).toHaveNoViolations();
  });

  it('should have now a11y violations, just show the errormessage', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    useAppStore.mockImplementation(() => ({
      // eslint-disable-line
      ytelsesperioderLoading: false,
      ytelsesperioderErrorType: ErrorType.IDENTITETSNUMMERCONSTRAINT,
      ytelsesperioderErrorMessage: 'Feilmelding',
      ytelsesperioder: ytelsesperioderMock
    }));

    const history = createMemoryHistory();
    const goBackSpy = jest.spyOn(history, 'goBack'); // or 'replace', 'goBack', etc.

    const { container } = render(
      <Router history={history}>
        <PersonOversiktTabell />
      </Router>
    );
    const results = await axe(container);
    expect(container.textContent).toContain('Feilmelding');
    expect(goBackSpy).not.toHaveBeenCalled();
    expect(results).toHaveNoViolations();
  });

  it('should have now a11y violations, just show the loading state', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    useAppStore.mockImplementation(() => ({
      // eslint-disable-line
      ytelsesperioderLoading: true,
      ytelsesperioderErrorType: ErrorType.IDENTITETSNUMMERCONSTRAINT,
      ytelsesperioderErrorMessage: 'Feilmelding',
      ytelsesperioder: ytelsesperioderMock
    }));

    const history = createMemoryHistory();
    const goBackSpy = jest.spyOn(history, 'goBack'); // or 'replace', 'goBack', etc.

    const { container } = render(
      <Router history={history}>
        <PersonOversiktTabell />
      </Router>
    );
    const results = await axe(container);
    expect(container.textContent).toContain('Venter...');
    expect(goBackSpy).not.toHaveBeenCalled();
    expect(results).toHaveNoViolations();
  });
});
