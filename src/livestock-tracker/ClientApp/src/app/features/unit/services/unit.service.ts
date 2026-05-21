import { Injectable } from '@angular/core';
import { Unit } from '@core/models';
import { ApiService } from '@core/services/api.service';

@Injectable({ providedIn: 'root' })
export class UnitService extends ApiService<Unit> {
  protected readonly baseUrl = '/api/Unit';
}
