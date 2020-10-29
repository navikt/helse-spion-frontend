import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen, getAllByTestId } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe';

import YtelsesperiodeTable from './YtelsesperiodeTable';
import { Ytelsesperiode } from '../util/helseSpionTypes';

import mockYtelsesperiode from '../mockdata/mockYtelsesperiode';

expect.extend(toHaveNoViolations);

describe('YtelsesperiodeTable', () => {
  const ytelsesperioder: Ytelsesperiode[] = mockYtelsesperiode;


  it('should render the component and display data', () => {
    render(<YtelsesperiodeTable ytelsesperioder={ytelsesperioder} />);

    expect(screen.getByText(/03.01.20 - 30.01.20/)).toBeInTheDocument();
    expect(screen.getByText(/220/)).toBeInTheDocument();
    expect(screen.getByText(/1.418/)).toBeInTheDocument();
    expect(screen.getByText(/11.788/)).toBeInTheDocument();
    expect(screen.getByText(/07.04.20 - 30.04.20/)).toBeInTheDocument();
    expect(screen.getByText(/AVSLÅTT/)).toBeInTheDocument();
  });

  it('should render the component and display data, sort on column click', () => {
    const expected = [
      '7.649',
      '1.787',
      '1.418',
      '234',
      '222',
      '220',
      '135',
      '123'
    ];

    const descendingExpected = [
      '123',
      '135',
      '220',
      '222',
      '234',
      '1.418',
      '1.787',
      '7.649'
    ];

    render(<YtelsesperiodeTable ytelsesperioder={ytelsesperioder} />);

    const columnHeader = screen.getByText('REFUND');

    fireEvent.click(columnHeader);

    const refunds = screen.getAllByTestId('ytelse');
    const ytelser = refunds.map((element) => {
      return element.firstChild?.textContent
    })

    expect(ytelser).toStrictEqual(expected);
    expect(screen.getByText(/AVSLÅTT/)).toBeInTheDocument();

    fireEvent.click(columnHeader);

    const descendingYtelser = refunds.map((element) => {
      return element.firstChild?.textContent
    })

    expect(descendingYtelser).toStrictEqual(descendingExpected);
  });

  it('should have no a11y violations', async () => {

    const mockFunction = jest.fn();

    const rendered = render(<YtelsesperiodeTable ytelsesperioder={ytelsesperioder} />);

    const results = await axe(rendered.container);
    expect(results).toHaveNoViolations();
  });
});
