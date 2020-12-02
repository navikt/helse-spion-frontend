import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe';

import ArbeidstakerDetaljHeader, { ArbeidstakerInterface } from './ArbeidstakerDetaljHeader';
import StoreProvider from '../data/store/StoreProvider';

expect.extend(toHaveNoViolations);

describe('ArbeidstakerDetaljHeader', () => {
  it('should render the component', () => {
    const arbeidstaker: ArbeidstakerInterface = {
      identitetsnummer: '12345678901',
      fornavn: 'Test',
      etternavn: 'Testesen'
    };

    render(
      <StoreProvider>

          <ArbeidstakerDetaljHeader arbeidsgiverId="12345678901" arbeidstaker={arbeidstaker} />

      </StoreProvider>
      );

    expect(screen.getByText(/123456-78901/)).toBeInTheDocument();

  })

  it('should have no a11y violations', async () => {
    const arbeidstaker: ArbeidstakerInterface = {
      identitetsnummer: '12345678901',
      fornavn: 'Test',
      etternavn: 'Testesen'
    };

    const { container } = render(
      <StoreProvider>
        <ArbeidstakerDetaljHeader arbeidsgiverId="12345678901" arbeidstaker={arbeidstaker} />
      </StoreProvider>
      );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

})
