import React from 'react';
import { Side } from '@navikt/helse-arbeidsgiver-felles-frontend';
import YtelseSammendragProvider from '../data/store/YtelseSammendrag';
import ArbeidsgiverPeriodeTabell from './ArbeidsgiverPeriodeTabell';
import './Personoppslag.scss';

const Personoppslag = () => {
  return (
    <Side
      sidetittel='Refusjoner'
      bedriftsmeny
      skjulTilbakeLenke
      className='side-personoppslag'
    >
      <YtelseSammendragProvider>
        <ArbeidsgiverPeriodeTabell />
      </YtelseSammendragProvider>
    </Side>
  );
};

export default Personoppslag;
