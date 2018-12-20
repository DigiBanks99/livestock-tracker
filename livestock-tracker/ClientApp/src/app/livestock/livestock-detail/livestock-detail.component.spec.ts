import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatIconModule,
  MatDatepickerModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  NativeDateModule,
  MatSnackBarModule
} from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { LivestockDetailComponent } from './livestock-detail.component';
import { LivestockService, MockLivestockService } from '../livestock.service';
import { LiveStockType } from '../livestock-type.model';
import { ActivatedRoute } from '@angular/router';

describe('LivestockDetailComponent', () => {
  let component: LivestockDetailComponent;
  let fixture: ComponentFixture<LivestockDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LivestockDetailComponent],
      providers: [
        { provide: LivestockService, useClass: MockLivestockService }
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        NativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivestockDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
