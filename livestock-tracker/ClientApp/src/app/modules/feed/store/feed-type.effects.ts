import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { FeedType } from '@core/models/feed-type.model';
import { CrudEffects } from '@core/store/crud.effects';
import { FeedTypeService } from '@feed/services/feed-type.service';
import { actions as feedTypeActions } from '@feed/store/feed-type.actions';
import { Actions } from '@ngrx/effects';

import { FeedTypeKey } from './constants';

@Injectable()
export class FeedTypeEffects extends CrudEffects<FeedType, number, FeedType[]> {
  constructor(actions$: Actions, feedTypeService: FeedTypeService) {
    super(actions$, feedTypeService, feedTypeActions, FeedTypeKey);
  }
}
