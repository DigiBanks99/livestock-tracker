import { Injectable, inject, signal } from '@angular/core';
import { Animal, PagingOptions } from '@core/models';
import { AnimalService } from './animal.service';

@Injectable({ providedIn: 'root' })
export class AnimalStateService {
  private readonly service = inject(AnimalService);

  private readonly _animals = signal<Animal[]>([]);
  private readonly _selectedAnimal = signal<Animal | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _totalCount = signal(0);
  private readonly _currentPage = signal(0);

  readonly animals = this._animals.asReadonly();
  readonly selectedAnimal = this._selectedAnimal.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly totalCount = this._totalCount.asReadonly();
  readonly currentPage = this._currentPage.asReadonly();

  loadAnimals(paging?: PagingOptions): void {
    this._loading.set(true);
    this._error.set(null);
    this.service.getAll(paging).subscribe({
      next: (result) => {
        this._animals.set(result.data);
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

  loadAnimal(id: number): void {
    this._loading.set(true);
    this._error.set(null);
    this.service.get(id).subscribe({
      next: (animal) => {
        this._selectedAnimal.set(animal);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  saveAnimal(animal: Partial<Animal>): void {
    this._loading.set(true);
    this._error.set(null);
    const operation = animal.id
      ? this.service.update(animal.id, animal)
      : this.service.add(animal);
    operation.subscribe({
      next: () => {
        this._loading.set(false);
        this.loadAnimals();
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  deleteAnimal(id: number): void {
    this._loading.set(true);
    this._error.set(null);
    this.service.delete(id).subscribe({
      next: () => {
        this._loading.set(false);
        this.loadAnimals();
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  archiveAnimals(ids: number[]): void {
    this._loading.set(true);
    this._error.set(null);
    this.service.archive(ids).subscribe({
      next: () => {
        this._loading.set(false);
        this.loadAnimals();
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  unarchiveAnimals(ids: number[]): void {
    this._loading.set(true);
    this._error.set(null);
    this.service.unarchive(ids).subscribe({
      next: () => {
        this._loading.set(false);
        this.loadAnimals();
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  clearSelectedAnimal(): void {
    this._selectedAnimal.set(null);
  }
}
