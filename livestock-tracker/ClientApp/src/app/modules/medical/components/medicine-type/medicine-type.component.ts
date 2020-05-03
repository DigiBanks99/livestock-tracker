import { Subscription } from 'rxjs';

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MedicineType } from '@core/models/medicine-type.model';
import { environment } from '@env/environment';
import { MedicineTypeService } from '@medical/services/medicine-type.service';

@Component({
  selector: 'app-medicine-type',
  templateUrl: './medicine-type.component.html',
  styleUrls: ['./medicine-type.component.scss'],
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
    const medicineType = new MedicineType();
    medicineType.description = 'New';
    this.add.emit(medicineType);
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
