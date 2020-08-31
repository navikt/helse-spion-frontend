import React, { useState } from 'react';
import 'nav-frontend-tabell-style';
import 'nav-frontend-skjema-style';
import './ArbeidsgiverPeriodeTabell.css';
import 'nav-frontend-alertstriper-style';
import 'react-datepicker/dist/react-datepicker.css';
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
import { Input } from 'nav-frontend-skjema';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import { ErrorType } from '../util/helseSpionTypes';
import AlertStripe from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import YtelsesperiodeTable from './YtelsesperiodeTable';
import useYtelsesperioder from '../data/Ytelsesperioder';

const ArbeidsgiverPeriodeTabell: React.FC = () => {
  const {
    arbeidsgivere,
    ytelsesperioder,
    ytelsesperioderLoading,
    ytelsesperioderErrorType,
    ytelsesperioderErrorMessage,
  } = useAppStore();
  const [arbeidsgiverId, setArbeidsgiverId] = useState<string>('');
  const [identityNumberInput, setIdentityNumberInput] = useState<string>('');
  const { t } = useTranslation();
  const history: History = useHistory();
  const arbeidstaker = ytelsesperioder[0]?.arbeidsforhold.arbeidstaker;
  
  const Ytelsesperioder = useYtelsesperioder();

  function onEnterClick(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (event.key === 'Enter' && identityNumberInput.length == 11) {
      event.preventDefault();
      event.stopPropagation();
      handleSubmitSearch();
    }
  };
  
  
  const handleSubmitSearch = async (): Promise<void> => {
    const perioder = await Ytelsesperioder(identityNumberInput, arbeidsgiverId);
  };
  
  return (
    <div className="arbeidsgiver-periode-tabell">
      <Bedriftsmeny
        history={history}
        onOrganisasjonChange={(org: Organisasjon) => setArbeidsgiverId(org.OrganizationNumber)}
        sidetittel={t(Keys.MY_PAGE)}
        organisasjoner={arbeidsgivere}
      />       <div className="container">
      <Lenke href="">&lt;&lt; {t(Keys.ALL_REFUNDS)}</Lenke>
      <div className="arbeidsgiver-periode-tabell--header">
        <div className="arbeidsgiver-periode-tabell--søke-gruppe">
          {
            arbeidstaker ?
              <>
                <div className="container-sm">
                  <div className="arbeidsgiver-periode-tabell--person-nummer">
                    {t(Keys.IDENTITY_NUMBER)}: {identityNumberSeparation(arbeidstaker.identitetsnummer)}
                  </div>
                  <Innholdstittel id="arbeidsgiver-periode-tabell--person-navn">
                    {arbeidstaker.fornavn} {arbeidstaker.etternavn}
                  </Innholdstittel>
                </div>
                <div className="container-sm">
                  <div>Max refunderbare dager</div>
                  <Innholdstittel id="arbeidsgiver-periode-tabell--max-dager">2</Innholdstittel>
                </div>
              </>
              :
              <>
                <div/>
                <div/>
              </>
          }
          <div className="container-sm arbeidsgiver-periode-tabell--person-gruppe">
            <div>
              <Input
                className="arbeidsgiver-periode-tabell--søke-input container-sm"
                label={t(Keys.FIND_OTHER_EMPLOYEE)}
                placeholder={t(Keys.IDENTITY_NUMBER_EXT)}
                onChange={e => setIdentityNumberInput((e.target.value))}
                value={identityNumberInput}
                onKeyDown={onEnterClick}
                maxLength={11}
              />
            </div>
            <div>
              <span className="skjemaelement__label">&nbsp;</span>
              <Søkeknapp
                disabled={identityNumberInput.length < 11 || ytelsesperioderLoading }
                className="arbeidsgiver-periode-tabell--søke-knapp"
                onClick={handleSubmitSearch}
              >
                <span>{t(Keys.SEARCH)}</span>
              </Søkeknapp>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArbeidsgiverPeriodeTabell;
