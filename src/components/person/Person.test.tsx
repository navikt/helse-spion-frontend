import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Person from '.';
import StoreProvider from '../../data/store/StoreProvider';

describe('Person', () => {
  it('should have now a11y violations', async () => {
    const { container } = render(
      <StoreProvider>
        <Person />
      </StoreProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
