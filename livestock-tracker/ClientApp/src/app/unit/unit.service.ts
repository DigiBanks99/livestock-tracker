import { Injectable, Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { isUndefined, isNullOrUndefined } from 'util';

import { Unit } from './unit.model';
import { environment } from '../../environments/environment.prod';

export interface IUnitService {
  unitsChanged: Subject<Unit[]>;

  getUnits();
  getUnit(typeCode: number): Unit;
  addUnit(unit: Unit);
  updateUnit(unit: Unit);
  deleteUnit(typeCode: number);
}

@Injectable({
  providedIn: 'root'
})
export class UnitService implements IUnitService, OnInit, OnDestroy {
  public unitsChanged: Subject<Unit[]>;

  private urlBase = environment.apiUrl + 'unit/';
  private units: Unit[];
  private getUnitsSubscription: Subscription;
  private addUnitSubscription: Subscription;
  private updateUnitSubscription: Subscription;
  private deleteUnitSubscription: Subscription;

  constructor(private http: HttpClient) {
    this.units = [];
    this.unitsChanged = new Subject<Unit[]>();
  }

  ngOnInit() {
    this.units = [];
  }

  public getUnits() {
    this.getUnitsSubscription = this.http.get(this.urlBase).subscribe((units: Unit[]) => {
      this.units = units;
      this.emitUnitsChanged();
    });
  }

  public getUnit(typeCode: number): Unit {
    const index = this.indexOf(typeCode);
    if (index < 0) {
      throw new Error('Index out of range');
    }

    return this.units.slice()[index];
  }

  public addUnit(unit: Unit) {
    this.addUnitSubscription = this.http.post(this.urlBase, unit).subscribe((savedUnit: Unit) => {
      this.units.push(savedUnit);
      unit = savedUnit;
      this.emitUnitsChanged();
    });
  }

  public updateUnit(unit: Unit) {
    this.updateUnitSubscription = this.http.put(this.urlBase + unit.typeCode, unit).subscribe(() => {
      this.emitUnitsChanged();
    });
  }

  public deleteUnit(typeCode: number) {
    this.deleteUnitSubscription = this.http.delete(this.urlBase + typeCode).subscribe(() => {
      this.getUnits();
    });
  }

  private indexOf(typeCode: number): number {
    if (isNullOrUndefined(this.units) || this.units.length === 0) {
      return null;
    }

    if (isNullOrUndefined(typeCode)) {
      throw new Error('Invalid index');
    }

    return this.units.map((unit: Unit) => {
      return unit.typeCode;
    }).indexOf(typeCode);
  }

  private emitUnitsChanged() {
    this.unitsChanged.next(this.units.slice());
  }

  ngOnDestroy() {
    if (!isUndefined(this.getUnitsSubscription)) {
      this.getUnitsSubscription.unsubscribe();
    }
    if (!isUndefined(this.addUnitSubscription)) {
      this.addUnitSubscription.unsubscribe();
    }
    if (!isUndefined(this.updateUnitSubscription)) {
      this.updateUnitSubscription.unsubscribe();
    }
    if (!isUndefined(this.deleteUnitSubscription)) {
      this.deleteUnitSubscription.unsubscribe();
    }
  }
}

export class MockUnitService implements IUnitService {
  unitsChanged: Subject<Unit[]>;

  constructor() {
    this.unitsChanged = new Subject<Unit[]>();
  }

  getUnits() {
    this.unitsChanged.next([]);
  }
  getUnit(typeCode: number): Unit {
    return new Unit();
  }
  addUnit(unit: Unit) {
    throw new Error('Method not implemented.');
  }
  updateUnit(unit: Unit) {
    throw new Error('Method not implemented.');
  }
  deleteUnit(typeCode: number) {
    throw new Error('Method not implemented.');
  }


}
