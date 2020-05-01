import { EntityState } from '@ngrx/entity';

import { AsyncState } from './async-state.interface';
import { ErrorState } from './error-state.interface';
import { FetchState } from './fetch-state.interface';
import { PaginationState } from './pagination-state.interface';

export interface CrudState<T, K>
  extends AsyncState,
    FetchState,
    ErrorState,
    EntityState<T>,
    PaginationState {
  selectedId: K;
}
