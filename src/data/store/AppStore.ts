import constate from 'constate';
import { useState } from 'react';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { Ytelsesperiode } from '../../store/types/helseSpionTypes';


export const [ AppStoreProvider, useAppStore ] = constate(() => {
	const [ arbeidsgivere, setArbeidsgivere ] = useState<Organisasjon[]>([]);
	const [ arbeidsgivereLoading, setArbeidsgivereLoading ] = useState<boolean>(false);
	const [ ytelsesperioder, setYtelsesperioder ] = useState<Ytelsesperiode[]>([]);
	const [ ytelsesperioderLoading, setYtelsesperioderLoading ] = useState<boolean>(false);
	const [ ytelsesperioderErrorType, setYtelsesperioderErrorType ] = useState<string>();
	const [ ytelsesperioderErrorMessage, setYtelsesperioderErrorMessage ] = useState<string>();
	return {
		arbeidsgivere, setArbeidsgivere,
		arbeidsgivereLoading, setArbeidsgivereLoading,
		ytelsesperioder, setYtelsesperioder,
		ytelsesperioderLoading, setYtelsesperioderLoading,
		ytelsesperioderErrorType, setYtelsesperioderErrorType,
		ytelsesperioderErrorMessage, setYtelsesperioderErrorMessage,
	};
});
