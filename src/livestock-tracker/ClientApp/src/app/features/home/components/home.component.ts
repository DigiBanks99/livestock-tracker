import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div class="dashboard">
      <h1>Welcome to Livestock Tracker</h1>
      <div class="card-grid">
        @for (card of cards; track card.path) {
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>{{ card.icon }}</mat-icon>
              <mat-card-title>{{ card.title }}</mat-card-title>
              <mat-card-subtitle>{{ card.subtitle }}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-actions>
              <a mat-button color="primary" [routerLink]="card.path">Go to {{ card.title }}</a>
            </mat-card-actions>
          </mat-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 2rem;
    }
    h1 {
      margin-bottom: 1.5rem;
      color: #333;
    }
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .dashboard-card {
      transition: transform 0.2s;
    }
    .dashboard-card:hover {
      transform: translateY(-4px);
    }
  `],
})
export class HomeComponent {
  readonly cards = [
    { path: '/animal', title: 'Animals', subtitle: 'Manage your livestock', icon: 'pets' },
    { path: '/feed', title: 'Feed', subtitle: 'Track feeding transactions', icon: 'restaurant' },
    { path: '/medicine', title: 'Medicine', subtitle: 'Medical records & treatments', icon: 'medical_services' },
    { path: '/weight', title: 'Weight', subtitle: 'Weight tracking & trends', icon: 'monitor_weight' },
    { path: '/unit', title: 'Units', subtitle: 'Manage measurement units', icon: 'straighten' },
    { path: '/reports', title: 'Reports', subtitle: 'View analytics & reports', icon: 'assessment' },
  ];
}
