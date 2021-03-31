import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeightTransaction } from '@app/modules/weight/interfaces/weight-transaction.interface';
import { WeightProviderModule } from '@app/modules/weight/weight-provider.module';
import { CrudService } from '@core/models/crud-service.interface';
import { PagedData } from '@core/models/paged-data.model';

@Injectable({
  providedIn: WeightProviderModule
})
export class WeightService
  implements CrudService<WeightTransaction, number, WeightTransaction> {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<PagedData<WeightTransaction>> {
    throw new Error('Method not implemented.');
  }

  public get(key: WeightTransaction): Observable<WeightTransaction> {
    throw new Error('Method not implemented.');
  }

  public add(item: WeightTransaction): Observable<WeightTransaction> {
    throw new Error('Method not implemented.');
  }

  public update(
    item: WeightTransaction,
    key: number
  ): Observable<WeightTransaction> {
    throw new Error('Method not implemented.');
  }

  public delete(key: number): Observable<number> {
    throw new Error('Method not implemented.');
  }
}
