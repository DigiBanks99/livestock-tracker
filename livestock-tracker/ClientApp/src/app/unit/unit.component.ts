import { PageEvent } from '@angular/material';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UnitService } from './unit.service';
import { Unit } from './unit.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit, OnDestroy {
  public units: Unit[];
  public filteredUnits: Unit[];
  public pageSize: number;
  public lastPage: number;

  private unitsChanged: Subscription;

  constructor(private unitService: UnitService) {
    this.units = [];
    this.filteredUnits = [];
    this.pageSize = environment.pageSize;
    this.lastPage = environment.defaultLastPage;
    this.unitsChanged = new Subscription();
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
    this.filterList(pageEvent.pageSize, pageEvent.pageIndex);
  }

  private filterList(pageSize: number, pageIndex: number) {
    this.filteredUnits.splice(0);
    const startIndex = pageSize * pageIndex;
    for (let i = startIndex; i < startIndex + pageSize; i++) {
      // if we passed the last item, let's not continue
      if (i >= this.units.length) {
        return;
      }
      this.filteredUnits.push(this.units[i]);
    }
  }

  private unitsChangedHandler(units: Unit[]) {
    this.units = units;
    if (this.units.length <= this.pageSize) {
      this.lastPage = 0;
    }
    this.filterList(this.pageSize, this.lastPage);
  }

  ngOnDestroy() {
    this.unitsChanged.unsubscribe();
  }
}
