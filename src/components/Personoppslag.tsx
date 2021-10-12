import React from 'react';
import { InnloggetSide } from '@navikt/helse-arbeidsgiver-felles-frontend';
import YtelseSammendragProvider from '../data/store/YtelseSammendrag';
import ArbeidsgiverPeriodeTabell from './ArbeidsgiverPeriodeTabell';

const Personoppslag = () => {
  return (
    <InnloggetSide sideTittel='Min side - Refusjonsportal'>
      <YtelseSammendragProvider>
        <ArbeidsgiverPeriodeTabell />
      </YtelseSammendragProvider>
    </InnloggetSide>
  );
};

export default Personoppslag;
