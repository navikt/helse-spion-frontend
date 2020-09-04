import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { History } from 'history';

import AlertStripe from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Row, Container, Column } from 'nav-frontend-grid';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import 'nav-frontend-tabell-style';
import 'nav-frontend-skjema-style';
import 'nav-frontend-alertstriper-style';
import 'react-datepicker/dist/react-datepicker.css';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';

import { useAppStore } from '../data/store/AppStore';
import { Keys } from '../locales/keys';
import { ErrorType } from '../util/helseSpionTypes';
import YtelsesperiodeTable from './YtelsesperiodeTable';
import useYtelsesperioder from '../data/Ytelsesperioder';

import YtelseSammendragTable from './YtelseSammendragTable';
import ArbeidstakerDetaljHeader from './ArbeidstakerDetaljHeader';
import ArbeidsgiverHeader from './ArbeidsgiverHeader';
import FnrSokeside from './FnrSokeside';
import './ArbeidsgiverPeriodeTabell.sass';

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
      </Container>
    </main>
  );
};

export default ArbeidsgiverPeriodeTabell;
