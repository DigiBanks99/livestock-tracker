import { Observable } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';
import { AnimalTransaction, PagedData } from '@core/models';
import { CrudService } from '@core/models/services';

export interface AnimalTransactionService<TData extends AnimalTransaction>
  extends CrudService<TData, number, TData> {
  /**
   * Fetches a paged collection of the type of transactions for the specified animal.
   *
   * @param animalId The animal for which the transactions should be returned.
   * @param paginationParameters The parameters for retrieving the correct pagination data.
   * @returns A paged collection of the type of transactions.
   */
  getAnimalTransactions(
    animalId: number,
    paginationParameters: PageEvent
  ): Observable<PagedData<TData>>;
}
