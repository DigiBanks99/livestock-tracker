import * as moment from 'moment';
import { Observable, of, Subject, Subscription, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Animal, AnimalType, Livestock } from '@core/models';
import { environment } from '@env/environment';

interface ILivestockService {
  livestockChanged: Subject<Livestock[]>;
  editingStarted: Subject<number>;

  index(): Observable<Livestock[]>;
  getLivestock();
  getAnimal(id: number): Livestock;
  removeLivestock(id: number): Observable<Livestock>;
  addAnimal(animal: Livestock): Observable<Livestock>;
  updateAnimal(animal: Livestock): Observable<Livestock>;
  getSvgIcon(animal: Livestock): string;
  getSvgIconByType(type: AnimalType): string;
  getSvgIconByString(type: string): string;
}

@Injectable()
export class LivestockService implements ILivestockService, OnDestroy {
  private livestock: Livestock[];
  private readonly apiUrl: string;
  private httpGetSubscription: Subscription;
  private httpDeleteSubscription: Subscription;
  private httpPutSubscription: Subscription;
  private httpPostSubscription: Subscription;

  public livestockChanged: Subject<Livestock[]>;
  public editingStarted: Subject<number>;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.livestock = [];
    this.apiUrl = baseUrl;

    this.livestockChanged = new Subject<Livestock[]>();
    this.editingStarted = new Subject<number>();
  }

  public getLivestock() {
    this.livestock = [];

    this.httpGetSubscription = this.http
      .get<Livestock[]>(this.apiUrl + 'animal')
      .subscribe((animals: Livestock[]) => {
        for (const animal of animals) {
          this.livestock.push(this.cloneAnimal(animal));
          this.emitLivestockChanged();
        }
      }, this.handleError);
  }

  public index(): Observable<Livestock[]> {
    return this.http.get<Livestock[]>(this.apiUrl + 'animal');
  }

  public getLivestockType(typeNumber: number): AnimalType {
    switch (typeNumber) {
      case 0:
        return AnimalType.Cattle;
      case 1:
        return AnimalType.Sheep;
      case 2:
        return AnimalType.Pig;
      case 3:
        return AnimalType.Chicken;
      default:
        throw new Error('Not implemented LivestockType: ' + typeNumber);
    }
  }

  public getAnimal(id: number): Livestock {
    if (id === undefined || id === null || id === 0) {
      return null;
    }

    if (this.livestock.length === 0) {
      throw Error('Item not found');
    }

    const index = this.livestock
      .map(animal => {
        return animal.id;
      })
      .indexOf(id);

    if (index < 0) {
      throw Error('Item not found');
    }

    return this.livestock.slice()[index];
  }

  public removeLivestock(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  public addAnimal(animal: Livestock): Observable<Livestock> {
    if (animal === undefined || animal === null) {
      throw new Error('Animal is required');
    }

    if (animal.id === null) animal.id = 0;
    return this.http.post<Livestock>(this.apiUrl + 'animal', animal);
  }

  public updateAnimal(animal: Livestock): Observable<Animal> {
    return this.http.patch<Animal>(this.apiUrl + 'animal', animal);
  }

  public getSvgIcon(animal: Livestock): string {
    if (animal === undefined || animal === null) {
      return null;
    }

    return this.getSvgIconByType(animal.type);
  }

  public getSvgIconByType(type: AnimalType): string {
    switch (type) {
      case AnimalType.Cattle:
        return 'cow';
      case AnimalType.Chicken:
        return 'chicken';
      case AnimalType.Pig:
        return 'pig';
      case AnimalType.Sheep:
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
      clonedAnimal.sellDate = moment(animal.sellDate)
        .utc()
        .toDate();
    }

    clonedAnimal.deceased = animal.deceased;
    if (clonedAnimal.deceased) {
      clonedAnimal.dateOfDeath = moment(animal.dateOfDeath)
        .utc()
        .toDate();
    }

    return clonedAnimal;
  }

  private emitLivestockChanged() {
    this.livestockChanged.next(this.livestock.slice());
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Back-end returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  ngOnDestroy() {
    this.httpGetSubscription.unsubscribe();
    this.httpDeleteSubscription.unsubscribe();
    this.httpPostSubscription.unsubscribe();
    this.httpPutSubscription.unsubscribe();
  }
}

export class MockLivestockService implements ILivestockService {
  public livestockChanged = new Subject<Livestock[]>();
  public editingStarted = new Subject<number>();

  public index(): Observable<Livestock[]> {
    return of([]);
  }

  public getLivestock(): Livestock[] {
    return [];
  }

  public getAnimal(id: number): Livestock {
    if (id === undefined || id === null) {
      return null;
    }

    return new Livestock(
      1,
      AnimalType.Cattle,
      '',
      0,
      new Date(),
      new Date(),
      0,
      0,
      0,
      0
    );
  }

  public removeLivestock(id: number): Observable<Livestock> {
    return of(null);
  }
  public addAnimal(animal: Livestock): Observable<Livestock> {
    return of(null);
  }
  public updateAnimal(animal: Livestock): Observable<Livestock> {
    return of(null);
  }
  public getSvgIcon(animal: Livestock): string {
    return null;
  }
  public getSvgIconByType(type: AnimalType): string {
    return null;
  }
  public getSvgIconByString(type: string): string {
    return null;
  }
}
