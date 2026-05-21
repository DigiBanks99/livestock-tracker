import { Component, inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimalStateService } from '../services/animal-state.service';
import { AnimalListComponent } from './animal-list.component';
import { LoaderComponent } from '@shared/components/loader.component';

@Component({
  selector: 'app-animal-list-page',
  standalone: true,
  imports: [AnimalListComponent, LoaderComponent],
  template: `
    <app-loader [loading]="state.loading()" />
    <app-animal-list
      [animals]="state.animals()"
      [totalCount]="state.totalCount()"
      (deleteAnimal)="onDelete($event)"
      (pageChange)="onPageChange($event)"
    />
  `,
})
export class AnimalListPageComponent implements OnInit {
  protected readonly state = inject(AnimalStateService);

  ngOnInit(): void {
    this.state.loadAnimals({ pageSize: 10, pageNumber: 0 });
  }

  onDelete(id: number): void {
    this.state.deleteAnimal(id);
  }

  onPageChange(event: PageEvent): void {
    this.state.loadAnimals({ pageSize: event.pageSize, pageNumber: event.pageIndex });
  }
}
