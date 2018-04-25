import { LiveStockType } from './livestock-type.model';

export class Livestock {
  constructor (
    protected id: number,
    protected type: LiveStockType,
    protected subspecies: string,
    protected number: number,
    protected birthDate: Date,
    protected purchaseDate: Date,
    protected purchasePrice: number,
    protected sellPrice: number,
    protected arrivalWeight: number,
    protected batchNumber: number) { }

  public getAge(): string {
    const today = new Date();
    let year = today.getFullYear() - this.birthDate.getFullYear();
    let month = today.getMonth() - this.birthDate.getMonth();
    let day = today.getDate() - this.birthDate.getDate();

    if (month > 0 && day < 0) {
      month--;
      const birthMonth = this.birthDate.getMonth() + 1; // add 1 becuase for some stupid reason month is 0 based
      const birthYear = this.birthDate.getFullYear();
      const daysInMonth = Date.daysInMonth(birthMonth, birthYear);
      day = daysInMonth + day;
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
  var date = new Date(year, month, 0);
  return date.getDate();
}
