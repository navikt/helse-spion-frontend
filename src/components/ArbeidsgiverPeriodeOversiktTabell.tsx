import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AlertStripe from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Row } from 'nav-frontend-grid';
import 'nav-frontend-tabell-style';
import 'nav-frontend-skjema-style';
import 'nav-frontend-alertstriper-style';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { useArbeidsgiver } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { useAppStore } from '../data/store/AppStore';
import useYtelsesperioder from '../data/useYtelsesperioder';
import useYtelseSammendrag from '../data/useYtelseSammendrag';
import YtelseSammendragTable from './YtelseSammendragTable';
import ArbeidsgiverHeader from './ArbeidsgiverHeader';
import './ArbeidsgiverPeriodeTabell.sass';
import { useYtelseSammendragContext } from '../data/store/YtelseSammendrag';
import { useHistory } from 'react-router-dom';

const ArbeidsgiverPeriodeOversiktTabell: React.FC = () => {
  const {
    ytelsesperioder,
    ytelsesperioderLoading,
    ytelsesperioderErrorType,
    ytelsesperioderErrorMessage,
    fraDato,
    tilDato
  } = useAppStore();
  const { ytelsesammendrag } = useYtelseSammendragContext();
  const { arbeidsgiverId, firma } = useArbeidsgiver();
  const { t } = useTranslation();
  const Ytelsesperioder = useYtelsesperioder();
  const getYtelseSammendrag = useYtelseSammendrag();
  const history = useHistory();

  const handleNameClick = async (identitetsnummer: string): Promise<void> => {
    const perioder = await Ytelsesperioder(identitetsnummer, arbeidsgiverId);

    const arbeidstaker = perioder && perioder[0]?.arbeidsforhold.arbeidstaker;
    if (arbeidstaker) {
      history.push('/person');
    }
  };

  useEffect(() => {
    if (arbeidsgiverId.length > 1) {
      getYtelseSammendrag(arbeidsgiverId, fraDato, tilDato);
    }
  }, [arbeidsgiverId, fraDato, tilDato]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {ytelsesammendrag &&
        ytelsesperioder.length === 0 &&
        ytelsesammendrag.length > 0 && (
          <Row>
            <ArbeidsgiverHeader
              arbeidsgiverNavn={firma}
              arbeidsgiverId={arbeidsgiverId}
            />
          </Row>
        )}

      <Row>
        {ytelsesperioderErrorType &&
          (ytelsesperioderErrorMessage ? (
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

        {ytelsesperioder && ytelsesammendrag && ytelsesammendrag.length > 0 && (
          <YtelseSammendragTable
            ytelseSammendrag={ytelsesammendrag}
            onNameClick={handleNameClick}
            startdato={fraDato}
            sluttdato={tilDato}
          />
        )}
      </Row>
    </>
  );
};

export default ArbeidsgiverPeriodeOversiktTabell;
