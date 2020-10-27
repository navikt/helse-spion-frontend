import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import ArbeidsgiverHeader from './ArbeidsgiverHeader';
import StoreProvider from '../data/store/StoreProvider';

jest.mock('../data/useYtelseSammendrag');

import useYtelseSammendrag from '../data/useYtelseSammendrag';
import mockFetchedYtelsesperioder from '../mockdata/mockFetchedYtelsesperioder';

jest.mock('../data/Ytelsesperioder');

expect.extend(toHaveNoViolations);

const mockHookFetch = jest.fn().mockResolvedValue(mockFetchedYtelsesperioder);

useYtelseSammendrag.mockImplementation(() => {
  return mockHookFetch;
});

describe('ArbeidsgiverHeader', () => {
  // it('should render the component and display wait and then an error', async () => {
  //   const fetchSpy = jest.spyOn(window, 'fetch');
  //   const rendered = render(
  //     <StoreProvider>
  //       <ArbeidsgiverHeader
  //         arbeidsgiverNavn='ArbeidsgiverNavn'
  //         arbeidsgiverId='123'
  //       />
  //     </StoreProvider>
  //   );

  //   const fnrField = rendered.getByPlaceholderText('IDENTITY_NUMBER_EXT');

  //   fireEvent.change(fnrField, {
  //     target: { value: testFnr.GyldigeFraDolly.TestPerson1 }
  //   });

  //   // const searchButton = rendered.getByText(/SEARCH/);
  //   const searchButton = rendered.getByRole('button', { name: 'SEARCH' });

  //   fireEvent.click(searchButton);

  //   expect(rendered.getByText(/ArbeidsgiverNavn/)).toBeInTheDocument();
  //   // expect(fetchSpy).toHaveBeenCalledWith({});
  // });

  it('should have no a11y violations', async () => {
    const { container } = render(
      <StoreProvider>
        <ArbeidsgiverHeader arbeidsgiverNavn='test' arbeidsgiverId='123' />
      </StoreProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
