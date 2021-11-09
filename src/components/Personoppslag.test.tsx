import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import StoreProvider from '../data/store/StoreProvider';
import Personoppslag from './Personoppslag';

describe('Personoppslag', () => {
  it('should have now a11y violations', async () => {
    const { container } = render(
      <StoreProvider>
        <Personoppslag />
      </StoreProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
