import {Status, Ytelsesperiode} from "../store/types/helseSpionTypes";

export const mockYtelsesperiode1: Ytelsesperiode = 	{
	periode: {
		fom: new Date(2010,1,1),
		tom: new Date(2014,1,1),
	},
	refusjonsbeløp: 20,
	status: Status.APPROVED,
	ytelse: 'SP',
	grad: 20,
};

export const mockYtelsesperiode2: Ytelsesperiode = {
	periode: {
		fom: new Date(2012,1,1),
		tom: new Date(2016,1,1),
	},
	refusjonsbeløp: 10,
	status: Status.DECLINED,
	ytelse: 'PP',
	grad: 100,
	merknad: 'Fritak AGP'
};

export const mockYtelsesperiode3: Ytelsesperiode = {
	periode: {
		fom: new Date(2016,1,1),
		tom: new Date(2020,1,1),
	},
	refusjonsbeløp: 30,
	status: Status.PENDING,
	ytelse: 'FP',
	grad: 50,
	merknad: 'Mangler inntektsmld.'
};

export const mockYtelsesperioder: Ytelsesperiode[] = [
	mockYtelsesperiode1,
	mockYtelsesperiode2,
	mockYtelsesperiode3,
];
