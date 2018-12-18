import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatDividerModule
} from '@angular/material';

import { LsGridComponent } from './ls-grid.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LsGridConfig } from './ls-grid-config.model';

describe('LsGridComponent', () => {
  let component: LsGridComponent;
  let fixture: ComponentFixture<LsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LsGridComponent],
      imports: [
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatPaginatorModule,
        FormsModule,
        RouterModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsGridComponent);
    component = fixture.componentInstance;
    component.config = new LsGridConfig();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
