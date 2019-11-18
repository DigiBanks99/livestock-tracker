import * as moment from 'moment';

import { Injectable } from '@angular/core';

@Injectable()
export class AgeCalculatorService {
  public calculateAge(birthDate: Date, deceasedDate?: Date): string {
    const today =
      deceasedDate !== null && deceasedDate !== undefined
        ? moment(deceasedDate)
        : moment();
    const birthDateMoment = moment(birthDate);
    let year = today.year() - birthDateMoment.year();
    let month = today.month() - birthDateMoment.month();
    let day = today.date() - birthDateMoment.date();
    if (
      birthDateMoment.year() === today.year() &&
      birthDateMoment.month() === today.month() &&
      birthDateMoment.date() === today.date()
    ) {
      return '0 days';
    }

    const birthMonth = birthDateMoment.month() + 1; // add 1 because for some stupid reason month is 0 based
    const birthYear = birthDateMoment.year();
    const daysInMonth = this.daysInMonth(birthMonth, birthYear);

    if (month > 0 && day < 0) {
      month--;
      day = daysInMonth + day;
    }

    if (year > 0 && month < 0) {
      year--;
      month = 12 + month;
    }

    if (day < 0) {
      month--;
      day = daysInMonth + day;
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

  private daysInMonth(month: number, year: number): number {
    const date = moment(new Date(year, month, 0));
    return date.date();
  }
}
