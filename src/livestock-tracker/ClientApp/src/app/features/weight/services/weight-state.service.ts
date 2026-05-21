import { Injectable, inject, signal } from '@angular/core';
import { WeightTransaction, PagingOptions } from '@core/models';
import { WeightService } from './weight.service';

@Injectable({ providedIn: 'root' })
export class WeightStateService {
  private readonly service = inject(WeightService);

  private readonly _transactions = signal<WeightTransaction[]>([]);
  private readonly _selectedTransaction = signal<WeightTransaction | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _totalCount = signal(0);
  private readonly _currentPage = signal(0);

  readonly transactions = this._transactions.asReadonly();
  readonly selectedTransaction = this._selectedTransaction.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly totalCount = this._totalCount.asReadonly();
  readonly currentPage = this._currentPage.asReadonly();

  loadTransactions(paging?: PagingOptions): void {
    this._loading.set(true);
    this._error.set(null);
    this.service.getAll(paging).subscribe({
      next: (result) => {
        this._transactions.set(result.data);
        this._totalCount.set(result.totalRecordCount);
        this._currentPage.set(result.currentPage);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  loadByAnimalId(animalId: number, paging?: PagingOptions): void {
    this._loading.set(true);
    this._error.set(null);
    this.service.getByAnimalId(animalId, paging).subscribe({
      next: (result) => {
        this._transactions.set(result.data);
        this._totalCount.set(result.totalRecordCount);
        this._currentPage.set(result.currentPage);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  saveTransaction(transaction: Partial<WeightTransaction>): void {
    this._loading.set(true);
    this._error.set(null);
    const operation = transaction.id
      ? this.service.update(transaction.id, transaction)
      : this.service.add(transaction);
    operation.subscribe({
      next: () => {
        this._loading.set(false);
        if (transaction.animalId) {
          this.loadByAnimalId(transaction.animalId);
        } else {
          this.loadTransactions();
        }
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  deleteTransaction(id: number, animalId?: number): void {
    this._loading.set(true);
    this._error.set(null);
    this.service.delete(id).subscribe({
      next: () => {
        this._loading.set(false);
        if (animalId) {
          this.loadByAnimalId(animalId);
        } else {
          this.loadTransactions();
        }
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  selectTransaction(transaction: WeightTransaction | null): void {
    this._selectedTransaction.set(transaction);
  }
}
