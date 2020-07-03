import dayjs from 'dayjs';

const validatePerioder = (fom: string, tom: string): string | undefined => {
  if (!dayjs(fom).isValid() || !dayjs(tom).isValid()) {
    return 'Perioden må ha 2 gyldige datoer'
  }
  return undefined;
};

export default validatePerioder;
