import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

import { MedicineType } from './../medicine-type.model';
import { MedicineTypeService } from './medicine-type.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medicine-type',
  templateUrl: './medicine-type.component.html',
  styleUrls: ['./medicine-type.component.scss']
})
export class MedicineTypeComponent implements OnInit {
  public medicineTypes: MedicineType[];
  public pageSize: number;
  public lastPage: number;

  private medicineTypeChanged: Subscription;

  constructor(private medicineTypeService: MedicineTypeService) {
    this.medicineTypes = [];
    this.pageSize = 10;
    this.lastPage = 1;
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
    // this.filterList(pageEvent.pageSize, pageEvent.pageIndex);
  }

  private medicineTypeChangedHandler(medicineTypes: MedicineType[]) {
    this.medicineTypes = medicineTypes;
  }
}
