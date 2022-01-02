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
  archived: boolean;
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
  readonly birthDate = new Date(1970, 1, 1);
  readonly purchaseDate = new Date(1970, 1, 1);
  readonly purchasePrice = 0;
  readonly sold = false;
  readonly sellPrice: number = null;
  readonly sellDate: Date = null;
  readonly arrivalWeight = 0;
  readonly batchNumber = 0;
  readonly deceased = false;
  readonly dateOfDeath: Date = null;
  readonly archived = false;
}
