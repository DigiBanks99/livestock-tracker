import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
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
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { AnimalListComponent } from '@animal/components';
import { AnimalStore } from '@animal/store';
import { provideMockStore } from '@ngrx/store/testing';
import { AgeCalculatorService } from '@shared/services/age-calculator.service';
import { SvgService } from '@svg/services';
import { LongAnimalList } from '@test/animal/test-data';
import { CommandButtonTestingModule } from '@test/shared';

describe('Animal List Component', () => {
  let component: AnimalListComponent;
  let fixture: ComponentFixture<AnimalListComponent>;
  let spy: jasmine.SpyObj<AgeCalculatorService>;

  beforeEach(waitForAsync(() => {
    spy = jasmine.createSpyObj('AgeCalculatorService', ['calculateAge']);

    TestBed.configureTestingModule({
      declarations: [AnimalListComponent],
      providers: [
        { provide: AgeCalculatorService, useValue: spy },
        SvgService,
        provideMockStore({
          selectors: [
            { selector: AnimalStore.selectors.getPageSize, value: 10 },
            { selector: AnimalStore.selectors.getCurrentPage, value: 0 },
            { selector: AnimalStore.selectors.getRecordCount, value: 0 }
          ]
        }),
        { provide: LocationStrategy, useClass: MockLocationStrategy }
      ],
      imports: [
        CommandButtonTestingModule,
        MatIconModule,
        MatToolbarModule,
        MatDividerModule,
        MatListModule,
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
        MatTableModule,
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

  it('should emit archive if onArchive is called', () => {
    const archiveSpy = spyOn(component.archive, 'emit');
    component.animalIdsArray.patchValue([1, 3]);
    component.animals = LongAnimalList;
    component.onArchive();
    expect(archiveSpy).toHaveBeenCalledTimes(1);
  });
});
