import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MedicineType } from './../medicine-type.model';
import { isNullOrUndefined } from 'util';

@Injectable()
export class MedicineTypeService {
  public medicineTypesChanged: Subject<MedicineType[]>;

  private urlBase = environment.apiUrl + 'Medicine/';
  private medicineTypes: MedicineType[];

  constructor(private http: HttpClient) {
    this.medicineTypes = [];
    this.medicineTypesChanged = new Subject<MedicineType[]>();
  }

  public getMedicineTypes() {
    this.http.get(this.urlBase).subscribe((medicineTypes: MedicineType[]) => {
      this.medicineTypes = medicineTypes;
      this.emitMedicineTypeChanged();
    });
  }

  public addMedicineType(medicineType: MedicineType) {
    this.http.post(this.urlBase, medicineType).subscribe((savedMedicineType: MedicineType) => {
      this.medicineTypes.push(savedMedicineType);
      this.emitMedicineTypeChanged();
    });
  }

  public deleteMedicineType(typeCode: number) {
    this.http.delete(this.urlBase + typeCode).subscribe(() => {
      this.getMedicineTypes();
    });
  }

  public updateMedicineType(medicineTypeToUpdate: MedicineType) {
    this.http.put(this.urlBase + medicineTypeToUpdate.typeCode, medicineTypeToUpdate).subscribe(() => {
      this.emitMedicineTypeChanged();
    });
  }

  private indexOf(typeCode: number): number {
    if (isNullOrUndefined(this.medicineTypes) || this.medicineTypes.length === 0) {
      return null;
    }

    if (isNullOrUndefined(typeCode)) {
      throw new Error('Invalid index');
    }

    return this.medicineTypes.map((medicineType: MedicineType) => {
      return medicineType.typeCode;
    }).indexOf(typeCode);
  }

  private emitMedicineTypeChanged() {
    this.medicineTypesChanged.next(this.medicineTypes.slice());
  }
}