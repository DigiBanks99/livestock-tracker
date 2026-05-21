import { Injectable, inject, signal } from '@angular/core';
import { MedicineType, MedicalTransaction, PagingOptions } from '@core/models';
import { MedicineTypeService } from './medicine-type.service';
import { MedicalTransactionService } from './medical-transaction.service';

@Injectable({ providedIn: 'root' })
export class MedicalStateService {
  private readonly medicineTypeService = inject(MedicineTypeService);
  private readonly transactionService = inject(MedicalTransactionService);

  // Medicine types state
  private readonly _medicineTypes = signal<MedicineType[]>([]);
  private readonly _medicineTypesLoading = signal(false);

  // Transactions state
  private readonly _transactions = signal<MedicalTransaction[]>([]);
  private readonly _transactionsLoading = signal(false);
  private readonly _totalCount = signal(0);
  private readonly _currentPage = signal(0);

  private readonly _error = signal<string | null>(null);

  readonly medicineTypes = this._medicineTypes.asReadonly();
  readonly medicineTypesLoading = this._medicineTypesLoading.asReadonly();
  readonly transactions = this._transactions.asReadonly();
  readonly transactionsLoading = this._transactionsLoading.asReadonly();
  readonly totalCount = this._totalCount.asReadonly();
  readonly currentPage = this._currentPage.asReadonly();
  readonly error = this._error.asReadonly();

  // Medicine Types
  loadMedicineTypes(): void {
    this._medicineTypesLoading.set(true);
    this._error.set(null);
    this.medicineTypeService.getAll().subscribe({
      next: (result) => {
        this._medicineTypes.set(result.data);
        this._medicineTypesLoading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._medicineTypesLoading.set(false);
      },
    });
  }

  addMedicineType(type: Partial<MedicineType>): void {
    this._medicineTypesLoading.set(true);
    this.medicineTypeService.add(type).subscribe({
      next: () => {
        this._medicineTypesLoading.set(false);
        this.loadMedicineTypes();
      },
      error: (err) => {
        this._error.set(err.message);
        this._medicineTypesLoading.set(false);
      },
    });
  }

  updateMedicineType(id: number, type: Partial<MedicineType>): void {
    this._medicineTypesLoading.set(true);
    this.medicineTypeService.update(id, type).subscribe({
      next: () => {
        this._medicineTypesLoading.set(false);
        this.loadMedicineTypes();
      },
      error: (err) => {
        this._error.set(err.message);
        this._medicineTypesLoading.set(false);
      },
    });
  }

  deleteMedicineType(id: number): void {
    this._medicineTypesLoading.set(true);
    this.medicineTypeService.delete(id).subscribe({
      next: () => {
        this._medicineTypesLoading.set(false);
        this.loadMedicineTypes();
      },
      error: (err) => {
        this._error.set(err.message);
        this._medicineTypesLoading.set(false);
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

  saveTransaction(transaction: Partial<MedicalTransaction>): void {
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
