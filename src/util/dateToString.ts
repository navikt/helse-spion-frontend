import dayjs from 'dayjs';

export const dateToString = (date: Date): string => dayjs(date).format('DD.MM.YY');
