import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import Redirecter from './Redirecter';
import { Router } from 'react-router-dom';

describe('Redirecter', () => {
  it('should render the component and reroute with params intact', () => {
    const history = createMemoryHistory();
    history.push('/some/route?some=params');
    const rendered = render(<Router history={history}><Redirecter/></Router>);
    const newLocation = history.location;

    delete newLocation.key; // Removes the random part. Not needed anyway

    expect(history.location).toEqual({"hash": "", "pathname": "/personoppslag", "search": "?some=params", "state": undefined});
  })

  it('should render the component and reroute without params', () => {
    const history = createMemoryHistory();
    history.push('/some/route');
    const rendered = render(<Router history={history}><Redirecter/></Router>);
    const newLocation = history.location;

    delete newLocation.key; // Removes the random part. Not needed anyway

    expect(history.location).toEqual({"hash": "", "pathname": "/personoppslag", "search": "", "state": undefined});
  })
});
