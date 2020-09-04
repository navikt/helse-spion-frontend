import formatDatoer, { formatDato } from './formatDato';

describe('formatDatoer', () => {
	it('returns a well formate to and from string', () => {
    const input = {
      fom: 'Wed Sep 02 2020 10:11:35 GMT+0200',
      tom: 'Thu Sep 03 2020 10:11:35 GMT+0200'
    }
		const result = formatDatoer(input);
		expect(result).toEqual('02.09.2020 til 03.09.2020');
  });
});


describe('formatDato', () => {
	it('returns a well formated date', () => {
    const input = 'Wed Sep 02 2020 10:11:35 GMT+0200';

		const result = formatDato(input);
		expect(result).toEqual('02.09.2020');
  });
});
