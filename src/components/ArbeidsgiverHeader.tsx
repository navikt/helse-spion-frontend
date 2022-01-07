import React, { useState, useEffect } from 'react';
import { Row, Column } from 'nav-frontend-grid';
import { Innholdstittel } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';
import { Keys } from '../locales/keys';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import { FnrInput } from 'nav-frontend-skjema';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import validateDato from '../util/validateDato';
import { useAppStore } from '../data/store/AppStore';
import useYtelsesperioder from '../data/useYtelsesperioder';
import useYtelseSammendrag from '../data/useYtelseSammendrag';
import './Flatpickr.scss';
import './ArbeidsgiverHeader.scss';
import { DatoVelger } from '@navikt/helse-arbeidsgiver-felles-frontend';

interface ArbeidsgiverHeaderInterface {
  arbeidsgiverNavn: string;
  arbeidsgiverId: string;
}

const ArbeidsgiverHeader = ({
  arbeidsgiverNavn,
  arbeidsgiverId
}: ArbeidsgiverHeaderInterface) => {
  const { t } = useTranslation();
  const fnrId = uuid();
  const min = dayjs('1970-01-01').toDate();
  const max = dayjs(new Date()).add(1, 'year').toDate();
  const [identityNumberInput, setIdentityNumberInput] = useState<string>('');
  const [fraError, setFraError] = useState<string>('');
  const [tilError, setTilError] = useState<string>('');
  const { ytelsesperioderLoading, fraDato, setFraDato, tilDato, setTilDato } =
    useAppStore();
  const ytelseSammendrag = useYtelseSammendrag();

  useEffect(() => {
    const hentYtelsesdata = async () => {
      await ytelseSammendrag(arbeidsgiverId, fraDato, tilDato);
    };
    if (arbeidsgiverId) {
      hentYtelsesdata();
    }
  }, [arbeidsgiverId, fraDato, tilDato]); // eslint-disable-line react-hooks/exhaustive-deps

  const Ytelsesperioder = useYtelsesperioder();

  const handleDatepickerFomClose = (selectedDate: Date): void => {
    const fom = dayjs(selectedDate).format('YYYY-MM-DD');
    const datoError = validateDato(fom);

    if (!datoError) {
      setFraDato(fom);
    } else {
      setFraError(datoError);
    }
  };

  const handleDatepickerTomClose = (selectedDate: Date): void => {
    const tom = dayjs(selectedDate).format('YYYY-MM-DD');
    const datoError = validateDato(tom);

    if (!datoError) {
      setTilDato(tom);
    } else {
      setTilError(datoError);
    }
  };

  const handleSubmitSearch = async (): Promise<void> => {
    await Ytelsesperioder(
      identityNumberInput.replace(/\D/g, ''),
      arbeidsgiverId
    );
  };

  return (
    <>
      <Row className='arbeidsgiver-periode--lufting'>
        <Column sm='12'>
          <Innholdstittel id='arbeidsgiver-periode-tabell--person-navn'>
            {arbeidsgiverNavn}
          </Innholdstittel>
        </Column>
      </Row>
      <Row className='arbeidsgiver-periode--lufting'>
        <Column sm='6' className='ytelsesperiode-datovelger'>
          <label>
            <div className='ytelsesperiode-datovelger--overskrift'>
              {t(Keys.PERIOD)}:
            </div>
            <div className='arbeidsgiver-header-datovelgere'>
              <DatoVelger
                id='fom_datovelger'
                dato={dayjs(fraDato).toDate()}
                feilmelding={fraError}
                placeholder='dd.mm.yyyy'
                minDate={min}
                maxDate={max}
                className='datovelger datovelger-fra'
                onChange={(dato) => handleDatepickerFomClose(dato)}
              />
              -
              <DatoVelger
                id='tom_datovelger'
                dato={dayjs(tilDato).toDate()}
                feilmelding={tilError}
                placeholder='dd.mm.yyyy'
                minDate={min}
                maxDate={max}
                className='datovelger datovelger-til'
                onChange={(dato) => handleDatepickerTomClose(dato)}
              />
            </div>
          </label>
        </Column>
        <Column sm='6' className='ytelsesperiode--column-right-allign'>
          <div>
            <div className='arbeidsgiver-periode-search-header-label'>
              <label htmlFor={fnrId}>{t(Keys.FIND_OTHER_EMPLOYEE)}</label>
            </div>
            <div>
              <FnrInput
                bredde='M'
                value={identityNumberInput}
                placeholder={t(Keys.IDENTITY_NUMBER_EXT)}
                onChange={(e) => setIdentityNumberInput(e.target.value)}
                onBlur={(e) => setIdentityNumberInput(e.target.value)}
                onValidate={() => true}
                id={fnrId}
                className='arbeidsgiver-periode-fnr-input'
              />
              <Søkeknapp
                disabled={
                  identityNumberInput.length < 11 || ytelsesperioderLoading
                }
                className='ytelsesperiode--søke-knapp'
                onClick={handleSubmitSearch}
              >
                <span>{t(Keys.SEARCH)}</span>
              </Søkeknapp>
            </div>
          </div>
        </Column>
      </Row>
    </>
  );
};

export default ArbeidsgiverHeader;
