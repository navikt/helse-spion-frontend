import React, { useState } from 'react';
import { Row, Column } from 'nav-frontend-grid';
import { Innholdstittel } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';
import { Keys } from '../locales/keys';
import { v4 as uuid } from 'uuid';
import { FnrInput } from 'nav-frontend-skjema';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import useYtelsesperioder from '../data/Ytelsesperioder';
import { useAppStore } from '../data/store/AppStore';
import identityNumberSeparation from '../util/identityNumberSeparation';

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
          <button
            className='lenke arbeidsgiver-periode-linkbutton'
            onClick={handleBackClick}
          >
            &lt;&lt; {t(Keys.BACK)}
          </button>
        </Column>
      </Row>
      <Row className='arbeidsgiver-periode--lufting'>
        <Column sm='7'>
          <div className='arbeidsgiver-periode-header'>
            <div>
              <div>
                {t(Keys.IDENTITY_NUMBER)}:{' '}
                {identityNumberSeparation(arbeidstaker.identitetsnummer)}
              </div>
            </div>
            <div>
              <div>
                <Innholdstittel id='arbeidsgiver-periode-tabell--person-navn'>
                  {arbeidstaker.fornavn} {arbeidstaker.etternavn}
                </Innholdstittel>
              </div>
            </div>
          </div>
          <div className='arbeidsgiver-periode-header arbeidsgiver-periode-teller'>
            <div>{t(Keys.REFUNDABLE_DAYS_MAX)}</div>
            {ytelsesperioder && ytelsesperioder.length > 0 ? (
              <Innholdstittel id='arbeidsgiver-periode-tabell--max-dager'>
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
                onValidate={() => true}
                // feil={feilmeldingstekst}
                id={fnrId}
                className='arbeidsgiver-periode-fnr-input'
              />
              <Søkeknapp
                disabled={
                  identityNumberInput.length < 11 || ytelsesperioderLoading
                }
                className='arbeidsgiver-periode-tabell--søke-knapp'
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

export default ArbeidstakerDetaljHeader;
