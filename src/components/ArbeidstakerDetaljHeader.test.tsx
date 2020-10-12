import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen, wait, waitFor } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe';

import ArbeidstakerDetaljHeader, {ArbeidstakerInterface} from './ArbeidstakerDetaljHeader';
import StoreProvider from '../data/store/StoreProvider';
import { ArbeidsgiverProvider } from './ArbeidsgiverProvider';

expect.extend(toHaveNoViolations);

describe('ArbeidstakerDetaljHeader', () => {
  it('should render the component', () => {
    const arbeidstaker: ArbeidstakerInterface = {
      identitetsnummer: '12345678901',
      fornavn: 'Test',
      etternavn: 'Testesen'
    }
    render(
      <StoreProvider>

          <ArbeidstakerDetaljHeader arbeidsgiverId="12345678901" arbeidstaker={arbeidstaker} />

      </StoreProvider>
      );

    expect(screen.getByText(/123456-78901/)).toBeInTheDocument();

  })
})
