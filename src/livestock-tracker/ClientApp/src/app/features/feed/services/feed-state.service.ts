import { Injectable, inject, signal } from '@angular/core';
import { FeedType, FeedingTransaction, PagingOptions } from '@core/models';
import { FeedTypeService } from './feed-type.service';
import { FeedingTransactionService } from './feeding-transaction.service';

@Injectable({ providedIn: 'root' })
export class FeedStateService {
  private readonly feedTypeService = inject(FeedTypeService);
  private readonly transactionService = inject(FeedingTransactionService);

  // Feed types state
  private readonly _feedTypes = signal<FeedType[]>([]);
  private readonly _feedTypesLoading = signal(false);

  // Transactions state
  private readonly _transactions = signal<FeedingTransaction[]>([]);
  private readonly _transactionsLoading = signal(false);
  private readonly _totalCount = signal(0);
  private readonly _currentPage = signal(0);

  private readonly _error = signal<string | null>(null);

  readonly feedTypes = this._feedTypes.asReadonly();
  readonly feedTypesLoading = this._feedTypesLoading.asReadonly();
  readonly transactions = this._transactions.asReadonly();
  readonly transactionsLoading = this._transactionsLoading.asReadonly();
  readonly totalCount = this._totalCount.asReadonly();
  readonly currentPage = this._currentPage.asReadonly();
  readonly error = this._error.asReadonly();

  // Feed Types
  loadFeedTypes(): void {
    this._feedTypesLoading.set(true);
    this._error.set(null);
    this.feedTypeService.getAll().subscribe({
      next: (result) => {
        this._feedTypes.set(result.data);
        this._feedTypesLoading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._feedTypesLoading.set(false);
      },
    });
  }

  addFeedType(feedType: Partial<FeedType>): void {
    this._feedTypesLoading.set(true);
    this.feedTypeService.add(feedType).subscribe({
      next: () => {
        this._feedTypesLoading.set(false);
        this.loadFeedTypes();
      },
      error: (err) => {
        this._error.set(err.message);
        this._feedTypesLoading.set(false);
      },
    });
  }

  updateFeedType(id: number, feedType: Partial<FeedType>): void {
    this._feedTypesLoading.set(true);
    this.feedTypeService.update(id, feedType).subscribe({
      next: () => {
        this._feedTypesLoading.set(false);
        this.loadFeedTypes();
      },
      error: (err) => {
        this._error.set(err.message);
        this._feedTypesLoading.set(false);
      },
    });
  }

  deleteFeedType(id: number): void {
    this._feedTypesLoading.set(true);
    this.feedTypeService.delete(id).subscribe({
      next: () => {
        this._feedTypesLoading.set(false);
        this.loadFeedTypes();
      },
      error: (err) => {
        this._error.set(err.message);
        this._feedTypesLoading.set(false);
      },
    });
  }

  // Transactions
  loadTransactions(paging?: PagingOptions): void {
    this._transactionsLoading.set(true);
    this._error.set(null);
    this.transactionService.getAll(paging).subscribe({
      next: (result) => {
        this._transactions.set(result.data);
        this._totalCount.set(result.totalRecordCount);
        this._currentPage.set(result.currentPage);
        this._transactionsLoading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._transactionsLoading.set(false);
      },
    });
  }

  loadTransactionsByAnimal(animalId: number, paging?: PagingOptions): void {
    this._transactionsLoading.set(true);
    this._error.set(null);
    this.transactionService.getByAnimalId(animalId, paging).subscribe({
      next: (result) => {
        this._transactions.set(result.data);
        this._totalCount.set(result.totalRecordCount);
        this._currentPage.set(result.currentPage);
        this._transactionsLoading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._transactionsLoading.set(false);
      },
    });
  }

  saveTransaction(transaction: Partial<FeedingTransaction>): void {
    this._transactionsLoading.set(true);
    this._error.set(null);
    const operation = transaction.id
      ? this.transactionService.update(transaction.id, transaction)
      : this.transactionService.add(transaction);
    operation.subscribe({
      next: () => {
        this._transactionsLoading.set(false);
        if (transaction.animalId) {
          this.loadTransactionsByAnimal(transaction.animalId);
        } else {
          this.loadTransactions();
        }
      },
      error: (err) => {
        this._error.set(err.message);
        this._transactionsLoading.set(false);
      },
    });
  }

  deleteTransaction(id: number, animalId?: number): void {
    this._transactionsLoading.set(true);
    this._error.set(null);
    this.transactionService.delete(id).subscribe({
      next: () => {
        this._transactionsLoading.set(false);
        if (animalId) {
          this.loadTransactionsByAnimal(animalId);
        } else {
          this.loadTransactions();
        }
      },
      error: (err) => {
        this._error.set(err.message);
        this._transactionsLoading.set(false);
      },
    });
  }
}
