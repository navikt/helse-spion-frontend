import dayjs from 'dayjs';

export const formatDato = (str: string): string => {
  if (!str){
    return '';
  }
  return dayjs(str).format('DD.MM.YYYY');
}

export const formatDatoer = (a: any): string => {
  if (!(a?.fom && a?.tom)){
    return '';
  }
  console.log(formatDato(a?.fom) + ' til ' + formatDato(a?.tom));
  return formatDato(a?.fom) + ' til ' + formatDato(a?.tom);
}

export default formatDatoer;
