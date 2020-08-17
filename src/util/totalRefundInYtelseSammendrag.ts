import { YtelseSammendrag } from './helseSpionTypes';

export const totalRefundInYtelseSammendrag = (ytelsesperioder: YtelseSammendrag[]): number =>
	ytelsesperioder.reduce((total: number, periode: YtelseSammendrag) => total + (periode.refusjonsbeløp ?? 0), 0)

export default totalRefundInYtelseSammendrag;
