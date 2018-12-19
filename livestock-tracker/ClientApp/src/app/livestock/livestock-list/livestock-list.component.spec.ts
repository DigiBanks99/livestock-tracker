import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatToolbarModule,
  MatDividerModule,
  MatListModule,
  MatCheckboxModule,
  MatDatepickerModule,
  NativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { LivestockListComponent } from './livestock-list.component';
import { LivestockService, MockLivestockService } from '../livestock.service';
import { Livestock } from '../livestock.model';
import { animalsAdapter } from '@app/store/animal.reducers';

describe('LivestockListComponent', () => {
  let component: LivestockListComponent;
  let fixture: ComponentFixture<LivestockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LivestockListComponent],
      providers: [
        { provide: LivestockService, useClass: MockLivestockService }
      ],
      imports: [
        MatIconModule,
        MatToolbarModule,
        MatDividerModule,
        MatListModule,
        FormsModule,
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
        RouterTestingModule,
        MatSnackBarModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivestockListComponent);
    component = fixture.componentInstance;
    component.livestockList = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
