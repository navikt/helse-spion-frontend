import {Status, Ytelsesperiode} from "../store/types/helseSpionTypes";

export const sortYtelsesperioder = (
	ytelsesperioder: Ytelsesperiode[],
	sortColumn: number,
	sortDescending: boolean,
): Ytelsesperiode[] =>
	ytelsesperioder.sort((a, b) => {
		let sort: number = 0;
		switch (sortColumn) {
			case 0:
				sort = b.periode.fom.getTime() - a.periode.fom.getTime();
				break;
			case 1:
				sort = getStatusSortValue(b.status) - getStatusSortValue(a.status);
				break;
			case 2:
				sort = b.ytelse.localeCompare(a.ytelse);
				break;
			case 3:
				sort = (b.grad ?? -1) - (a.grad ?? 0);
				break;
			case 4:
				sort = (b.merknad ?? '').localeCompare(a.merknad ?? '');
				break;
			case 5:
				sort = b.refusjonsbeløp - a.refusjonsbeløp;
				break;
			default: break;
		}
		return sortDescending ? sort : -sort;
	});

const getStatusSortValue = (status: Status): number => {
	switch (status) {
		case Status.DECLINED: return 0;
		case Status.APPROVED: return 1;
		case Status.PENDING: return 2;
	}
};
