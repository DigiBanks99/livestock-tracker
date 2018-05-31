import { Injectable, Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { isUndefined, isNullOrUndefined } from 'util';

import { Unit } from './unit.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UnitService implements OnInit, OnDestroy {
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
    const index = this.indexOf(unit.typeCode);
    if (index < 0) {
      throw new Error('Index out of range');
    }

    let unitToUpdate = this.units[index];
    this.updateUnitSubscription = this.http.put(this.urlBase + unit.typeCode, unit).subscribe((updatedUnit: Unit) => {
      unitToUpdate = updatedUnit;
      this.emitUnitsChanged();
    });
  }

  public deleteUnit(typeCode: Unit) {
    this.deleteUnitSubscription = this.http.delete(this.urlBase + typeCode).subscribe(() => {
      this.getUnits();
      this.emitUnitsChanged();
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
