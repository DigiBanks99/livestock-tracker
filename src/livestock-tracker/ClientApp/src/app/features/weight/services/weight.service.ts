import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeightTransaction, PagedData, PagingOptions } from '@core/models';
import { ApiService } from '@core/services/api.service';

@Injectable({ providedIn: 'root' })
export class WeightService extends ApiService<WeightTransaction> {
  protected readonly baseUrl = '/api/Weight';

  getByAnimalId(animalId: number, paging?: PagingOptions): Observable<PagedData<WeightTransaction>> {
    let params = new HttpParams().set('animalIds[]', animalId.toString());
    if (paging) {
      params = params
        .set('pageSize', paging.pageSize.toString())
        .set('pageNumber', paging.pageNumber.toString());
    }
    return this.http.get<PagedData<WeightTransaction>>(this.baseUrl, { params });
  }
}
