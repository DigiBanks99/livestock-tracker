import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  getSelectedAnimalId,
  getSelectedFeedingTransaction,
  State,
  getFetchAnimalsPendingState,
  getFeedingTransactionErrorState
} from '@store';
import { FeedingTransaction } from '@feeding-transaction/feeding-transaction.model';
import {
  AddFeedTransaction,
  UpdateFeedTransaction
} from '@feeding-transaction-store/actions';
import { Router } from '@angular/router';
import { FeedTypeService } from '@feed-type/feed-type.service';
import { UnitService } from '@unit/unit.service';
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
  public feedTypes: FeedType[];
  public unitTypes$: Observable<Unit[]>;

  private feedTypeSubscription = new Subscription();
  private unitSubscription = new Subscription();

  constructor(
    private store: Store<State>,
    private router: Router,
    private feedTypeService: FeedTypeService,
    private unitService: UnitService
  ) {
    this.fetchFeedTypes();
    this.feedTypeService.getFeedTypes();
    this.unitService.getUnits();
  }

  public ngOnInit() {
    this.selectedAnimalId$ = this.store.pipe(select(getSelectedAnimalId));
    this.isPending$ = this.store.pipe(select(getFetchAnimalsPendingState));
    this.error$ = this.store.pipe(select(getFeedingTransactionErrorState));
    this.selectedFeedingTransaction$ = this.store.pipe(
      select(getSelectedFeedingTransaction)
    );
    this.unitTypes$ = this.unitService.unitsChanged;
  }

  public ngOnDestroy() {
    this.feedTypeSubscription.unsubscribe();
  }

  public onSave(transaction: FeedingTransaction) {
    this.store.dispatch(new UpdateFeedTransaction(transaction));
  }

  public onNavigateBack() {
    this.router.navigate(['/feeding-transaction']);
  }

  private fetchFeedTypes() {
    this.feedTypeSubscription = this.feedTypeService.feedTypesChanged.subscribe(
      (feedTypes: FeedType[]) => {
        this.feedTypes = feedTypes;
      }
    );
  }
}
