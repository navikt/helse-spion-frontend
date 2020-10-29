import constate from 'constate';
import { useState } from 'react';
import { Ytelsesperiode } from '../../util/helseSpionTypes';

export const [ AppStoreProvider, useAppStore ] = constate(() => {
	const [ arbeidsgivereLoading, setArbeidsgivereLoading ] = useState<boolean>(false);
  const [ ytelsesperioder, setYtelsesperioder ] = useState<Ytelsesperiode[]>([]);
	const [ ytelsesperioderLoading, setYtelsesperioderLoading ] = useState<boolean>(false);
	const [ ytelsesperioderErrorType, setYtelsesperioderErrorType ] = useState<string>();
	const [ ytelsesperioderErrorMessage, setYtelsesperioderErrorMessage ] = useState<string>();
  const [fraDato, setFraDato] = useState<string>('2010-01-01');
  const [tilDato, setTilDato] = useState<string>('2022-01-01');
	return {
		arbeidsgivereLoading, setArbeidsgivereLoading,
    ytelsesperioder, setYtelsesperioder,
		ytelsesperioderLoading, setYtelsesperioderLoading,
		ytelsesperioderErrorType, setYtelsesperioderErrorType,
    ytelsesperioderErrorMessage, setYtelsesperioderErrorMessage,
    fraDato, setFraDato,
    tilDato, setTilDato
	};
});
