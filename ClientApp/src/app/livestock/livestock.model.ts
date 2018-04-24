import { LiveStockType } from './livestock-type.model';
import { debuglog, debug } from 'util';

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
    const year = Math.abs(today.getFullYear() - this.birthDate.getFullYear());
    const month = Math.abs(today.getMonth() - this.birthDate.getMonth());
    const day = Math.abs(today.getDate() - this.birthDate.getDate());

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
