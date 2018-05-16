import { OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Config } from 'protractor';

import * as moment from 'moment';

import { Animal, Livestock } from './livestock.model';
import { LiveStockType } from './livestock-type.model';
import { Extensions } from '../extensions';

interface ILivestockService {
  livestockChanged: Subject<Livestock[]>;
  editingStarted: Subject<number>;
  getLivestock(); // : Livestock[];
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
  private readonly apiRoute = 'http://localhost:51372/api/';

  public livestockChanged: Subject<Livestock[]>;
  public editingStarted: Subject<number>;

  constructor(private http: HttpClient) {
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

  public getLivestock() {
    this.livestock = [];
    const obsrvble = new Subject<Livestock[]>();
    this.http.get<Livestock[]>(this.apiRoute + 'animal').subscribe((animals: Livestock[]) => {
      for (const animal of animals) {
        this.livestock.push(this.cloneAnimal(animal));
      }
      obsrvble.next(this.livestock);
    });
    return obsrvble;
  }

  public getLivestockType(typeNumber: number): LiveStockType {
    switch (typeNumber) {
      case 0:
        return LiveStockType.Cattle;
      case 1:
        return LiveStockType.Sheep;
      case 2:
        return LiveStockType.Pig;
      case 3:
        return LiveStockType.Chicken;
      default:
        throw new Error('Not implemented LivestockType: ' + typeNumber);
    }
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
      this.http.post(this.apiRoute + 'animal', animal).subscribe(() => {
        this.getLivestock().subscribe((animals: Livestock[]) => {
          this.emitLivestockChanged();
        });
      });
    }
  }

  public updateAnimal(animal: Livestock) {
    const index = this.livestock.map((existingAnimal) => {
      return existingAnimal.id;
    }).indexOf(animal.id);

    if (index < 0) {
      throw new Error('Animal does not exist in list. Use addAnimal instead.');
    }
    this.http.put(this.apiRoute + 'animal', animal).subscribe(() => {
      this.getLivestock().subscribe((animals: Livestock[]) => {
        this.emitLivestockChanged();
      });
    });
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

  public cloneAnimal(animal: Livestock): Livestock {
    const clonedAnimal = new Livestock(
      animal.id,
      animal.type,
      animal.subspecies,
      animal.number,
      animal.birthDate,
      animal.purchaseDate,
      animal.purchasePrice,
      animal.sellPrice,
      animal.arrivalWeight,
      animal.batchNumber
    );
    clonedAnimal.sold = animal.sold;
    if (clonedAnimal.sold) {
      clonedAnimal.sellPrice = animal.sellPrice;
      clonedAnimal.sellDate = moment(animal.sellDate).toDate();
    }

    clonedAnimal.deceased = animal.deceased;
    if (clonedAnimal.deceased) {
      clonedAnimal.dateOfDeath = moment(animal.dateOfDeath).toDate();
    }

    return clonedAnimal;
  }

  private emitLivestockChanged() {
    this.livestockChanged.next(this.livestock.slice());
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
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
