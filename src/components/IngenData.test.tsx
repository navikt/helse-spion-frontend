import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe';

import IngenData from './IngenData';

expect.extend(toHaveNoViolations);

describe('IngenData', () => {
  it('should render the component and display a warning text', () => {
    const rendered = render(<IngenData />);

    expect(rendered.queryAllByText(/Vi får akkurat nå ikke hentet alle data./).length).toBe(1);
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<IngenData/>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
