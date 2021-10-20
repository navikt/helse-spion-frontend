import React from 'react';
import { Side } from '@navikt/helse-arbeidsgiver-felles-frontend';
import YtelseSammendragProvider from '../data/store/YtelseSammendrag';
import ArbeidsgiverPeriodeTabell from './ArbeidsgiverPeriodeTabell';

const Personoppslag = () => {
  return (
    <Side sidetittel='Min side - Refusjonsportal' bedriftsmeny>
      <YtelseSammendragProvider>
        <ArbeidsgiverPeriodeTabell />
      </YtelseSammendragProvider>
    </Side>
  );
};

export default Personoppslag;
