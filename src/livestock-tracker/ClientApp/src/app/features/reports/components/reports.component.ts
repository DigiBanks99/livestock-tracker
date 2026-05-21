import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  template: `
    <div class="reports-container">
      <mat-card>
        <mat-card-header>
          <mat-icon mat-card-avatar>assessment</mat-icon>
          <mat-card-title>Reports</mat-card-title>
          <mat-card-subtitle>Coming Soon</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Reports and analytics features are currently under development.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .reports-container {
      padding: 2rem;
      display: flex;
      justify-content: center;
    }
    mat-card {
      max-width: 500px;
      text-align: center;
    }
  `],
})
export class ReportsComponent {}
