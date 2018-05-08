import { LiveStockType } from './livestock-type.model';

export class Livestock {
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
    this.sold = false;
  }

  public getAge(): string {
    const today = new Date();
    let year = today.getFullYear() - this.birthDate.getFullYear();
    let month = today.getMonth() - this.birthDate.getMonth();
    let day = today.getDate() - this.birthDate.getDate();

    if (
      this.birthDate.getFullYear() === today.getFullYear() &&
      this.birthDate.getMonth() === today.getMonth() &&
      this.birthDate.getDate() === today.getDate()
    ) {
      return '0 days';
    }

    if (month > 0 && day < 0) {
      month--;
      const birthMonth = this.birthDate.getMonth() + 1; // add 1 becuase for some stupid reason month is 0 based
      const birthYear = this.birthDate.getFullYear();
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
