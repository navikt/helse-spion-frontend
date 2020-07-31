import { Ytelsesperiode } from './helseSpionTypes';

export const totalRefundInYtelsesperioder = (ytelsesperioder: Ytelsesperiode[]): number =>
	ytelsesperioder.reduce((total: number, periode: Ytelsesperiode) => total + (periode.refusjonsbeløp ?? 0), 0)
