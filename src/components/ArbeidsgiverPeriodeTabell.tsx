import React, { useState, useEffect } from 'react';
import 'nav-frontend-tabell-style';
import 'nav-frontend-skjema-style';
import './ArbeidsgiverPeriodeTabell.css';
import 'nav-frontend-alertstriper-style';
import { useTranslation } from 'react-i18next';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { useHistory } from 'react-router-dom';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { useAppStore } from '../data/store/AppStore';
import { History } from 'history';
import { Keys } from '../locales/keys';
import { ErrorType } from '../util/helseSpionTypes';
import AlertStripe from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import YtelsesperiodeTable from './YtelsesperiodeTable';
import useYtelsesperioder from '../data/Ytelsesperioder';
import { Row, Container, Column } from 'nav-frontend-grid';

import useYtelseSammendrag from '../data/useYtelseSammendrag';
import YtelseSammendragTable from './YtelseSammendragTable';
import ArbeidstakerDetaljHeader from './ArbeidstakerDetaljHeader';
import ArbeidsgiverHeader from './ArbeidsgiverHeader';
import FnrSokeside from './FnrSokeside';


const ArbeidsgiverPeriodeTabell: React.FC = () => {
  const {
    arbeidsgivere,
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
  const [arbeidsgiverId, setArbeidsgiverId] = useState<string>('');
  const [arbeidsgiverNavn, setArbeidsgiverNavn] = useState<string>('');
  const [identityNumberInput, setIdentityNumberInput] = useState<string>('');
  const { t } = useTranslation();
  const history: History = useHistory();
  const arbeidstaker = ytelsesperioder[0]?.arbeidsforhold.arbeidstaker;
  const [valgteDatoer, setValgteDatoer] = useState< [Date, Date] | undefined >();
  const Ytelsesperioder = useYtelsesperioder();

  // const ytelseSammendrag = useYtelseSammendrag();

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

  // useEffect( () => {
  //   const hentYtelsesdata = async () => {
  //     await ytelseSammendrag(arbeidsgiverId, fraDato, tilDato);
  //   }
  //   if(arbeidsgiverId) {
  //     hentYtelsesdata();
  //   }
  // },[arbeidsgiverId, fraDato, tilDato])

  return (
    <main className="arbeidsgiver-periode-main">
      <Bedriftsmeny
        history={history}
        onOrganisasjonChange={(org: Organisasjon) => {setArbeidsgiverId(org.OrganizationNumber); setArbeidsgiverNavn(org.Name)}}
        sidetittel={t(Keys.MY_PAGE)}
        organisasjoner={arbeidsgivere}
        />
      <Container>
      { ytelsesperioder.length === 0 && ytelsesammendrag.length > 0 &&
      (
        <ArbeidsgiverHeader arbeidsgiverNavn={arbeidsgiverNavn} arbeidsgiverId={arbeidsgiverId}/>
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
              ytelsesperioder.length === 0 &&
                <FnrSokeside arbeidsgiverId={arbeidsgiverId} />
            }
            {
              ytelsesperioderErrorType &&
              (
                ytelsesperioderErrorType in ErrorType
                ? <AlertStripe type="feil">{t(ytelsesperioderErrorType)}</AlertStripe>
                : <AlertStripe type="feil">{ytelsesperioderErrorMessage}</AlertStripe>
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
      </Container>
    </main>
  );
};

export default ArbeidsgiverPeriodeTabell;
