import { identityNumberSeparation } from "./identityNumberSeparation";

describe('identityNumberSeparation', () => {
	it('doesnt change numbers below 6 digits', () => {
		const input = identityNumberSeparation('12345');
		expect(input).toEqual('12345');
	});
	
	it('adds seperator to numbers of 6 digits', async () => {
		const input = identityNumberSeparation( '123456');
		expect(input).toEqual('123456-');
	});
	
	it('adds seperator to numbers of 6 digits and above', async () => {
		const input = identityNumberSeparation( '1234567');
		expect(input).toEqual('123456-7');
	});
});
