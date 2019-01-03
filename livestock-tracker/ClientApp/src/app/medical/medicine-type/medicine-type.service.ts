import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '@env/environment';
import { MedicineType } from '@medical/medicine-type.model';
import { isNullOrUndefined } from 'util';

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
    this.http
      .post(this.urlBase, medicineType)
      .subscribe((savedMedicineType: MedicineType) => {
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
    this.http
      .patch(this.urlBase + medicineTypeToUpdate.typeCode, medicineTypeToUpdate)
      .subscribe(() => {
        this.emitMedicineTypeChanged();
      });
  }

  private indexOf(typeCode: number): number {
    if (
      isNullOrUndefined(this.medicineTypes) ||
      this.medicineTypes.length === 0
    ) {
      return null;
    }

    if (isNullOrUndefined(typeCode)) {
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
