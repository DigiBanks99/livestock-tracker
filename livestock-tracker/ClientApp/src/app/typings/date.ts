import * as moment from 'moment';

declare global {
  interface DateConstructor {
    daysInMonth(month, year): number;
  }
}

Date.daysInMonth = daysInMonth;

export function daysInMonth(month, year): number {
  const date = moment(new Date(year, month, 0));
  return date.date();
}
