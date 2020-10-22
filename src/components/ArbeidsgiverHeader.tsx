import React, { useState, useEffect } from 'react';
import { Row, Column } from 'nav-frontend-grid';
import { Innholdstittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { useTranslation } from 'react-i18next';
import { Keys } from '../locales/keys';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import { FnrInput } from 'nav-frontend-skjema';
import { v4 as uuid } from 'uuid';
import Flatpickr from 'react-flatpickr';
import dayjs from 'dayjs';
import validatePerioder from '../util/validatePeriode';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import { useAppStore } from '../data/store/AppStore';
import useYtelsesperioder from '../data/Ytelsesperioder';
import useYtelseSammendrag from '../data/useYtelseSammendrag';



interface ArbeidsgiverHeaderInterface {
  arbeidsgiverNavn: string,
  arbeidsgiverId: string,
}

const ArbeidsgiverHeader = ({ arbeidsgiverNavn, arbeidsgiverId }: ArbeidsgiverHeaderInterface) => {
  const { t } = useTranslation();
  const fnrId = uuid();
  const min = dayjs('1970-01-01').toDate();
  const max = dayjs(new Date()).add(1, 'year').toDate();
  const datepickerId = uuid();
  const [valgteDatoer, setValgteDatoer] = useState< [Date, Date] | undefined >();
  const [identityNumberInput, setIdentityNumberInput] = useState<string>('');
  const {
    ytelsesperioderLoading,
    fraDato,
    setFraDato,
    tilDato,
    setTilDato,
  } = useAppStore();
  const ytelseSammendrag = useYtelseSammendrag();

  useEffect( () => {
    const hentYtelsesdata = async () => {
      await ytelseSammendrag(arbeidsgiverId, fraDato, tilDato);
    }
    if(arbeidsgiverId) {
      hentYtelsesdata();
    }
  },[arbeidsgiverId, fraDato, tilDato])


  const Ytelsesperioder = useYtelsesperioder();

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

  const handleSubmitSearch = async (): Promise<void> => {
    console.log("**********************************");
    await Ytelsesperioder(identityNumberInput.replace(/\D/g, ''), arbeidsgiverId);
  };

  return (
    <>
      <Row className="arbeidsgiver-periode--lufting">
        <Column sm="12">
          <Innholdstittel id="arbeidsgiver-periode-tabell--person-navn">
            {arbeidsgiverNavn}
          </Innholdstittel>
        </Column>
      </Row>
      <Row className="arbeidsgiver-periode--lufting">
        <Column sm="12">
          <Lenke className="arbeidsgiver-periode--lufting" href="">&lt;&lt; {t(Keys.ALL_REFUNDS)}</Lenke>
        </Column>
      </Row>
      <Row className="arbeidsgiver-periode--lufting">
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
    </>
  )
}

export default ArbeidsgiverHeader;
