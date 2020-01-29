import { Ytelsesperiode } from "../store/types/helseSpionTypes";

export const totalRefundInYtelsesperioder = (ytelsesperioder: Ytelsesperiode[]): number => {
	let totalRefund = 0;
	ytelsesperioder.map((ytelsesperiode) => totalRefund += ytelsesperiode.refusjonsbeløp);
	return totalRefund;
};
