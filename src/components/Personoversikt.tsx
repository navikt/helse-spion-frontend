import React from 'react';
import { Side } from '@navikt/helse-arbeidsgiver-felles-frontend';
import YtelseSammendragProvider from '../data/store/YtelseSammendrag';
import ArbeidsgiverPeriodeOversiktTabell from './ArbeidsgiverPeriodeOversiktTabell';
import './Personoversikt.scss';

const Personoversikt = () => {
  return (
    <Side
      sidetittel='Refusjoner'
      bedriftsmeny
      className='side-personoversikt'
      skjulTilbakeLenke
    >
      <YtelseSammendragProvider>
        <ArbeidsgiverPeriodeOversiktTabell />
      </YtelseSammendragProvider>
    </Side>
  );
};

export default Personoversikt;
