import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe';

import FnrSokeside from './FnrSokeside';
import StoreProvider from '../data/store/StoreProvider';
import * as useYtelsesperioder from '../data/Ytelsesperioder';

expect.extend(toHaveNoViolations);

const mockHook = jest.fn();

jest.spyOn(useYtelsesperioder,'default').mockImplementation(mockHook);

describe('FnrSokeside', () => {
  it('should render the component and display an info text', () => {
    const rendered = render(<StoreProvider><FnrSokeside arbeidsgiverId="123456789"/></StoreProvider>);

    expect(rendered.getByText(/INFO_TEXT/)).toBeInTheDocument();
  })

  it('should render the component and display an info text', () => {
    const rendered = render(<StoreProvider><FnrSokeside arbeidsgiverId="123456789"/></StoreProvider>);

    const inputField = screen.getByLabelText('IDENTITY_NUMBER_EXT');
    const searchButton = screen.getByText('SEARCH');

    fireEvent.change(inputField, { value: '12345678901' });
    fireEvent.click(searchButton);

    expect(rendered.getByText(/INFO_TEXT/)).toBeInTheDocument();
    expect(mockHook).toHaveBeenCalled();
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<StoreProvider><FnrSokeside  arbeidsgiverId="123456789"/></StoreProvider>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
