import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
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
import ArbeidstakerDetaljHeader from './ArbeidstakerDetaljHeader';
import './ArbeidsgiverPeriodeTabell.sass';

const PersonOversiktTabell: React.FC = () => {
  const {
    ytelsesperioder,
    ytelsesperioderLoading,
    ytelsesperioderErrorType,
    ytelsesperioderErrorMessage
  } = useAppStore();

  const { arbeidsgiverId } = useArbeidsgiver();
  const { t } = useTranslation();
  const arbeidstaker =
    ytelsesperioder && ytelsesperioder[0]?.arbeidsforhold.arbeidstaker;
  const history = useHistory();

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
          (ytelsesperioderErrorMessage ? (
            <AlertStripe type='feil'>{ytelsesperioderErrorMessage}</AlertStripe>
          ) : (
            <AlertStripe type='feil'>{t(ytelsesperioderErrorType)}</AlertStripe>
          ))}
        {ytelsesperioderLoading && (
          <div className='arbeidsgiver-periode-tabell--loading-spinner'>
            <NavFrontendSpinner />
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
