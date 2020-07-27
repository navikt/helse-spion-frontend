import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import Ytelsesperiode from './Ytelsesperiode';

expect.extend(toHaveNoViolations)

describe('Ytelsesperiode', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<Ytelsesperiode/>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()

    cleanup()
  })
})
