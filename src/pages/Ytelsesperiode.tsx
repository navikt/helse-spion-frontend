import React, { useState } from 'react';
import { Container, Row, Column } from 'nav-frontend-grid';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import { Søkeknapp as SøkeKnapp } from 'nav-frontend-ikonknapper';
import { identityNumberSeparation } from '../util/identityNumberSeparation';
import { Keys } from '../locales/keys';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { v4 as uuid } from 'uuid';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import dayjs from 'dayjs';
import { FnrInput } from 'nav-frontend-skjema';


import validatePerioder from '../util/validatePeriode';

import './Ytelsesperiode.less';
import Lenke from 'nav-frontend-lenker';
import YtelsesperiodeTable from '../components/YtelsesperiodeTable';


const Ytelsesperiode = () => {
  const { t } = useTranslation();
  const [identityNumberInput, setIdentityNumberInput] = useState<string>('');
  const [dataLoading, setDataLoading ] = useState<boolean>(false);
  const [arbeidsgiverId, setArbeidsgiverId] = useState<string>('');
  const history = useHistory();
  const [fraDato, setFraDato] = useState<string | undefined>('');
  const [tilDato, setTilDato] = useState<string | undefined>('');
  const [valgteDatoer, setValgteDatoer] = useState< [Date, Date] | undefined >();

  const arbeidsgivere: Organisasjon[] = [ {
    Name : "Skip Stone AS",
    Type : "Enterprise",
    ParentOrganizationNumber : "",
    OrganizationForm : "AS",
    OrganizationNumber : "910098898",
    Status : ""
  }, {
    Name : "Skip Stone Øst",
    Type : "Business",
    ParentOrganizationNumber : "910098898",
    OrganizationForm : "BEDR",
    OrganizationNumber : "917404437",
    Status : ""
  } ]// Todo: MockData

  const onEnterClick = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      submitSearch();
    }
  };

  const handleDatepickerClose = (selectedDates: [Date, Date]): void => {
    console.log('selectedDates', selectedDates);
    setValgteDatoer(selectedDates);
    const fom = dayjs(selectedDates[0]).format('YYYY-MM-DD');
    const tom = dayjs(selectedDates[1]).format('YYYY-MM-DD');
    const periodeError = validatePerioder(fom, tom);
    if(!periodeError) {
      setFraDato(fom);
      setTilDato(tom);
    }
  }

  const submitSearch = (): void => {

  }

  let min = dayjs('1970-01-01').toDate();
  let max = dayjs(new Date()).add(1, 'year').toDate();
  const datepickerId = uuid();

  const ytelsesperioder = [];

  return (
    <>
      <Bedriftsmeny
          history={history}
          onOrganisasjonChange={(org: Organisasjon) => setArbeidsgiverId(org.OrganizationNumber)}
          sidetittel={t(Keys.MY_PAGE)}
          organisasjoner={arbeidsgivere}
        />
      <Container>
        <Row className="ytelsesperiode--lufting">
          <Column sm="12">
            <Lenke href="">&lt;&lt; {t(Keys.ALL_REFUNDS)}</Lenke>
          </Column>
        </Row>
        <Row className="ytelsesperiode--lufting">
          <Column sm="12">
            <Innholdstittel>Innholdstittel</Innholdstittel>
          </Column>
        </Row>
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
          <Column sm="6">
            <div className="ytelsesperiode--wrapper">
              <FnrInput
                label={
                  <div style={{ display: 'flex' }}>
                    {t(Keys.IDENTITY_NUMBER)}
                  </div>}
                bredde="M"
                value={identityNumberSeparation(identityNumberInput)}
                placeholder="11 siffer"
                onChange={e => setIdentityNumberInput(e.target.value)}
                onBlur={e => setIdentityNumberInput(e.target.value)}
                onValidate={() => true}
                // feil={feilmeldingstekst}
              />
              <SøkeKnapp
                disabled={identityNumberInput.length < 11 || dataLoading }
                className="ytelsesperiode--søke-knapp"
                onClick={submitSearch}
              >
                <span>{t(Keys.SEARCH)}</span>
              </SøkeKnapp>
            </div>
          </Column>
        </Row>
        <Row>
          <Column sm="12">
            <YtelsesperiodeTable ytelsesperioder={ytelsesperioder}/>
          </Column>
        </Row>
      </Container>
    </>
  );
}

export default Ytelsesperiode;
