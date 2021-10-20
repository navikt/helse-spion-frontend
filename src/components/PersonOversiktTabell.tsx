import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import AlertStripe from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Row } from 'nav-frontend-grid';
import 'nav-frontend-tabell-style';
import 'nav-frontend-skjema-style';
import 'nav-frontend-alertstriper-style';
import 'react-datepicker/dist/react-datepicker.css';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { useArbeidsgiver } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { useAppStore } from '../data/store/AppStore';
import { ErrorType } from '../util/helseSpionTypes';
import YtelsesperiodeTable from './YtelsesperiodeTable';
import useYtelsesperioder from '../data/Ytelsesperioder';
// import useYtelseSammendrag from '../data/useYtelseSammendrag';
import ArbeidstakerDetaljHeader from './ArbeidstakerDetaljHeader';
import './ArbeidsgiverPeriodeTabell.sass';
// import { useYtelseSammendragContext } from '../data/store/YtelseSammendrag';

const PersonOversiktTabell: React.FC = () => {
  const {
    ytelsesperioder,
    ytelsesperioderLoading,
    ytelsesperioderErrorType,
    ytelsesperioderErrorMessage,
    fraDato,
    tilDato
  } = useAppStore();
  // const { ytelsesammendrag } = useYtelseSammendragContext();
  const { arbeidsgiverId, firma } = useArbeidsgiver();
  const [identityNumberInput] = useState<string>('');
  const { t } = useTranslation();
  const arbeidstaker =
    ytelsesperioder && ytelsesperioder[0]?.arbeidsforhold.arbeidstaker;
  const Ytelsesperioder = useYtelsesperioder();
  // const getYtelseSammendrag = useYtelseSammendrag();
  const history = useHistory();

  function onEnterClick(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (event.key === 'Enter' && identityNumberInput.length === 11) {
      event.preventDefault();
      event.stopPropagation();
      handleSubmitSearch();
    }
  }

  const handleNameClick = async (identitetsnummer: string): Promise<void> => {
    await Ytelsesperioder(identitetsnummer, arbeidsgiverId);
  };

  const handleSubmitSearch = async (): Promise<void> => {
    await Ytelsesperioder(
      identityNumberInput.replace(/\D/g, ''),
      arbeidsgiverId
    );
  };

  // useEffect(() => {
  //   if (arbeidsgiverId.length > 1) {
  //     getYtelseSammendrag(arbeidsgiverId, fraDato, tilDato);
  //   }
  // }, [arbeidsgiverId, fraDato, tilDato]); // eslint-disable-line react-hooks/exhaustive-deps

  if (arbeidstaker === undefined) {
    history.goBack();
    return null;
  }

  return (
    <>
      <ArbeidstakerDetaljHeader
        arbeidstaker={arbeidstaker}
        arbeidsgiverId={arbeidsgiverId}
      />
      <Row>
        {ytelsesperioderErrorType &&
          (ytelsesperioderErrorType! in ErrorType ||
          ytelsesperioderErrorMessage ? (
            <AlertStripe type='feil'>{ytelsesperioderErrorMessage}</AlertStripe>
          ) : (
            <AlertStripe type='feil'>{t(ytelsesperioderErrorType)}</AlertStripe>
          ))}
        {ytelsesperioderLoading && (
          <div className='arbeidsgiver-periode-tabell--loading-spinner'>
            {' '}
            <NavFrontendSpinner />{' '}
          </div>
        )}
        {ytelsesperioder &&
          ytelsesperioder.length > 0 &&
          !ytelsesperioderLoading && (
            <YtelsesperiodeTable ytelsesperioder={ytelsesperioder} />
          )}
      </Row>
    </>
  );
};

export default PersonOversiktTabell;
