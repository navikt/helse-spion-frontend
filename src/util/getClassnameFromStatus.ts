import { Status } from "../store/types/helseSpionTypes";

export const getClassnameFromStatus = (status: Status): string => {
	switch (status) {
		case Status.PENDING: return 'under-behandling';
		case Status.DECLINED: return 'avslått';
		case Status.APPROVED: return 'innvilget';
		default: return '';
	}
};
