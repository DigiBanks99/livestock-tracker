import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Unit } from '@core/models/unit.model';
import { environment } from '@env/environment';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
})
export class UnitComponent {
  @Input() public units: Unit[];
  @Input() public isPending: boolean;
  @Input() public error: Error;
  @Input() public pageNumber: number;
  @Input() public pageSize: number;
  @Input() public recordCount: number;
  @Output() public add = new EventEmitter<Unit>();
  @Output() public save = new EventEmitter<Unit>();
  @Output() public remove = new EventEmitter<number>();
  @Output() public page = new EventEmitter<PageEvent>();

  public displayedColumns: string[] = ['description', 'star'];

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
    this.page.emit(pageEvent);
  }
}
