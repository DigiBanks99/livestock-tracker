import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { getSelectedAnimal } from '@core/store/selectors';
import { LivestockDetailComponent } from '@livestock/components/livestock-detail/livestock-detail.component';
import {
  LivestockService,
  MockLivestockService
} from '@livestock/services/livestock.service';
import { selectors } from '@livestock/store/animal.store';
import { provideMockStore } from '@ngrx/store/testing';

describe('LivestockDetailComponent', () => {
  let component: LivestockDetailComponent;
  let fixture: ComponentFixture<LivestockDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LivestockDetailComponent],
      providers: [
        { provide: LivestockService, useClass: MockLivestockService },
        provideMockStore({
          selectors: [
            { selector: selectors.getAnimalsPendingState, value: false },
            { selector: selectors.getAnimalsError, value: null },
            { selector: getSelectedAnimal, value: null }
          ]
        })
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
