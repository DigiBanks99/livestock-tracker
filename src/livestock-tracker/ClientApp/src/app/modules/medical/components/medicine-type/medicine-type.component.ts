import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MedicineType } from '@core/models/medicine-type.model';

@Component({
  selector: 'app-medicine-type',
  templateUrl: './medicine-type.component.html'
})
export class MedicineTypeComponent {
  @Input() public medicineTypes: MedicineType[];
  @Input() public pageSize: number;
  @Input() public pageNumber: number;
  @Input() public recordCount: number;

  @Output() public add = new EventEmitter<MedicineType>();
  @Output() public page = new EventEmitter<PageEvent>();
  @Output() public remove = new EventEmitter<number>();
  @Output() public save = new EventEmitter<MedicineType>();

  public displayedColumns: string[] = ['description', 'star'];

  public onAdd(): void {
    this.add.emit({
      id: 0,
      description: 'New'
    });
  }

  public onPage(pageEvent: PageEvent): void {
    this.page.emit(pageEvent);
  }

  public onSave(medicineType: MedicineType): void {
    this.save.emit(medicineType);
  }

  public onRemove(id: number): void {
    this.remove.emit(id);
  }
}
