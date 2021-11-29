import React, { useState } from 'react';
import { Row, Column } from 'nav-frontend-grid';
import { Innholdstittel } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';
import { Keys } from '../locales/keys';
import { v4 as uuid } from 'uuid';
import { FnrInput } from 'nav-frontend-skjema';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import useYtelsesperioder from '../data/useYtelsesperioder';
import { useAppStore } from '../data/store/AppStore';
import identityNumberSeparation from '../util/identityNumberSeparation';
import Lenke from 'nav-frontend-lenker';
import './ArbeidstakerDetaljHeader.scss';

export interface ArbeidstakerInterface {
  identitetsnummer: string;
  fornavn: string;
  etternavn: string;
}

interface ArbeidstakerDetaljHeaderInterface {
  arbeidstaker: ArbeidstakerInterface;
  arbeidsgiverId: string;
}

const ArbeidstakerDetaljHeader: React.FC<ArbeidstakerDetaljHeaderInterface> = ({
  arbeidstaker,
  arbeidsgiverId
}: ArbeidstakerDetaljHeaderInterface) => {
  const { t } = useTranslation();
  const fnrId: string = uuid();
  const fetchYtelsesperioder = useYtelsesperioder();
  const [identityNumberInput, setIdentityNumberInput] = useState<string>('');
  const { ytelsesperioderLoading, ytelsesperioder, setYtelsesperioder } =
    useAppStore();
  const [isValidFnr, setIsValidFnr] = useState<boolean>(false);

  const validationHandler = (isValid: boolean) => {
    setIsValidFnr(isValid);
  };

  const handleSubmitSearch = async (): Promise<void> => {
    await fetchYtelsesperioder(
      identityNumberInput.replace(/\D/g, ''),
      arbeidsgiverId
    );
  };

  const handleBackClick = async () => {
    setYtelsesperioder([]);
  };

  return (
    <>
      <Row className='arbeidsgiver-periode--lufting'>
        <Column sm='12'>
          <Lenke
            className='lenke arbeidsgiver-periode-linkbutton'
            onClick={handleBackClick}
            href='#'
          >
            &lt;&lt; {t(Keys.BACK)}
          </Lenke>
        </Column>
      </Row>
      <Row className='arbeidsgiver-periode--lufting'>
        <Column sm='7'>
          <div className='arbeidsgiver-periode-header'>
            <div>
              <div className='arbeidstaker-detalj-header-overskrift'>
                {t(Keys.IDENTITY_NUMBER)}:{' '}
                {identityNumberSeparation(arbeidstaker.identitetsnummer)}
              </div>
            </div>
            <div>
              <div>
                <Innholdstittel
                  tag='span'
                  id='arbeidsgiver-periode-tabell--person-navn'
                >
                  {arbeidstaker.fornavn} {arbeidstaker.etternavn}
                </Innholdstittel>
              </div>
            </div>
          </div>
          <div className='arbeidsgiver-periode-header arbeidsgiver-periode-teller'>
            <div className='arbeidstaker-detalj-header-overskrift'>
              {t(Keys.REFUNDABLE_DAYS_MAX)}
            </div>
            {ytelsesperioder && ytelsesperioder.length > 0 ? (
              <Innholdstittel
                tag='span'
                id='arbeidsgiver-periode-tabell--max-dager'
              >
                {
                  ytelsesperioder[ytelsesperioder.length - 1]
                    .gjenståendeSykedager
                }
              </Innholdstittel>
            ) : (
              ''
            )}
          </div>
        </Column>
        <Column
          sm='5'
          className='ytelsesperiode--column-right-allign arbeidsgiver-periode-header'
        >
          <div>
            <div className='arbeidsgiver-periode-search-label'>
              <label htmlFor={fnrId}>{t(Keys.FIND_OTHER_EMPLOYEE)}</label>
            </div>
            <div>
              <FnrInput
                bredde='M'
                value={identityNumberInput}
                placeholder={t(Keys.IDENTITY_NUMBER_EXT)}
                onChange={(e) => setIdentityNumberInput(e.target.value)}
                onBlur={(e) => setIdentityNumberInput(e.target.value)}
                onValidate={validationHandler}
                // feil={feilmeldingstekst}
                id={fnrId}
                className='arbeidsgiver-periode-fnr-input'
              />
              <Søkeknapp
                disabled={!isValidFnr || ytelsesperioderLoading}
                className='arbeidsgiver-periode-tabell--søke-knapp'
                onClick={handleSubmitSearch}
                spinner={ytelsesperioderLoading}
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

export default ArbeidstakerDetaljHeader;
