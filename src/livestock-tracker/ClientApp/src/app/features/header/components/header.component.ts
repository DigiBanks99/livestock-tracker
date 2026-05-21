import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="over" class="sidenav">
        <mat-nav-list>
          @for (link of navLinks; track link.path) {
            <a mat-list-item [routerLink]="link.path" routerLinkActive="active" (click)="sidenav.close()">
              <mat-icon matListItemIcon>{{ link.icon }}</mat-icon>
              <span>{{ link.label }}</span>
            </a>
          }
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary" class="toolbar">
          <button mat-icon-button class="menu-button" (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="title">Livestock Tracker</span>
          <nav class="nav-links">
            @for (link of navLinks; track link.path) {
              <a mat-button [routerLink]="link.path" routerLinkActive="active-link">
                {{ link.label }}
              </a>
            }
          </nav>
        </mat-toolbar>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: auto;
    }
    .toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .title {
      margin-right: 1rem;
      font-weight: 500;
    }
    .nav-links {
      display: flex;
      gap: 0.25rem;
    }
    .menu-button {
      display: none;
    }
    .active {
      background-color: rgba(0, 0, 0, 0.1);
    }
    .active-link {
      border-bottom: 2px solid white;
    }
    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }
      .menu-button {
        display: inline-block;
      }
    }
  `],
})
export class HeaderComponent {
  readonly navLinks = [
    { path: '/home', label: 'Home', icon: 'home' },
    { path: '/animal', label: 'Animals', icon: 'pets' },
    { path: '/feed', label: 'Feed', icon: 'restaurant' },
    { path: '/medicine', label: 'Medicine', icon: 'medical_services' },
    { path: '/weight', label: 'Weight', icon: 'monitor_weight' },
    { path: '/unit', label: 'Units', icon: 'straighten' },
    { path: '/reports', label: 'Reports', icon: 'assessment' },
  ];
}
