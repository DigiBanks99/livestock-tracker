import { PageEvent } from '@angular/material';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Unit } from './unit.model';
import { environment } from '@env/environment';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent {
  @Input() public units: Unit[];
  @Input() public isPending: boolean;
  @Input() public error: Error;
  @Output() public add = new EventEmitter<Unit>();
  @Output() public save = new EventEmitter<Unit>();
  @Output() public remove = new EventEmitter<number>();

  public filteredUnits: Unit[];
  public pageSize: number;
  public lastPage: number;

  constructor() {
    this.filteredUnits = [];
    this.pageSize = environment.pageSize;
    this.lastPage = environment.defaultLastPage;
  }

  public onAdd() {
    const unit = new Unit();
    unit.description = 'New';
    this.add.emit(unit);
  }

  public onSave(unit: Unit) {
    this.save.emit(unit);
  }

  public onRemove(id: number) {
    this.remove.emit(id);
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
}
