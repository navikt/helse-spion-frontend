import PersonOversiktDetaljerTable from './PersonOversiktDetaljerTable';
import React from 'react';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Status, Ytelsesperiode } from '../util/helseSpionTypes';

const ytelsesperioder: Ytelsesperiode[] = [
  {
    periode: {
      fom: new Date(),
      tom: new Date()
    },
    arbeidsforhold: {
      arbeidsforholdId: 'ArbeidsforholdId',
      arbeidsgiver: {
        arbeidsgiverId: 'arbeidsgiverId'
      },
      arbeidstaker: {
        etternavn: 'Etternavn',
        fornavn: 'Fornavn',
        identitetsnummer: 'Identitetsnummer'
      }
    },
    forbrukteSykedager: 5,
    gjenståendeSykedager: 4,
    dagsats: 123.4,
    grad: 1,
    refusjonsbeløp: 345.67,
    sistEndret: new Date(),
    status: Status.UNDER_BEHANDLING,
    ytelse: 'Ytelse',
    merknad: 'Merknad'
  }
];

describe('PersonOversiktDetaljerTable', () => {
  it('should hav no a11y violations and display the data', async () => {
    const { container } = render(
      <PersonOversiktDetaljerTable ytelsesperioder={ytelsesperioder} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container.textContent).toContain('345.67');
    expect(container.textContent).toContain('Merknad');
    expect(container.textContent).toContain('Ytelse');
    expect(container.textContent).toContain('UNDER_BEHANDLING');
  });
});
