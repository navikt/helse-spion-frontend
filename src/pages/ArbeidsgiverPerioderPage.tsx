import React from 'react';
import { InnloggetSide } from '@navikt/helse-arbeidsgiver-felles-frontend';
import ArbeidsgiverPeriodeTabell from '../components/ArbeidsgiverPeriodeTabell';

const ArbeidsgiverPeriodePage = () => {
  return (
    <InnloggetSide>
      <ArbeidsgiverPeriodeTabell />
    </InnloggetSide>
  );
}

export default ArbeidsgiverPeriodePage;
