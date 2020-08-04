import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import Ytelsesperiode from './Ytelsesperiode';
// import Bedriftsmeny from '@navikt/bedriftsmeny';

expect.extend(toHaveNoViolations)

jest.mock('@navikt/bedriftsmeny', () => {
  return {
    __esModule: true,
    // the "default export"
    default: () =>
    <div>Bedriftsmeny</div>
  }
});

describe('Ytelsesperiode', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<Ytelsesperiode/>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()

    cleanup()
  })
})
