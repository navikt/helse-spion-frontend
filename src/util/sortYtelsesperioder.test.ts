import { sortYtelsesperioder } from './sortYtelsesperioder';
import { mockYtelsesperiode1, mockYtelsesperiode2, mockYtelsesperiode3, mockYtelsesperiode4, mockYtelsesperioder } from './mockData';

describe('sortYtelsesperioder', () => {
	it('can sort by date ascending', () => {
		const input = sortYtelsesperioder(mockYtelsesperioder, 0, false);
		expect(input).toEqual([mockYtelsesperiode1, mockYtelsesperiode2, mockYtelsesperiode3]);
	});

	it('can sort by date descending', () => {
		const input = sortYtelsesperioder(mockYtelsesperioder, 0, true);
		expect(input).toEqual([mockYtelsesperiode3, mockYtelsesperiode2, mockYtelsesperiode1]);
	});

	it('can sort by status ascending', () => {
		const input = sortYtelsesperioder([...mockYtelsesperioder, mockYtelsesperiode4], 1, false);
		expect(input).toEqual([mockYtelsesperiode2, mockYtelsesperiode1, mockYtelsesperiode3, mockYtelsesperiode4]);
	});

	it('can sort by status descending', () => {
		const input = sortYtelsesperioder([...mockYtelsesperioder, mockYtelsesperiode4], 1, true);
		expect(input).toEqual([mockYtelsesperiode4, mockYtelsesperiode3, mockYtelsesperiode1, mockYtelsesperiode2]);
	});

	it('can sort by ytelse ascending', () => {
		const input = sortYtelsesperioder(mockYtelsesperioder, 2, false);
		expect(input).toEqual([mockYtelsesperiode3, mockYtelsesperiode2, mockYtelsesperiode1]);
	});

	it('can sort by ytelse descending', () => {
		const input = sortYtelsesperioder(mockYtelsesperioder, 2, true);
		expect(input).toEqual([mockYtelsesperiode1, mockYtelsesperiode2, mockYtelsesperiode3]);
	});

	it('can sort by grad ascending', () => {
		const input = sortYtelsesperioder(mockYtelsesperioder, 3, false);
		expect(input).toEqual([mockYtelsesperiode1, mockYtelsesperiode3, mockYtelsesperiode2]);
	});

	it('can sort by grad descending', () => {
		const input = sortYtelsesperioder(mockYtelsesperioder, 3, true);
		expect(input).toEqual([mockYtelsesperiode2, mockYtelsesperiode3, mockYtelsesperiode1]);
	});

	it('can sort by merknad ascending', () => {
		const input = sortYtelsesperioder(mockYtelsesperioder, 4, false);
		expect(input).toEqual(mockYtelsesperioder);
  });

  it('can sort by merknad descending', () => {
		const input = sortYtelsesperioder(mockYtelsesperioder, 4, true);
		expect(input).toEqual([mockYtelsesperiode2, mockYtelsesperiode3, mockYtelsesperiode1]);
  });

  it('can sort by refusjonsbeløp ascending', () => {
		const input = sortYtelsesperioder(mockYtelsesperioder, 5, false);
		expect(input).toEqual(mockYtelsesperioder);
  });

  it('can sort by refusjonsbeløp descending', () => {
		const input = sortYtelsesperioder(mockYtelsesperioder, 5, true);
		expect(input).toEqual([mockYtelsesperiode3, mockYtelsesperiode1, mockYtelsesperiode2]);
	});

  it('ignores invalid sort parameter', () => {
		const input = sortYtelsesperioder(mockYtelsesperioder, 75, false);
		expect(input).toEqual([mockYtelsesperiode3, mockYtelsesperiode1, mockYtelsesperiode2]);
	});
});
