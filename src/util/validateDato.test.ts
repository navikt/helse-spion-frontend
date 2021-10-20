import validateDato from './validateDato';

describe('validateDato', () => {
  it('returnerer undefined når den får to gyldige datoer', () => {
    const input = validateDato('01.01.2020');
    expect(input).toBeUndefined();
  });

  it('returnerer varseltekst når den får en ugyldig gyldig dato', () => {
    const input = validateDato('31.02.2020');
    expect(input).toBe('Må være gyldig dato');
  });
});
