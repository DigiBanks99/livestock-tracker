import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { isUndefined, isNullOrUndefined } from 'util';

import { UnitService } from './unit.service';
import { Unit } from './unit.model';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit, OnDestroy {
  public units: Unit[];

  private unitsChanged: Subscription;

  constructor(private unitService: UnitService) {
    this.units = [];
  }

  ngOnInit() {
    this.unitsChanged = this.unitService.unitsChanged.subscribe((units: Unit[]) => this.unitsChangedHandler(units));
    this.unitService.getUnits();
  }

  public addUnit() {
    this.unitService.addUnit(new Unit());
  }

  private unitsChangedHandler(units: Unit[]) {
    this.units = units;
  }

  ngOnDestroy() {
    this.unitsChanged.unsubscribe();
  }
}
