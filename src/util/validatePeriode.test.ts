import validatePeriode from './validatePeriode';

describe('validatePeriode', () => {
	it('returnerer undefined når den får to gyldige datoer', () => {
		const input = validatePeriode('01.01.2020', '02.02.2020');
		expect(input).toBeUndefined();
  });

  it('returnerer varseltekst når den får en ugyldig gyldig dato', () => {
		const input = validatePeriode('01.01.2020', '31.02.2020');
		expect(input).toBe('Perioden må ha 2 gyldige datoer');
	});
});
