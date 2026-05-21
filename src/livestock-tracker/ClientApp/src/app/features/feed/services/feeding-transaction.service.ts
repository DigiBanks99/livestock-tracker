import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedingTransaction, PagedData, PagingOptions } from '@core/models';
import { ApiService } from '@core/services/api.service';

@Injectable({ providedIn: 'root' })
export class FeedingTransactionService extends ApiService<FeedingTransaction> {
  protected readonly baseUrl = '/api/FeedingTransaction';

  getByAnimalId(animalId: number, paging?: PagingOptions): Observable<PagedData<FeedingTransaction>> {
    let params = new HttpParams().set('animalIds[]', animalId.toString());
    if (paging) {
      params = params
        .set('pageSize', paging.pageSize.toString())
        .set('pageNumber', paging.pageNumber.toString());
    }
    return this.http.get<PagedData<FeedingTransaction>>(this.baseUrl, { params });
  }
}
