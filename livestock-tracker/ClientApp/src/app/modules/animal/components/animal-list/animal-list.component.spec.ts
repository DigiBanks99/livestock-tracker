import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { RouterTestingModule } from '@angular/router/testing';
import { AnimalListComponent } from '@animal/components';
import {
  LivestockService,
  MockLivestockService
} from '@animal/services/livestock.service';
import { AgeCalculatorService } from '@shared/services/age-calculator.service';

describe('Animal List Component', () => {
  let component: AnimalListComponent;
  let fixture: ComponentFixture<AnimalListComponent>;
  let spy: jasmine.SpyObj<AgeCalculatorService>;

  beforeEach(async(() => {
    spy = jasmine.createSpyObj('AgeCalculatorService', ['calculateAge']);

    TestBed.configureTestingModule({
      declarations: [AnimalListComponent],
      providers: [
        { provide: AgeCalculatorService, useValue: spy },
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
    fixture = TestBed.createComponent(AnimalListComponent);
    component = fixture.componentInstance;
    component.animals = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
