import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { environment } from '@env/environment';
import { MedicineType } from '@core/models/medicine-type.model';
import { MedicineTypeService } from '@medical/medicine-type/medicine-type.service';

@Component({
  selector: 'app-medicine-type',
  templateUrl: './medicine-type.component.html',
  styleUrls: ['./medicine-type.component.scss']
})
export class MedicineTypeComponent implements OnInit, OnDestroy {
  public medicineTypes: MedicineType[];
  public filteredMedicineTypes: MedicineType[];
  public pageSize: number;
  public lastPage: number;

  private medicineTypeChanged: Subscription;

  constructor(private medicineTypeService: MedicineTypeService) {
    this.medicineTypes = [];
    this.filteredMedicineTypes = [];
    this.pageSize = environment.pageSize;
    this.lastPage = environment.defaultLastPage;
    this.medicineTypeChanged = new Subscription();
  }

  ngOnInit() {
    this.medicineTypeService.getMedicineTypes();
    this.medicineTypeChanged = this.medicineTypeService.medicineTypesChanged.subscribe(
      (medicineTypes: MedicineType[]) =>
        this.medicineTypeChangedHandler(medicineTypes)
    );
  }

  public addMedicineType() {
    this.medicineTypeService.addMedicineType(new MedicineType());
  }

  public onPage(pageEvent: PageEvent) {
    this.lastPage = pageEvent.pageIndex;
    this.filterList(pageEvent.pageSize, pageEvent.pageIndex);
  }

  private filterList(pageSize: number, pageIndex: number) {
    this.filteredMedicineTypes.splice(0);
    const startIndex = pageSize * pageIndex;
    for (let i = startIndex; i < startIndex + pageSize; i++) {
      // if we passed the last item, let's not continue
      if (i >= this.medicineTypes.length) {
        return;
      }
      this.filteredMedicineTypes.push(this.medicineTypes[i]);
    }
  }

  private medicineTypeChangedHandler(medicineTypes: MedicineType[]) {
    this.medicineTypes = medicineTypes;
    if (this.medicineTypes.length <= this.pageSize) {
      this.lastPage = 0;
    }
    this.filterList(this.pageSize, this.lastPage);
  }

  ngOnDestroy() {
    this.medicineTypeChanged.unsubscribe();
  }
}
