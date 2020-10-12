import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe';
import StoreProvider from '../data/store/StoreProvider';

import { ArbeidsgiverProvider, convertResponseDataToOrganisasjon } from './ArbeidsgiverProvider';

import * as fetchUtils from '../data/rest/utils';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

expect.extend(toHaveNoViolations);

delete window.location;
window.location = new URL('https://www.example.com')

describe('ArbeidsgiverProvider', () => {
  it('should render the component and display spinner while loading', () => {
    const rendered = render(<StoreProvider><ArbeidsgiverProvider><div/></ArbeidsgiverProvider></StoreProvider>);

    expect(rendered.getByText(/Venter.../)).toBeInTheDocument();
  });

  it('should render the IngenData component when failing', () => {
    jest.spyOn(fetchUtils, 'isAnyNotStartedOrPending').mockImplementation(() => false);
    jest.spyOn(fetchUtils, 'hasAny401').mockImplementation(() => false);
    jest.spyOn(fetchUtils, 'hasAnyFailed').mockImplementation(() => true);
    const rendered = render(<StoreProvider><ArbeidsgiverProvider><div/></ArbeidsgiverProvider></StoreProvider>);

    expect(rendered.getByText(/Vi får akkurat nå ikke hentet alle data/)).toBeInTheDocument();
  });

  it('should render the IngenData component when failing', () => {
    jest.spyOn(fetchUtils, 'isAnyNotStartedOrPending').mockImplementation(() => false);
    jest.spyOn(fetchUtils, 'hasAny401').mockImplementation(() => true);

    render(<StoreProvider><ArbeidsgiverProvider><div/></ArbeidsgiverProvider></StoreProvider>);

    expect(window.location.href).toBe('https://loginservice.nav.no/login?redirect=https://arbeidsgiver.nav.no/min-side-refusjon/');
  });

  it('should store fetched data to the store', () => {

  })

  it('should have no a11y violations', async () => {
    const { container } = render(<StoreProvider><ArbeidsgiverProvider><div/></ArbeidsgiverProvider></StoreProvider>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});


describe('convertResponseDataToOrganisasjon', () => {
  it('should return converted data', () => {
    const input: any[] = [
      {
        name: 'Org1',
        type: 'type',
        organizationNumber: '123456789',
        organizationForm: 'AS',
        status: '1',
        parentOrganizationNumber: '987654321',
        data: 'testdata'
      },
      {
        name: 'Org2',
        type: 'type',
        organizationNumber: '123776789',
        organizationForm: 'AS',
        status: '1',
        parentOrganizationNumber: '987884321',
        data: 'testdata'
      }
    ]

    const expected: Organisasjon[] = [
      {
        Name: 'Org1',
        Type: 'type',
        OrganizationNumber: '123456789',
        OrganizationForm: 'AS',
        Status: '1',
        ParentOrganizationNumber: '987654321',

      },
      {
        Name: 'Org2',
        Type: 'type',
        OrganizationNumber: '123776789',
        OrganizationForm: 'AS',
        Status: '1',
        ParentOrganizationNumber: '987884321',
      }
    ]

    expect(convertResponseDataToOrganisasjon(input)).toEqual(expected);
  });
});
