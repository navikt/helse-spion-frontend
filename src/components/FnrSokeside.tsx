import React, { useState } from 'react';
import { Row, Column } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Innholdstittel } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';
import { Keys } from '../locales/keys';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import { FnrInput } from 'nav-frontend-skjema';
import useYtelsesperioder from '../data/Ytelsesperioder';
import { useAppStore } from '../data/store/AppStore';
import { v4 as uuid } from 'uuid';
import './FnrSokeside.scss';


interface FnrSokesideInterface {
  arbeidsgiverId: string,
}

const FnrSokeside = ({ arbeidsgiverId }: FnrSokesideInterface) => {
  const { t } = useTranslation();
  const [identityNumberInput, setIdentityNumberInput] = useState<string>('');
  const Ytelsesperioder = useYtelsesperioder();
  const fnrId = uuid();

  const {
    ytelsesperioderLoading,
  } = useAppStore();

  const handleSubmitSearch = async (): Promise<void> => {
    await Ytelsesperioder(identityNumberInput.replace(/\D/g, ''), arbeidsgiverId);
  };

  return (
    <Row>
      <Column sm="12">
        <Panel border className="fnr-sokeside-panel">
          <Innholdstittel>{t(Keys.EMPLOYEE_SEARCH)}</Innholdstittel>
          <label htmlFor={fnrId} className="fnr-sokeside-label">
            {t(Keys.IDENTITY_NUMBER_EXT)}
          </label>
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
              className="arbeidsgiver-periode-fnr-input fnr-sokeside-fnrinput"
              />
            <Søkeknapp
                disabled={identityNumberInput.length < 11 || ytelsesperioderLoading }
                className="ytelsesperiode--søke-knapp"
                onClick={handleSubmitSearch}
              >
              <span>{t(Keys.SEARCH)}</span>
            </Søkeknapp>
          </div>
          <div className="fnr-sokeside-infobox">
            <span className="fnr-sokeside-infointro">{t(Keys.FOR_INFO)}:</span> {t(Keys.INFO_TEXT)}
          </div>
        </Panel>
      </Column>
    </Row>
  )
}

export default FnrSokeside;
