import { OnInit, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { isNullOrUndefined } from 'util';

import { Livestock } from './livestock.model';
import { LiveStockType } from './livestock-type.model';

interface ILivestockService {
  livestockChanged: Subject<Livestock[]>;
  editingStarted: Subject<number>;
  getLivestock(): Livestock[];
  getAnimal(id: number): Livestock;
  removeLivestock(id: number);
  addAnimal(animal: Livestock);
  updateAnimal(animal: Livestock);
  getSvgIcon(animal: Livestock): string;
  getSvgIconByType(type: LiveStockType): string;
  getSvgIconByString(type: string): string;
}

@Injectable()
export class LivestockService implements ILivestockService, OnInit {
  private livestock: Livestock[];
  private lastNewID: number;

  public livestockChanged: Subject<Livestock[]>;
  public editingStarted: Subject<number>;

  constructor() {
    this.livestock = [
      new Livestock(1, LiveStockType.Cattle, 'Brahman', 1, new Date(2018, 3, 22), new Date(2018, 4, 1), 1000, null, 120, 1),
      new Livestock(2, LiveStockType.Cattle, 'Brahman', 2, new Date(2018, 3, 23), new Date(2018, 4, 1), 1000, null, 120, 1),
      new Livestock(8, LiveStockType.Chicken, null, 8, new Date(2018, 3, 22), new Date(2018, 4, 1), 1000, null, 120, 1),
      new Livestock(3, LiveStockType.Cattle, 'Fries', 3, new Date(2018, 3, 22), new Date(2018, 4, 1), 1000, null, 120, 1),
      new Livestock(4, LiveStockType.Cattle, 'Jersey', 4, new Date(2018, 3, 22), new Date(2018, 4, 1), 1000, null, 120, 1),
      new Livestock(9, LiveStockType.Pig, null, 9, new Date(2018, 3, 22), new Date(2018, 4, 1), 1000, null, 120, 1),
      new Livestock(5, LiveStockType.Cattle, 'Brahman', 5, new Date(2018, 3, 23), new Date(2018, 4, 1), 1000, null, 120, 1),
      new Livestock(10, LiveStockType.Sheep, null, 10, new Date(2018, 3, 22), new Date(2018, 4, 1), 1000, null, 120, 1),
      new Livestock(6, LiveStockType.Cattle, 'Guernsey', 6, new Date(2018, 3, 22), new Date(2018, 4, 1), 1000, null, 120, 1),
      new Livestock(7, LiveStockType.Cattle, 'Fries', 7, new Date(2018, 3, 22), new Date(2018, 4, 1), 1000, null, 120, 1)
    ];

    this.lastNewID = -1;
    this.livestock[4].sold = true;
    this.livestock[4].sellPrice = 1400;

    this.livestockChanged = new Subject<Livestock[]>();
    this.editingStarted = new Subject<number>();
  }

  ngOnInit() {
  }

  public getLivestock(): Livestock[] {
    return this.livestock.slice();
  }

  public getAnimal(id: number): Livestock {
    if (isNullOrUndefined(id) || id === 0) {
      return null;
    }

    if (this.livestock.length === 0) {
      throw Error('Item not found');
    }

    const index = this.livestock.map((animal) => {
      return animal.id;
    }).indexOf(id);

    if (index < 0) {
      throw Error('Item not found');
    }

    return this.livestock.slice()[index];
  }

  public removeLivestock(id: number) {
    if (this.livestock.length === 0) {
      return;
    }

    const index = this.livestock.map((animal) => {
      return animal.id;
    }).indexOf(id);

    if (index < 0) {
      throw Error('Item not found');
    }

    this.livestock.splice(index, 1);
    this.emitLivestockChanged();
  }

  public addAnimal(animal: Livestock) {
    if (isNullOrUndefined(animal)) {
      throw new Error('Animal is required');
    }

    let existingAnimal: Livestock;
    try {
     existingAnimal = this.getAnimal(animal.id);
    } catch (e) {
      if (e.message === 'Item not found') {
        existingAnimal = null;
      }
    }

    if (existingAnimal !== null) {
      throw new Error('Animal already exists. Use updateAnimal instead.');
    } else {
      animal.id = this.lastNewID--;
      this.livestock.push(animal);
    }
    this.emitLivestockChanged();
  }

  public updateAnimal(animal: Livestock) {
    const index = this.livestock.map((existingAnimal) => {
      return existingAnimal.id;
    }).indexOf(animal.id);

    if (index < 0) {
      throw new Error('Animal does not exist in list. Use addAnimal instead.');
    }
    this.livestock[index] = animal;

    this.emitLivestockChanged();
  }

  public getSvgIcon(animal: Livestock): string {
    if (isNullOrUndefined(animal)) {
      return null;
    }

    return this.getSvgIconByType(animal.type);
  }

  public getSvgIconByType(type: LiveStockType): string {
    switch (type) {
      case LiveStockType.Cattle:
        return 'cow';
      case LiveStockType.Chicken:
        return 'chicken';
      case LiveStockType.Pig:
        return 'pig';
      case LiveStockType.Sheep:
        return 'sheep';
      default:
        throw Error(type + ' not implemented');
    }
  }

  public getSvgIconByString(type: string): string {
    if (type === 'Cattle') {
        return 'cow';
    } else if (type === 'Chicken') {
        return 'chicken';
    } else if (type === 'Pig') {
        return 'pig';
    } else if (type === 'Sheep') {
        return 'sheep';
    } else {
        throw Error(type + ' not implemented');
    }
  }

  private emitLivestockChanged() {
    this.livestockChanged.next(this.getLivestock());
  }
}

export class MockLivestockService implements ILivestockService {
  public livestockChanged = new Subject<Livestock[]>();
  public editingStarted = new Subject<number>();
  public getLivestock(): Livestock[] {
    return [];
  }

  public getAnimal(id: number): Livestock {
    if (isNullOrUndefined(id)) {
      return null;
    }

    return new Livestock(1, LiveStockType.Cattle, '', 0, new Date(), new Date(), 0, 0, 0, 0);
  }

  public removeLivestock(id: number) { }
  public addAnimal(animal: Livestock) { }
  public updateAnimal(animal: Livestock) { }
  public getSvgIcon(animal: Livestock): string { return null; }
  public getSvgIconByType(type: LiveStockType): string { return null; }
  public getSvgIconByString(type: string): string { return null; }
}
