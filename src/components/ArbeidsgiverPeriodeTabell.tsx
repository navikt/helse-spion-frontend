import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import AlertStripe from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Row, Column } from 'nav-frontend-grid';
import 'nav-frontend-tabell-style';
import 'nav-frontend-skjema-style';
import 'nav-frontend-alertstriper-style';
import 'react-datepicker/dist/react-datepicker.css';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import {InnloggetSide, useArbeidsgiver} from '@navikt/helse-arbeidsgiver-felles-frontend'
import { useAppStore } from '../data/store/AppStore';
import { ErrorType } from '../util/helseSpionTypes';
import YtelsesperiodeTable from './YtelsesperiodeTable';
import useYtelsesperioder from '../data/Ytelsesperioder';
import useYtelseSammendrag from '../data/useYtelseSammendrag';
import YtelseSammendragTable from './YtelseSammendragTable';
import ArbeidstakerDetaljHeader from './ArbeidstakerDetaljHeader';
import ArbeidsgiverHeader from './ArbeidsgiverHeader';
import FnrSokeside from './FnrSokeside';
import './ArbeidsgiverPeriodeTabell.sass';

const ArbeidsgiverPeriodeTabell: React.FC = () => {
  const {
    ytelsesperioder,
    ytelsesperioderLoading,
    ytelsesperioderErrorType,
    ytelsesperioderErrorMessage,
    ytelsesammendrag,
    setYtelsesammendrag,
    setYtelsesperioder,
    fraDato,
    tilDato,
  } = useAppStore();
  const { arbeidsgiverId, firma } = useArbeidsgiver();
  const [identityNumberInput ] = useState<string>('');
  const { t } = useTranslation();
  const arbeidstaker = ytelsesperioder[0]?.arbeidsforhold.arbeidstaker;
  const Ytelsesperioder = useYtelsesperioder();
  const getYtelseSammendrag = useYtelseSammendrag();
  const [ featureFlag, setFeatureFlag ] = useState<Boolean>(false);

  function onEnterClick(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (event.key === 'Enter' && identityNumberInput.length === 11) {
      event.preventDefault();
      event.stopPropagation();
      handleSubmitSearch();
    }
  };

  const handleNameClick = async (identitetsnummer: string): Promise<void> => {
    await Ytelsesperioder(identitetsnummer, arbeidsgiverId);
  };

  const handleSubmitSearch = async (): Promise<void> => {
    await Ytelsesperioder(identityNumberInput.replace(/\D/g, ''), arbeidsgiverId);
  };

  useEffect(() => {
    if(arbeidsgiverId.length > 1 && featureFlag) {
      getYtelseSammendrag(arbeidsgiverId, fraDato, tilDato);
    }

  },[arbeidsgiverId, fraDato, tilDato]);

  const location: any = useLocation();
  if(location && location.search.includes('feature=true')) {
    if(!featureFlag) {
      setFeatureFlag(true);
    }
  }

  return (
    <InnloggetSide>

      { ytelsesperioder.length === 0 && ytelsesammendrag.length > 0 &&
      (
        <Row>
          <ArbeidsgiverHeader arbeidsgiverNavn={firma} arbeidsgiverId={arbeidsgiverId}/>
        </Row>
      )}

      {
        arbeidstaker ?
          <ArbeidstakerDetaljHeader arbeidstaker={arbeidstaker} arbeidsgiverId={arbeidsgiverId}/>
          :
          <Row className="arbeidsgiver-periode--lufting">
            <Column sm="12"/>
            <Column sm="12"/>
          </Row>
      }


        <Row>
          <Column sm="12">
            {
              ytelsesperioder.length === 0 && !featureFlag &&
                <FnrSokeside arbeidsgiverId={arbeidsgiverId} />
            }
            {
              ytelsesperioderErrorType &&
              (
                ytelsesperioderErrorType !in ErrorType || ytelsesperioderErrorMessage
                ? <AlertStripe type="feil">{ytelsesperioderErrorMessage}</AlertStripe>
                : <AlertStripe type="feil">{t(ytelsesperioderErrorType)}</AlertStripe>
                )
              }
            {
              ytelsesperioderLoading &&
              <div className="arbeidsgiver-periode-tabell--loading-spinner"> <NavFrontendSpinner /> </div>
            }
            {
              ytelsesperioder.length > 0 && !ytelsesperioderLoading &&
              <YtelsesperiodeTable ytelsesperioder={ytelsesperioder}/>
            }
            {
              ytelsesperioder.length === 0 && ytelsesammendrag.length > 0 && !ytelsesperioderLoading &&
              <YtelseSammendragTable ytelseSammendrag={ytelsesammendrag} onNameClick={handleNameClick} startdato={fraDato} sluttdato={tilDato}/>
            }
          </Column>
        </Row>

    </InnloggetSide>
  );
};

export default ArbeidsgiverPeriodeTabell;
