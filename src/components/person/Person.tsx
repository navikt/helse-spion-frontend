import React from 'react';
import { Side } from '@navikt/helse-arbeidsgiver-felles-frontend';
import YtelseSammendragProvider from '../../data/store/YtelseSammendrag';
import './Person.scss';
import PersonOversiktTabell from '../PersonOversiktTabell';

const Person = () => {
  return (
    <Side
      sidetittel='Refusjoner'
      bedriftsmeny
      className='side-person'
      skjulTilbakeLenke
    >
      <YtelseSammendragProvider>
        <PersonOversiktTabell />
      </YtelseSammendragProvider>
    </Side>
  );
};

export default Person;
