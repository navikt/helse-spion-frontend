import { filterYtelsesperioder } from "./filterYtelsesperioder";
import { Status, Ytelsesperiode } from "../store/types/helseSpionTypes";

describe('filterYtelsesperioder', () => {
	it('returns empty array when given empty array input', () => {
		const input = filterYtelsesperioder([]);
		expect(input).toEqual([]);
	});
	
	it('returns same data input when no filter dates are given', () => {
		const input = filterYtelsesperioder(data);
		expect(input).toEqual(data);
	});
	
	it('filters based on from date', () => {
		const input = filterYtelsesperioder(
			data,
			new Date(2011, 1, 1),
		);
		expect(input).toEqual([ytelsesperiode2, ytelsesperiode3]);
	});
	
	it('filters based on to date', () => {
		const input = filterYtelsesperioder(
			data,
			undefined,
			new Date(2018, 1, 1),
		);
		expect(input).toEqual([ytelsesperiode1, ytelsesperiode2]);
	});
	
	it('filters based on both dates together', () => {
		const input = filterYtelsesperioder(
			data,
			new Date(2011, 1, 1),
			new Date(2018, 1, 1),
		);
		expect(input).toEqual([ytelsesperiode2]);
	});
});

const ytelsesperiode1: Ytelsesperiode = 	{
	periode: {
		fom: new Date(2010,1,1),
		tom: new Date(2014,1,1),
	},
	refusjonsbeløp: 10,
	status: Status.APPROVED,
	ytelse: 'SP'
};

const ytelsesperiode2: Ytelsesperiode = {
	periode: {
		fom: new Date(2012,1,1),
		tom: new Date(2016,1,1),
	},
	refusjonsbeløp: 10,
	status: Status.APPROVED,
	ytelse: 'SP'
};

const ytelsesperiode3: Ytelsesperiode = {
	periode: {
		fom: new Date(2016,1,1),
		tom: new Date(2020,1,1),
	},
	refusjonsbeløp: 10,
	status: Status.APPROVED,
	ytelse: 'SP'
};

const data: Ytelsesperiode[] = [
	ytelsesperiode1,
	ytelsesperiode2,
	ytelsesperiode3,
];
