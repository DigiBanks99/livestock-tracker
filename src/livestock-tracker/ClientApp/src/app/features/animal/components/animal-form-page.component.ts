import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from '@core/models';
import { AnimalStateService } from '../services/animal-state.service';
import { AnimalFormComponent } from './animal-form.component';
import { LoaderComponent } from '@shared/components/loader.component';

@Component({
  selector: 'app-animal-form-page',
  standalone: true,
  imports: [AnimalFormComponent, LoaderComponent],
  template: `
    <app-loader [loading]="state.loading()" />
    <app-animal-form
      [animal]="state.selectedAnimal()"
      (save)="onSave($event)"
      (cancelled)="onCancel()"
    />
  `,
})
export class AnimalFormPageComponent implements OnInit {
  protected readonly state = inject(AnimalStateService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.state.loadAnimal(+id);
    } else {
      this.state.clearSelectedAnimal();
    }
  }

  onSave(animal: Partial<Animal>): void {
    this.state.saveAnimal(animal);
    this.router.navigate(['/animal']);
  }

  onCancel(): void {
    this.router.navigate(['/animal']);
  }
}
