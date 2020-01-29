import { getClassnameFromStatus } from "./getClassnameFromStatus";
import { Status } from "../store/types/helseSpionTypes";

describe('getClassnameFromStatus', () => {
	it('returns classname from pending status', () => {
		const input = getClassnameFromStatus(Status.PENDING);
		expect(input).toEqual('under-behandling');
	});
	
	it('returns classname from declined status', () => {
		const input = getClassnameFromStatus(Status.DECLINED);
		expect(input).toEqual('avslått');
	});
	
	it('returns classname from approved status', () => {
		const input = getClassnameFromStatus(Status.APPROVED);
		expect(input).toEqual('innvilget');
	});
});
