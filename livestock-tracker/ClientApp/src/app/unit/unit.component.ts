import { PageEvent } from '@angular/material';
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
  public pageSize: number;
  public lastPage: number;

  private unitsChanged: Subscription;

  constructor(private unitService: UnitService) {
    this.units = [];
    this.pageSize = 10;
    this.lastPage = 1;
  }

  ngOnInit() {
    this.unitsChanged = this.unitService.unitsChanged.subscribe((units: Unit[]) => this.unitsChangedHandler(units));
    this.unitService.getUnits();
  }

  public addUnit() {
    this.unitService.addUnit(new Unit());
  }

  public onPage(pageEvent: PageEvent) {
    this.lastPage = pageEvent.pageIndex;
    // this.filterList(pageEvent.pageSize, pageEvent.pageIndex);
  }

  private unitsChangedHandler(units: Unit[]) {
    this.units = units;
  }

  ngOnDestroy() {
    this.unitsChanged.unsubscribe();
  }
}
