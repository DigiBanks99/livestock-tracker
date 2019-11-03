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
    if (!sellPrice) {
      this.sold = true;
    } else {
      this.sold = false;
    }
  }
}
