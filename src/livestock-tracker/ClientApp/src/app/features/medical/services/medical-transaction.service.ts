import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicalTransaction, PagedData, PagingOptions } from '@core/models';
import { ApiService } from '@core/services/api.service';

@Injectable({ providedIn: 'root' })
export class MedicalTransactionService extends ApiService<MedicalTransaction> {
  protected readonly baseUrl = '/api/MedicalTransaction';

  getByAnimalId(animalId: number, paging?: PagingOptions): Observable<PagedData<MedicalTransaction>> {
    let params = new HttpParams().set('animalIds[]', animalId.toString());
    if (paging) {
      params = params
        .set('pageSize', paging.pageSize.toString())
        .set('pageNumber', paging.pageNumber.toString());
    }
    return this.http.get<PagedData<MedicalTransaction>>(this.baseUrl, { params });
  }
}
