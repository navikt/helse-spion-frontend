import { mockYtelseSammendrag1, mockYtelseSammendrag2, mockYtelseSammendrag3, mockYtelseSammendrag } from './mockData';
import totalRefundInYtelseSammendrag from './totalRefundInYtelseSammendrag';

describe('totalRefundInYtelseSammendrag', () => {
	it('calculates total refund in ytelsesperioder', () => {
		const input = totalRefundInYtelseSammendrag(mockYtelseSammendrag);
		expect(input).toEqual(
			mockYtelseSammendrag1.refusjonsbeløp!
			+ mockYtelseSammendrag2.refusjonsbeløp!
			+ mockYtelseSammendrag3.refusjonsbeløp!
		);
	});
});
