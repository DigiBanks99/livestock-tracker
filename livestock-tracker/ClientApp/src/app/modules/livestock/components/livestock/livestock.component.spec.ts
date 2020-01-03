import { from } from 'rxjs';

import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { RouterTestingModule } from '@angular/router/testing';
import { animalStore } from '@animal-store';
import { Livestock } from '@core/models';
import { getAnimals, getSelectedAnimalId } from '@core/store/selectors';
import { LivestockDetailComponent } from '@livestock/components/livestock-detail/livestock-detail.component';
import { LivestockComponent } from '@livestock/components/livestock/livestock.component';
import {
  LivestockService,
  MockLivestockService
} from '@livestock/services/livestock.service';
import { provideMockStore } from '@ngrx/store/testing';
import { AgeCalculatorService } from '@shared/services/age-calculator.service';

@Component({
  selector: 'app-livestock-list',
  template: `
    <div></div>
  `
})
class MockLivestockListComponent {
  @Input() public livestockList: Livestock[];
  @Output() public remove = new EventEmitter<Livestock>();
  @Output() public showDetail = new EventEmitter<number>();
  @Output() public addAnimal = new EventEmitter();
}

describe('LivestockComponent', () => {
  let component: LivestockComponent;
  let fixture: ComponentFixture<LivestockComponent>;
  let spy: jasmine.SpyObj<AgeCalculatorService>;

  beforeEach(async(() => {
    spy = jasmine.createSpyObj('AgeCalculatorService', ['calculateAge']);

    TestBed.configureTestingModule({
      declarations: [
        LivestockComponent,
        MockLivestockListComponent,
        LivestockDetailComponent
      ],
      providers: [
        { provide: LivestockService, useClass: MockLivestockService },
        { provide: AgeCalculatorService, useValue: spy },
        provideMockStore({
          selectors: [
            { selector: getAnimals, value: null },
            { selector: getSelectedAnimalId, value: -1 },
            {
              selector: animalStore.selectors.getAnimalsPendingState,
              value: false
            },
            { selector: animalStore.selectors.getAnimalsError, value: null }
          ]
        })
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
        FormsModule // required for MatCheckbox without forms,
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
