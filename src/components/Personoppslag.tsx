import React from 'react';
import {
  Side,
  useArbeidsgiver
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import YtelseSammendragProvider from '../data/store/YtelseSammendrag';
import './Personoppslag.scss';
import FnrSokeside from './FnrSokeside';

const Personoppslag = () => {
  const { arbeidsgiverId } = useArbeidsgiver();

  return (
    <Side
      sidetittel='Refusjoner'
      bedriftsmeny
      skjulTilbakeLenke
      className='side-personoppslag'
    >
      <YtelseSammendragProvider>
        <FnrSokeside arbeidsgiverId={arbeidsgiverId} />
      </YtelseSammendragProvider>
    </Side>
  );
};

export default Personoppslag;
