import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import YtelseSammendragTable from './YtelseSammendragTable';
import { YtelseSammendrag } from '../util/helseSpionTypes';

import mockYtelsesammendrag from '../mockdata/mockYtelsesammendrag';
import { testFnr } from '../mockdata/testFnr';

expect.extend(toHaveNoViolations);

describe('YtelseSammendragTable', () => {
  const sammendrag: YtelseSammendrag[] = mockYtelsesammendrag;

  it('should render the component and display data', () => {
    const mockFunction = jest.fn();

    render(
      <YtelseSammendragTable
        ytelseSammendrag={sammendrag}
        onNameClick={mockFunction}
        startdato='2020.01.01'
        sluttdato='2020.02.02'
      />
    );

    expect(screen.getByText(/Donald Duck/)).toBeInTheDocument();
    expect(
      screen.getByText(testFnr.GyldigeFraDolly.TestPerson2)
    ).toBeInTheDocument();
    expect(screen.getByText(/merknad 2/)).toBeInTheDocument();
    expect(screen.getByText(/234/)).toBeInTheDocument();
    expect(screen.getByText(/01.01.20/)).toBeInTheDocument();
    expect(screen.getByText(/02.02.20/)).toBeInTheDocument();
    expect(screen.getByText(/942/)).toBeInTheDocument();
  });

  it('should render the component and display new data after click', () => {
    const mockFunction = jest.fn();

    render(
      <YtelseSammendragTable
        ytelseSammendrag={sammendrag}
        onNameClick={mockFunction}
        startdato='2020.01.01'
        sluttdato='2020.02.02'
      />
    );

    const idNumberHeader = screen.getByText(/IDENTITY_NUMBER/);

    fireEvent.click(idNumberHeader);

    expect(screen.getByText(/Donald Schneider/)).toBeInTheDocument();
    expect(
      screen.getByText(testFnr.GyldigeFraDolly.TestPerson1)
    ).toBeInTheDocument();
    expect(screen.getByText(/Merknad på ytelse/)).toBeInTheDocument();
    expect(screen.getByText(/234/)).toBeInTheDocument();
    expect(screen.getByText(/01.01.20/)).toBeInTheDocument();
    expect(screen.getByText(/02.02.20/)).toBeInTheDocument();
    expect(screen.getByText(/942/)).toBeInTheDocument();
  });

  it('should have no a11y violations', async () => {
    const mockFunction = jest.fn();

    const rendered = render(
      <YtelseSammendragTable
        ytelseSammendrag={sammendrag}
        onNameClick={mockFunction}
        startdato='2020.01.01'
        sluttdato='2020.02.02'
      />
    );

    const results = await axe(rendered.container);
    expect(results).toHaveNoViolations();
  });
});
