import { EntityState } from '@ngrx/entity';

import { AsyncState } from '../async-state.interface';
import { ErrorState } from '../error-state.interface';
import { FetchState } from '../fetch-state.interface';
import { PaginationState } from '../pagination/pagination-state.interface';

export interface CrudState<TType, TKey>
  extends AsyncState,
    FetchState,
    ErrorState,
    EntityState<TType>,
    PaginationState {
  selectedId: TKey;
}
