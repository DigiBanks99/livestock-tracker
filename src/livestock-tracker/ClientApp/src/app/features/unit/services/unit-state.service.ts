import { Injectable, inject, signal } from '@angular/core';
import { Unit, PagingOptions } from '@core/models';
import { UnitService } from './unit.service';

@Injectable({ providedIn: 'root' })
export class UnitStateService {
  private readonly service = inject(UnitService);

  private readonly _units = signal<Unit[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _totalCount = signal(0);

  readonly units = this._units.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly totalCount = this._totalCount.asReadonly();

  loadUnits(paging?: PagingOptions): void {
    this._loading.set(true);
    this._error.set(null);
    this.service.getAll(paging).subscribe({
      next: (result) => {
        this._units.set(result.data);
        this._totalCount.set(result.totalRecordCount);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  addUnit(unit: Partial<Unit>): void {
    this._loading.set(true);
    this._error.set(null);
    this.service.add(unit).subscribe({
      next: () => {
        this._loading.set(false);
        this.loadUnits();
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  updateUnit(id: number, unit: Partial<Unit>): void {
    this._loading.set(true);
    this._error.set(null);
    this.service.update(id, unit).subscribe({
      next: () => {
        this._loading.set(false);
        this.loadUnits();
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  deleteUnit(id: number): void {
    this._loading.set(true);
    this._error.set(null);
    this.service.delete(id).subscribe({
      next: () => {
        this._loading.set(false);
        this.loadUnits();
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }
}
