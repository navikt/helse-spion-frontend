import { YtelseSammendrag } from './helseSpionTypes';

export const sortYtelseSammendrag = (
	ytelseSammendrag: YtelseSammendrag[],
	sortColumn: number,
	sortDescending: boolean,
): YtelseSammendrag[] =>
	ytelseSammendrag.sort((a: YtelseSammendrag, b: YtelseSammendrag) => {
		let sort: number = 0;
		switch (sortColumn) {
			case 0:
        sort = (b.navn ?? '').localeCompare(a.navn ?? '');
        break;
      case 1:
        sort = (b.identitetsnummer ?? '').localeCompare(a.identitetsnummer ?? '');
        break;
      case 2:
        sort = (b.antall_refusjoner ?? -1) - (a.antall_refusjoner ?? 0);
        break;
			case 3:
				sort = (b.merknad ?? '').localeCompare(a.merknad ?? '');
        break;
      case 4:
        sort = (b.max_refusjon_dager ?? -1) - (a.max_refusjon_dager ?? 0);
        break;
			case 5:
				sort = (b.refusjonsbeløp ?? -1) - (a.refusjonsbeløp ?? 0);
				break;
			default: break;
		}
		return sortDescending ? sort : -sort;
	});

export default sortYtelseSammendrag;
