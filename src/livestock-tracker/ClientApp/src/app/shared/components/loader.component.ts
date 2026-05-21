import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    @if (loading()) {
      <div class="loader-overlay">
        <mat-spinner [diameter]="diameter()"></mat-spinner>
      </div>
    }
  `,
  styles: [`
    .loader-overlay {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }
  `],
})
export class LoaderComponent {
  readonly loading = input(false);
  readonly diameter = input(40);
}
