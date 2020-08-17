import constate from 'constate';
import { useState } from 'react';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { Ytelsesperiode } from '../../util/helseSpionTypes';
import { YtelseSammendrag } from '../../util/helseSpionTypes';


export const [ AppStoreProvider, useAppStore ] = constate(() => {
	const [ arbeidsgivere, setArbeidsgivere ] = useState<Organisasjon[]>([]);
	const [ arbeidsgivereLoading, setArbeidsgivereLoading ] = useState<boolean>(false);
  const [ ytelsesperioder, setYtelsesperioder ] = useState<Ytelsesperiode[]>([]);
	const [ ytelsesperioderLoading, setYtelsesperioderLoading ] = useState<boolean>(false);
	const [ ytelsesperioderErrorType, setYtelsesperioderErrorType ] = useState<string>();
	const [ ytelsesperioderErrorMessage, setYtelsesperioderErrorMessage ] = useState<string>();
  const [ ytelsesammendrag, setYtelsesammendrag ] = useState<YtelseSammendrag[]>([]);
	return {
		arbeidsgivere, setArbeidsgivere,
		arbeidsgivereLoading, setArbeidsgivereLoading,
    ytelsesperioder, setYtelsesperioder,
    ytelsesammendrag, setYtelsesammendrag,
		ytelsesperioderLoading, setYtelsesperioderLoading,
		ytelsesperioderErrorType, setYtelsesperioderErrorType,
		ytelsesperioderErrorMessage, setYtelsesperioderErrorMessage,
	};
});
