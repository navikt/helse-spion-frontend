import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import StoreProvider from '../data/store/StoreProvider';
import Personoversikt from './Personoversikt';

describe('Personoversikt', () => {
  it('should have now a11y violations', async () => {
    const { container } = render(
      <StoreProvider>
        <Personoversikt />
      </StoreProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
