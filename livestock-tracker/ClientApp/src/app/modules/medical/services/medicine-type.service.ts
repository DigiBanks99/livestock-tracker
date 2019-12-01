import { Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MedicineType } from '@core/models/medicine-type.model';

export interface IMedicineTypeService {
  medicineTypesChanged: Subject<MedicineType[]>;

  getMedicineTypes();
  addMedicineType(medicineType: MedicineType);
  deleteMedicineType(typeCode: number);
  updateMedicineType(medicineTypeToUpdate: MedicineType);
}

@Injectable()
export class MedicineTypeService implements IMedicineTypeService {
  public medicineTypesChanged: Subject<MedicineType[]>;

  private readonly apiUrl: string;
  private medicineTypes: MedicineType[];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl + 'medicine/';
    this.medicineTypes = [];
    this.medicineTypesChanged = new Subject<MedicineType[]>();
  }

  public getMedicineTypes() {
    this.http.get(this.apiUrl).subscribe((medicineTypes: MedicineType[]) => {
      this.medicineTypes = medicineTypes;
      this.emitMedicineTypeChanged();
    });
  }

  public addMedicineType(medicineType: MedicineType) {
    this.http
      .post(this.apiUrl, medicineType)
      .subscribe((savedMedicineType: MedicineType) => {
        this.medicineTypes.push(savedMedicineType);
        this.emitMedicineTypeChanged();
      });
  }

  public deleteMedicineType(typeCode: number) {
    this.http.delete(this.apiUrl + typeCode).subscribe(() => {
      this.getMedicineTypes();
    });
  }

  public updateMedicineType(medicineTypeToUpdate: MedicineType) {
    this.http
      .patch(this.apiUrl + medicineTypeToUpdate.typeCode, medicineTypeToUpdate)
      .subscribe(() => {
        this.emitMedicineTypeChanged();
      });
  }

  private indexOf(typeCode: number): number {
    if (
      this.medicineTypes === undefined ||
      this.medicineTypes === null ||
      this.medicineTypes.length === 0
    ) {
      return null;
    }

    if (typeCode === undefined || typeCode === null) {
      throw new Error('Invalid index');
    }

    return this.medicineTypes
      .map((medicineType: MedicineType) => {
        return medicineType.typeCode;
      })
      .indexOf(typeCode);
  }

  private emitMedicineTypeChanged() {
    this.medicineTypesChanged.next(this.medicineTypes.slice());
  }
}

export class MockMedicineTypeService implements IMedicineTypeService {
  medicineTypesChanged: Subject<MedicineType[]>;

  constructor() {
    this.medicineTypesChanged = new Subject<MedicineType[]>();
  }

  getMedicineTypes() {
    this.medicineTypesChanged.next([]);
  }
  addMedicineType(medicineType: MedicineType) {
    throw new Error('Not implemented');
  }
  deleteMedicineType(typeCode: number) {
    throw new Error('Not implemented');
  }
  updateMedicineType(medicineTypeToUpdate: MedicineType) {
    throw new Error('Not implemented');
  }
}
