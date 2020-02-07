import { Status } from "../store/types/helseSpionTypes";

export const getClassnameFromStatus = (status: Status): string => {
	switch (status) {
		case Status.UNNER_BEHANDLING: return 'under-behandling';
		case Status.AVSLÅTT: return 'avslått';
		case Status.INNVILGET: return 'innvilget';
		default: return '';
	}
};
