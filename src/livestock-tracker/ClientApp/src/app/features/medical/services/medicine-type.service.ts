import { Injectable } from '@angular/core';
import { MedicineType } from '@core/models';
import { ApiService } from '@core/services/api.service';

@Injectable({ providedIn: 'root' })
export class MedicineTypeService extends ApiService<MedicineType> {
  protected readonly baseUrl = '/api/MedicineType';
}
