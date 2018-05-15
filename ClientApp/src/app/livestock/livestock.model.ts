import { isNullOrUndefined } from 'util';
import { LiveStockType } from './livestock-type.model';

import * as moment from 'moment';

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
  arrivalWeight: number;
  batchNumber: number;

  getAge(): string;
}

export class Livestock implements Animal {
  public sold: boolean;
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
  public getAge(): string {
    const today = moment();
    const birthDate = moment(this.birthDate);
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
    let displayAge = this.addAgeSection(year, 'year');
    displayAge += this.addAgeSection(month, 'month');
    displayAge += this.addAgeSection(day, 'day');
    if (displayAge.endsWith(' ')) {
      displayAge = displayAge.substring(0, displayAge.length - 1);
    }
    return displayAge;
  }
  private addAgeSection(unit: number, description: string): string {
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
