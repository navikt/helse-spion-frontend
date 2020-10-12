import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { useAppStore } from '../data/store/AppStore';
import React, { useEffect, useRef, useState } from 'react';
import {
  FetchState,
  hasAny401,
  hasAnyFailed,
  hasData,
  isAnyNotStartedOrPending,
  isNotStarted
} from '../data/rest/utils';
import useFetch from '../data/rest/use-fetch';
import Spinner from 'nav-frontend-spinner';
import IngenData from './IngenData';
import env from '../Environment'

function ArbeidsgiverProvider(props: {children: any}) {
  const { setArbeidsgivere } = useAppStore();
  const arbeidsgivere = useFetch<Organisasjon[]>();
  const arbeidsgivereRef = useRef(arbeidsgivere);
  arbeidsgivereRef.current = arbeidsgivere;
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    if (isNotStarted(arbeidsgivere)) {
      arbeidsgivere.fetch(env.baseUrl + '/api/v1/arbeidsgivere', {
        credentials: 'include',
      }, (fetchState: FetchState<Organisasjon[]>) => {
        if (hasData(fetchState)) {
          setArbeidsgivere(convertResponseDataToOrganisasjon(fetchState.data));
        }
      })
    }
  }, [arbeidsgivere, setArbeidsgivere]);

  useEffect(() => {
    setTimeout(checkHasTimedOut, 15000);
    // eslint-disable-next-line
  }, []);

  function checkHasTimedOut() {
    if (isAnyNotStartedOrPending([arbeidsgivereRef.current])) {
      setHasTimedOut(true);
    }
  }

  if (hasTimedOut) {
    return <IngenData/>;
  }

  if (isAnyNotStartedOrPending([ arbeidsgivere ])) {
    return <Spinner type={'XXL'}/>;

  } else if (hasAny401([ arbeidsgivere ])) {
    window.location.href =  env.loginServiceUrl ?? '';

  } else if (hasAnyFailed([ arbeidsgivere ])) {
    return <IngenData/>;
  }

  return props.children;
};

const convertResponseDataToOrganisasjon = (data): Organisasjon[] => data.map(organisasjon => ({
  Name: organisasjon.name,
  Type: organisasjon.type,
  OrganizationNumber: organisasjon.organizationNumber,
  OrganizationForm: organisasjon.organizationForm,
  Status: organisasjon.status,
  ParentOrganizationNumber: organisasjon.parentOrganizationNumber,
}));

export { ArbeidsgiverProvider, convertResponseDataToOrganisasjon};

export default ArbeidsgiverProvider;
