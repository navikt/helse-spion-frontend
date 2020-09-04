import constate from 'constate';
import { useState } from 'react';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { Ytelsesperiode, YtelseSammendrag } from '../../util/helseSpionTypes';


export const [ AppStoreProvider, useAppStore ] = constate(() => {
	const [ arbeidsgivere, setArbeidsgivere ] = useState<Organisasjon[]>([]);
	const [ arbeidsgivereLoading, setArbeidsgivereLoading ] = useState<boolean>(false);
  const [ ytelsesperioder, setYtelsesperioder ] = useState<Ytelsesperiode[]>([]);
	const [ ytelsesperioderLoading, setYtelsesperioderLoading ] = useState<boolean>(false);
	const [ ytelsesperioderErrorType, setYtelsesperioderErrorType ] = useState<string>();
	const [ ytelsesperioderErrorMessage, setYtelsesperioderErrorMessage ] = useState<string>();
  const [ ytelsesammendrag, setYtelsesammendrag ] = useState<YtelseSammendrag[]>([]);
  const [fraDato, setFraDato] = useState<string>('2010-01-01');
  const [tilDato, setTilDato] = useState<string>('2022-01-01');
	return {
		arbeidsgivere, setArbeidsgivere,
		arbeidsgivereLoading, setArbeidsgivereLoading,
    ytelsesperioder, setYtelsesperioder,
    ytelsesammendrag, setYtelsesammendrag,
		ytelsesperioderLoading, setYtelsesperioderLoading,
		ytelsesperioderErrorType, setYtelsesperioderErrorType,
    ytelsesperioderErrorMessage, setYtelsesperioderErrorMessage,
    fraDato, setFraDato,
    tilDato, setTilDato
	};
});
