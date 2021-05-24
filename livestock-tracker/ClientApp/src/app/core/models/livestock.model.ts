import { AnimalType } from '@core/models/animal-type.enum';

export interface Animal {
  id: number;
  type: AnimalType;
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
    public type: AnimalType,
    public subspecies: string,
    public number: number,
    public birthDate: Date,
    public purchaseDate: Date,
    public purchasePrice: number,
    public sellPrice: number,
    public arrivalWeight: number,
    public batchNumber: number
  ) {
    if (!sellPrice) {
      this.sold = true;
    } else {
      this.sold = false;
    }
  }
}

export class NullAnimal implements Animal {
  private static _instance: NullAnimal = new NullAnimal();
  static get instance(): NullAnimal {
    return this._instance;
  }
  readonly id: number = Number.NaN;
  readonly type: AnimalType = AnimalType.Cattle;
  readonly subspecies = '';
  readonly number: number = Number.NaN;
  readonly birthDate: Date = null;
  readonly purchaseDate: Date = null;
  readonly purchasePrice: number = null;
  readonly sold = false;
  readonly sellPrice: number = null;
  readonly sellDate: Date = null;
  readonly arrivalWeight: number = null;
  readonly batchNumber: number = null;
  readonly deceased = false;
  readonly dateOfDeath: Date = null;
}
