import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { LivestockListComponent } from './livestock-list.component';
import { LivestockService, MockLivestockService } from '../livestock.service';
import { AgeCalculatorService } from '@livestock/age-calculator.service';

class MockAgeCalculatorService {
  public calculateAge(birthDate: Date, deceasedDate?: Date): string {
    return '';
  }
}

describe('LivestockListComponent', () => {
  let component: LivestockListComponent;
  let fixture: ComponentFixture<LivestockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LivestockListComponent],
      providers: [
        { provide: LivestockService, useClass: MockLivestockService },
        { provide: AgeCalculatorService, useClass: MockAgeCalculatorService }
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
