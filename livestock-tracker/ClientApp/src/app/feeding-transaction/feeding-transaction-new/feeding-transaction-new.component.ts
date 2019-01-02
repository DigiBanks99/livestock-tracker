import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedType } from '@feed-type/feed-type.model';
import { Unit } from '@unit/unit.model';
import { FeedingTransaction } from '@feeding-transaction/feeding-transaction.model';
import { AddFeedTransaction } from '@feeding-transaction-store/actions';
import { Store, select } from '@ngrx/store';
import { State, selectors } from '@store';

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
    this.feedTypes$ = this.store.pipe(
      select(selectors.feedTypeSelectors.getFeedTypes)
    );
    this.unitTypes$ = this.store.pipe(select(selectors.unitSelectors.getUnits));
  }

  public onSave(transaction: FeedingTransaction) {
    this.store.dispatch(new AddFeedTransaction(transaction));
  }

  public onNavigateBack() {
    this.router.navigate(['/feeding-transaction']);
  }
}
