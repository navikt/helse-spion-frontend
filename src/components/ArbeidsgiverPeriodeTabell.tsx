import React, { useState, useEffect } from 'react';
import 'nav-frontend-tabell-style';
import 'nav-frontend-skjema-style';
import './ArbeidsgiverPeriodeTabell.less';
import 'nav-frontend-alertstriper-style';
import { useTranslation } from 'react-i18next';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { useHistory } from 'react-router-dom';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { useAppStore } from '../data/store/AppStore';
import { History } from 'history';
import { Keys } from '../locales/keys';
import Lenke from 'nav-frontend-lenker';
import { Innholdstittel } from 'nav-frontend-typografi';
import { identityNumberSeparation } from '../util/identityNumberSeparation';
import { FnrInput } from 'nav-frontend-skjema';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import { ErrorType } from '../util/helseSpionTypes';
import AlertStripe from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import YtelsesperiodeTable from './YtelsesperiodeTable';
import useYtelsesperioder from '../data/Ytelsesperioder';
import { Row, Container, Column } from 'nav-frontend-grid';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

import validatePerioder from '../util/validatePeriode';
import useYtelseSammendrag from '../data/useYtelseSammendrag';
import YtelseSammendragTable from './YtelseSammendragTable';


const ArbeidsgiverPeriodeTabell: React.FC = () => {
  const {
    arbeidsgivere,
    ytelsesperioder,
    ytelsesperioderLoading,
    ytelsesperioderErrorType,
    ytelsesperioderErrorMessage,
    ytelsesammendrag,
    setYtelsesammendrag
  } = useAppStore();
  const [arbeidsgiverId, setArbeidsgiverId] = useState<string>('');
  const [arbeidsgiverNavn, setArbeidsgiverNavn] = useState<string>('');
  const [identityNumberInput, setIdentityNumberInput] = useState<string>('');
  const { t } = useTranslation();
  const history: History = useHistory();
  const arbeidstaker = ytelsesperioder[0]?.arbeidsforhold.arbeidstaker;
  const [fraDato, setFraDato] = useState<string | undefined>('2010-01-01');
  const [tilDato, setTilDato] = useState<string | undefined>('2022-01-01');
  const [valgteDatoer, setValgteDatoer] = useState< [Date, Date] | undefined >();
  const Ytelsesperioder = useYtelsesperioder();
  const min = dayjs('1970-01-01').toDate();
  const max = dayjs(new Date()).add(1, 'year').toDate();
  const fnrId = uuid();

  const ytelseSammendrag = useYtelseSammendrag();

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

  const handleBackClick = async () => {
    setYtelsesammendrag([]);
    console.log('ytelsesammendrag', ytelsesammendrag.length);
    await Ytelsesperioder(identityNumberInput.replace(/\D/g, ''), arbeidsgiverId);
  }

  const handleSubmitSearch = async (): Promise<void> => {
    await Ytelsesperioder(identityNumberInput.replace(/\D/g, ''), arbeidsgiverId);
  };

  const handleDatepickerClose = (selectedDates: [Date, Date]): void => {
    setValgteDatoer(selectedDates);
    const fom = dayjs(selectedDates[0]).format('YYYY-MM-DD');
    const tom = dayjs(selectedDates[1]).format('YYYY-MM-DD');
    const periodeError = validatePerioder(fom, tom);
    if(!periodeError) {
      setFraDato(fom);
      setTilDato(tom);
    }
  }

  const datepickerId = uuid();

  useEffect( () => {
    const hentYtelsesdata = async () => {
      await ytelseSammendrag(arbeidsgiverId, fraDato, tilDato);
    }
    if(arbeidsgiverId) {
      hentYtelsesdata();
    }
  },[arbeidsgiverId, fraDato, tilDato])

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
      ( <>
          <Row className="ytelsesperiode--lufting">
            <Column sm="12">
              <Innholdstittel id="arbeidsgiver-periode-tabell--person-navn">
                {arbeidsgiverNavn}
              </Innholdstittel>
            </Column>
          </Row>
          <Row className="ytelsesperiode--lufting">
            <Column sm="12">
              <Lenke href="">&lt;&lt; {t(Keys.ALL_REFUNDS)}</Lenke>
            </Column>
          </Row>
        </>)}
        {ytelsesperioder.length > 0 && (
          <Row className="ytelsesperiode--lufting">
            <Column sm="12">
              <button className="lenke arbeidsgiver-periode-linkbutton" onClick={handleBackClick}>&lt;&lt; {t(Keys.BACK)}</button>
            </Column>
          </Row>)
        }
      { ytelsesperioder.length > 0}
        <Row className="ytelsesperiode--lufting">
          {
            arbeidstaker ?
              <>
                <Column sm="7">
                  <div className="arbeidsgiver-periode-header">
                    <div>
                      <div>
                        {t(Keys.IDENTITY_NUMBER)}: {identityNumberSeparation(arbeidstaker.identitetsnummer)}
                      </div>
                    </div>
                    <div>
                      <div>
                        <Innholdstittel id="arbeidsgiver-periode-tabell--person-navn">
                          {arbeidstaker.fornavn} {arbeidstaker.etternavn}
                        </Innholdstittel>
                      </div>
                    </div>
                  </div>
                  <div className="arbeidsgiver-periode-header arbeidsgiver-periode-teller">
                    <div>{t(Keys.REFUNDABLE_DAYS_MAX)}</div>
                    <Innholdstittel id="arbeidsgiver-periode-tabell--max-dager">2</Innholdstittel>
                  </div>
                </Column>
                <Column sm="5" className="ytelsesperiode--column-right-allign arbeidsgiver-periode-header">
                  <div>
                    <div className="arbeidsgiver-periode-search-label">
                      <label htmlFor={fnrId}>
                        {t(Keys.FIND_OTHER_EMPLOYEE)}
                      </label>
                    </div>
                    <div>
                      <FnrInput
                        bredde="M"
                        value={identityNumberInput}
                        placeholder={t(Keys.IDENTITY_NUMBER_EXT)}
                        onChange={e => setIdentityNumberInput(e.target.value)}
                        onBlur={e => setIdentityNumberInput(e.target.value)}
                        onValidate={() => true}
                        // feil={feilmeldingstekst}
                        id={fnrId}
                        className="arbeidsgiver-periode-fnr-input"
                        />
                      <Søkeknapp
                        disabled={identityNumberInput.length < 11 || ytelsesperioderLoading }
                        className="arbeidsgiver-periode-tabell--søke-knapp"
                        onClick={handleSubmitSearch}
                        >
                        <span>{t(Keys.SEARCH)}</span>
                      </Søkeknapp>
                    </div>
                  </div>

                </Column>
              </>
              :
              <>
                <Column sm="12"/>
                <Column sm="12"/>
              </>
          }
        </Row>
        {
              ytelsesperioder.length === 0 && !ytelsesperioderLoading &&
        <Row className="ytelsesperiode--lufting">
          <Column sm="6" className="ytelsesperiode-datovelger">
              <label>
                <div className="ytelsesperiode-datovelger--overskrift">
                  {t(Keys.PERIOD)}:
                </div>
                <Flatpickr
                  id={datepickerId}
                  placeholder='dd.mm.yyyy til dd.mm.yyyy'
                  className={'skjemaelement__input periode'}
                  value={valgteDatoer}
                  options={{
                    minDate: min,
                    maxDate: max,
                    mode: 'range',
                    enableTime: false,
                    dateFormat: 'd.m.Y',
                    altInput: true,
                    altFormat: 'd.m.Y',
                    locale: Norwegian,
                    allowInput: true,
                    clickOpens: true,
                    // formatDate: formatDatoer,
                    onClose: (selectedDates: [ Date, Date ]) => handleDatepickerClose(selectedDates)
                  }}
                  />
              </label>
            </Column>
            <Column sm="6"  className="ytelsesperiode--column-right-allign">
              <div>
                <div className="arbeidsgiver-periode-search-label">
                  <label htmlFor={fnrId}>
                    {t(Keys.FIND_OTHER_EMPLOYEE)}
                  </label>
                </div>
                <div>
                  <FnrInput
                    bredde="M"
                    value={identityNumberInput}
                    placeholder={t(Keys.IDENTITY_NUMBER_EXT)}
                    onChange={e => setIdentityNumberInput(e.target.value)}
                    onBlur={e => setIdentityNumberInput(e.target.value)}
                    onValidate={() => true}
                    // feil={feilmeldingstekst}
                    id={fnrId}
                    className="arbeidsgiver-periode-fnr-input"
                    />
                  <Søkeknapp
                      disabled={identityNumberInput.length < 11 || ytelsesperioderLoading }
                      className="ytelsesperiode--søke-knapp"
                      onClick={handleSubmitSearch}
                    >
                    <span>{t(Keys.SEARCH)}</span>
                  </Søkeknapp>
                </div>
              </div>
            </Column>
        </Row>
        }
        <Row>
          <Column sm="12">
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
              <YtelseSammendragTable ytelseSammendrag={ytelsesammendrag} onNameClick={handleNameClick}/>
            }
          </Column>
        </Row>
      </Container>
    </main>
  );
};

export default ArbeidsgiverPeriodeTabell;
