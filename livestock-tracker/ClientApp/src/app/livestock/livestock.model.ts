import { isNullOrUndefined } from 'util';
import * as moment from 'moment';

import { LiveStockType } from '@livestock/livestock-type.model';

export interface Animal {
  id: number;
  type: LiveStockType;
  subspecies: string;
  number: number;
  birthDate: Date;
  purchaseDate: Date;
  purchasePrice: number;
  sold: boolean;
  sellPrice: number;
  sellDate: Date;
  arrivalWeight: number;
  batchNumber: number;
  deceased: boolean;
  dateOfDeath: Date;
}

export class Livestock implements Animal {
  public sold: boolean;
  public sellDate: Date;
  public deceased: boolean;
  public dateOfDeath: Date;

  constructor(
    public id: number,
    public type: LiveStockType,
    public subspecies: string,
    public number: number,
    public birthDate: Date,
    public purchaseDate: Date,
    public purchasePrice: number,
    public sellPrice: number,
    public arrivalWeight: number,
    public batchNumber: number
  ) {
    if (!isNullOrUndefined(sellPrice)) {
      this.sold = true;
    } else {
      this.sold = false;
    }
  }
}

declare global {
  interface DateConstructor {
    daysInMonth(month, year): number;
  }
}

Date.daysInMonth = daysInMonth;

function daysInMonth(month, year): number {
  const date = new Date(year, month, 0);
  return date.getDate();
}

export function getAge(animal: Livestock): string {
  if (animal === null || animal === undefined) {
    return '0 days';
  }

  const today = moment();
  const birthDate = moment(animal.birthDate);
  let year = today.year() - birthDate.year();
  let month = today.month() - birthDate.month();
  let day = today.date() - birthDate.date();
  if (
    birthDate.year() === today.year() &&
    birthDate.month() === today.month() &&
    birthDate.date() === today.date()
  ) {
    return '0 days';
  }

  if (month > 0 && day < 0) {
    month--;
    const birthMonth = birthDate.month() + 1; // add 1 becuase for some stupid reason month is 0 based
    const birthYear = birthDate.year();
    const daysInMnth = Date.daysInMonth(birthMonth, birthYear);
    day = daysInMnth + day;
  }

  if (year > 0 && month < 0) {
    year--;
    month = 12 + month;
  }

  let displayAge = addAgeSection(year, 'year');
  displayAge += addAgeSection(month, 'month');
  displayAge += addAgeSection(day, 'day');
  if (displayAge.endsWith(' ')) {
    displayAge = displayAge.substring(0, displayAge.length - 1);
  }

  return displayAge;
}

function addAgeSection(unit: number, description: string): string {
  let displayAge = '';
  if (unit <= 0) {
    return displayAge;
  }
  displayAge += unit + ' ' + description;
  if (unit > 1) {
    displayAge += 's';
  }
  displayAge += ' ';
  return displayAge;
}
