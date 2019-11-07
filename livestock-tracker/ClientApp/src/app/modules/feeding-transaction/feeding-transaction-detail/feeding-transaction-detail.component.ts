import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State, selectors } from '@store';
import { FeedingTransaction } from '@feeding-transaction/feeding-transaction.model';
import { UpdateFeedTransaction } from '@feeding-transaction-store/actions';
import { Router } from '@angular/router';
import { FeedType } from '@feed-type/feed-type.model';
import { Unit } from '@unit/unit.model';

@Component({
  selector: 'app-feeding-transaction-detail',
  templateUrl: './feeding-transaction-detail.component.html',
  styleUrls: ['./feeding-transaction-detail.component.scss']
})
export class FeedingTransactionDetailComponent implements OnInit, OnDestroy {
  public selectedAnimalId$: Observable<number>;
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;
  public selectedFeedingTransaction$: Observable<FeedingTransaction>;
  public feedTypes$: Observable<FeedType[]>;
  public unitTypes$: Observable<Unit[]>;

  constructor(private store: Store<State>, private router: Router) {}

  public ngOnInit() {
    this.selectedAnimalId$ = this.store.pipe(
      select(selectors.animalSelectors.getSelectedAnimalId)
    );
    this.isPending$ = this.store.pipe(
      select(
        selectors.feedingTransactionSelectors.getFeedingTransactionPendingState
      )
    );
    this.error$ = this.store.pipe(
      select(
        selectors.feedingTransactionSelectors.getFeedingTransactionErrorState
      )
    );
    this.selectedFeedingTransaction$ = this.store.pipe(
      select(
        selectors.feedingTransactionSelectors.getSelectedFeedingTransaction
      )
    );
    this.feedTypes$ = this.store.pipe(
      select(selectors.feedTypeSelectors.getFeedTypes)
    );
    this.unitTypes$ = this.store.pipe(select(selectors.unitSelectors.getUnits));
  }

  public ngOnDestroy() {}

  public onSave(transaction: FeedingTransaction) {
    this.store.dispatch(new UpdateFeedTransaction(transaction));
  }

  public onNavigateBack() {
    this.router.navigate(['/feeding-transaction']);
  }
}
