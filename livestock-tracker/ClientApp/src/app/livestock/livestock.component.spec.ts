import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { LivestockComponent } from './livestock.component';
import { LivestockListComponent } from './livestock-list/livestock-list.component';
import { LivestockDetailComponent } from './livestock-detail/livestock-detail.component';
import { LivestockService, MockLivestockService } from './livestock.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@app/store';
import { from } from 'rxjs';
import { AgeCalculatorService } from './age-calculator.service';

describe('LivestockComponent', () => {
  let component: LivestockComponent;
  let fixture: ComponentFixture<LivestockComponent>;
  let spy: jasmine.SpyObj<AgeCalculatorService>;

  beforeEach(async(() => {
    spy = jasmine.createSpyObj('AgeCalculatorService', ['calculateAge']);

    TestBed.configureTestingModule({
      declarations: [
        LivestockComponent,
        LivestockListComponent,
        LivestockDetailComponent
      ],
      providers: [
        { provide: LivestockService, useClass: MockLivestockService },
        { provide: AgeCalculatorService, useValue: spy }
      ],
      imports: [
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatDividerModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatListModule,
        MatInputModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        HttpClientModule,
        RouterTestingModule,
        MatSnackBarModule,
        FormsModule, // required for MatCheckbox without forms
        StoreModule.forRoot(reducers)
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivestockComponent);
    component = fixture.componentInstance;
    component.animals$ = from([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
