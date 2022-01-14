import { Injectable } from '@angular/core';
import { DateUtils } from '@core/dates';

@Injectable()
export class AgeCalculatorService {
  public calculateAge(
    birthDate: Date | null,
    deceasedDate?: Date | null | undefined
  ): string {
    const dayOfBirth = DateUtils.coerceDate(birthDate) ?? DateUtils.today();

    const deathDay =
      deceasedDate !== null && deceasedDate !== undefined
        ? DateUtils.coerceDate(deceasedDate)
        : DateUtils.today();
    if (DateUtils.compare(deathDay, dayOfBirth) <= 0) {
      return '0 days';
    }

    const daysInMonth = this.daysInMonth(
      dayOfBirth.getMonth(),
      dayOfBirth.getFullYear()
    );
    const yearDelta = deathDay.getFullYear() - dayOfBirth.getFullYear();
    const monthDelta = deathDay.getMonth() - dayOfBirth.getMonth();
    const dayDelta = deathDay.getDate() - dayOfBirth.getDate();

    let year = yearDelta;
    let month = monthDelta;
    let day = dayDelta;

    if (month > 0 && day < 0) {
      month--;
    }

    if (year > 0 && month < 0) {
      year--;
      month += 11;
    }

    if (day < 0) {
      day += daysInMonth;
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
    return new Date(year, month + 1, 0).getDate();
  }
}
