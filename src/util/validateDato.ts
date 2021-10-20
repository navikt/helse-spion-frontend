import dayjs from 'dayjs';

const validateDato = (fom: string): string | undefined => {
  if (!dayjs(fom).isValid()) {
    return 'Må være gyldig dato';
  }
  return undefined;
};

export default validateDato;
