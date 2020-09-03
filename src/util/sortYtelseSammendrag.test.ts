import { sortYtelseSammendrag } from './sortYtelseSammendrag';
import { mockYtelseSammendrag1, mockYtelseSammendrag2, mockYtelseSammendrag3, mockYtelseSammendrag } from './mockData';

describe('sortYtelseSammendrag', () => {
	it('can sort by navn ascending', () => {
		const input = sortYtelseSammendrag(mockYtelseSammendrag, 0, false);
		expect(input).toEqual([mockYtelseSammendrag3, mockYtelseSammendrag1, mockYtelseSammendrag2]);
	});

	it('can sort by navn descending', () => {
		const input = sortYtelseSammendrag(mockYtelseSammendrag, 0, true);
		expect(input).toEqual([mockYtelseSammendrag2, mockYtelseSammendrag1, mockYtelseSammendrag3]);
	});

	it('can sort by identitetsnummer ascending', () => {
		const input = sortYtelseSammendrag(mockYtelseSammendrag, 1, false);
		expect(input).toEqual([mockYtelseSammendrag3, mockYtelseSammendrag2, mockYtelseSammendrag1]);
	});

	it('can sort by identitetsnummer descending', () => {
		const input = sortYtelseSammendrag(mockYtelseSammendrag, 1, true);
		expect(input).toEqual([mockYtelseSammendrag1, mockYtelseSammendrag2, mockYtelseSammendrag3]);
	});

	it('can sort by antall_refusjoner ascending', () => {
		const input = sortYtelseSammendrag(mockYtelseSammendrag, 2, false);
		expect(input).toEqual([mockYtelseSammendrag1, mockYtelseSammendrag2, mockYtelseSammendrag3]);
	});

	it('can sort by antall_refusjoner descending', () => {
		const input = sortYtelseSammendrag(mockYtelseSammendrag, 2, true);
		expect(input).toEqual([mockYtelseSammendrag3, mockYtelseSammendrag2, mockYtelseSammendrag1]);
	});

	it('can sort by merknad ascending', () => {
		const input = sortYtelseSammendrag(mockYtelseSammendrag, 3, false);
		expect(input).toEqual([mockYtelseSammendrag1, mockYtelseSammendrag3, mockYtelseSammendrag2]);
	});

	it('can sort by merknad descending', () => {
		const input = sortYtelseSammendrag(mockYtelseSammendrag, 3, true);
		expect(input).toEqual([mockYtelseSammendrag2, mockYtelseSammendrag3, mockYtelseSammendrag1]);
	});

	it('ignores invalid sort parameter', () => {
		const input = sortYtelseSammendrag(mockYtelseSammendrag, 5, false);
		expect(input).toEqual(mockYtelseSammendrag);
	});
});
