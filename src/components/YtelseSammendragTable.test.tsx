import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe';
import StoreProvider from '../data/store/StoreProvider';

import YtelseSammendragTable from './YtelseSammendragTable';
import { YtelseSammendrag } from '../util/helseSpionTypes';

expect.extend(toHaveNoViolations);

describe('YtelseSammendragTable', () => {
  const sammendrag: YtelseSammendrag[] = [
    {
      navn: 'Navn Navnesen',
      identitetsnummer: '12345678901',
      antall_refusjoner: 3,
      merknad: 'merknad',
      max_refusjon_dager: 3,
      refusjonsbeløp: 123.4
    },
    {
      navn: 'Test Testesen',
      identitetsnummer: '12348878901',
      antall_refusjoner: 2,
      merknad: 'merknad 2',
      max_refusjon_dager: 2,
      refusjonsbeløp: 234.5
    }
  ];

  it('should render the component and display data', () => {
    const mockFunction = jest.fn();

    render(<YtelseSammendragTable ytelseSammendrag={sammendrag} onNameClick={mockFunction} startdato="2020.01.01" sluttdato="2020.02.02"/>);

    expect(screen.getByText(/Test Testesen/)).toBeInTheDocument();
    expect(screen.getByText(/12348878901/)).toBeInTheDocument();
    expect(screen.getByText(/merknad 2/)).toBeInTheDocument();
    expect(screen.getByText(/234.5/)).toBeInTheDocument();
    expect(screen.getByText(/01.01.20/)).toBeInTheDocument();
    expect(screen.getByText(/02.02.20/)).toBeInTheDocument();
    expect(screen.getByText(/357.9/)).toBeInTheDocument();
  });

  it('should render the component and display data', () => {
    const mockFunction = jest.fn();

    render(<YtelseSammendragTable ytelseSammendrag={sammendrag} onNameClick={mockFunction} startdato="2020.01.01" sluttdato="2020.02.02"/>);

    const idNumberHeader = screen.getByText(/IDENTITY_NUMBER/)

    fireEvent.click(idNumberHeader);

    expect(screen.getByText(/Test Testesen/)).toBeInTheDocument();
    expect(screen.getByText(/12348878901/)).toBeInTheDocument();
    expect(screen.getByText(/merknad 2/)).toBeInTheDocument();
    expect(screen.getByText(/234.5/)).toBeInTheDocument();
    expect(screen.getByText(/01.01.20/)).toBeInTheDocument();
    expect(screen.getByText(/02.02.20/)).toBeInTheDocument();
    expect(screen.getByText(/357.9/)).toBeInTheDocument();
  });

  it('should have no a11y violations', async () => {

    const mockFunction = jest.fn();

    const rendered = render(<YtelseSammendragTable ytelseSammendrag={sammendrag} onNameClick={mockFunction} startdato="2020.01.01" sluttdato="2020.02.02"/>);

    const results = await axe(rendered.container);
    expect(results).toHaveNoViolations();
  });
});
