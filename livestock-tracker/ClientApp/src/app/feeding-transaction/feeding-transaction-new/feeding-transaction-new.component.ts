import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedTypeService } from '@feed-type/feed-type.service';
import { UnitService } from '@unit/unit.service';
import { Observable } from 'rxjs';
import { FeedType } from '@feed-type/feed-type.model';
import { Unit } from '@unit/unit.model';
import { FeedingTransaction } from '@feeding-transaction/feeding-transaction.model';
import { AddFeedTransaction } from '@feeding-transaction-store/actions';
import { Store, select } from '@ngrx/store';
import {
  State,
  getSelectedAnimalId,
  getFeedingTransactionErrorState,
  getFeedingTransactionPendingState
} from '@store';

@Component({
  selector: 'app-feeding-transaction-new',
  templateUrl: './feeding-transaction-new.component.html'
})
export class FeedingTransactionNewComponent implements OnInit {
  public selectedAnimalId$: Observable<number>;
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;
  public feedTypes$: Observable<FeedType[]>;
  public unitTypes$: Observable<Unit[]>;

  constructor(
    private store: Store<State>,
    private router: Router,
    private feedTypeService: FeedTypeService,
    private unitService: UnitService
  ) {
    this.feedTypeService.getFeedTypes();
    this.unitService.getUnits();
  }

  public ngOnInit() {
    this.selectedAnimalId$ = this.store.pipe(select(getSelectedAnimalId));
    this.isPending$ = this.store.pipe(
      select(getFeedingTransactionPendingState)
    );
    this.error$ = this.store.pipe(select(getFeedingTransactionErrorState));
    this.feedTypes$ = this.feedTypeService.feedTypesChanged;
    this.unitTypes$ = this.unitService.unitsChanged;
  }

  public onSave(transaction: FeedingTransaction) {
    this.store.dispatch(new AddFeedTransaction(transaction));
  }

  public onNavigateBack() {
    this.router.navigate(['/feeding-transaction']);
  }
}
