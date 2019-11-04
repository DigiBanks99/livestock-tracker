import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingTransactionDetailComponent } from './feeding-transaction-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MomentDateModule,
  MatMomentDateModule
} from '@angular/material-moment-adapter';
import { RouterTestingModule } from '@angular/router/testing';
import {
  LivestockService,
  MockLivestockService
} from '@app/livestock/livestock.service';
import {
  FeedingTransactionService,
  MockFeedingTransactionService
} from '../feeding-transaction.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FeedingTransaction } from '@feeding-transaction/feeding-transaction.model';
import { FeedType } from '@feed-type/feed-type.model';
import { Unit } from '@unit/unit.model';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FeedingTransactionState } from '@feeding-transaction-store/reducer';
import { Store } from '@ngrx/store';
import { selectors } from '@store';
import { Livestock } from '@livestock/livestock.model';
import { LiveStockType } from '@livestock/livestock-type.model';

@Component({
  selector: 'app-feeding-transaction-form',
  template: '<div></div>'
})
class FeedingTransactionFormComponent {
  @Input() selectedAnimalId: number;
  @Input() feedingTransaction: FeedingTransaction;
  @Input() isPending: boolean;
  @Input() error: Error;
  @Input() header: string;
  @Input() successMessage: string;
  @Input() feedTypes: FeedType[];
  @Input() unitTypes: Unit[] = [];
  @Output() save = new EventEmitter<FeedingTransaction>();
  @Output() navigateBack = new EventEmitter();
}

describe('FeedingTransactionDetailComponent', () => {
  let component: FeedingTransactionDetailComponent;
  let fixture: ComponentFixture<FeedingTransactionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FeedingTransactionDetailComponent,
        FeedingTransactionFormComponent
      ],
      providers: [
        { provide: LivestockService, useClass: MockLivestockService },
        {
          provide: FeedingTransactionService,
          useClass: MockFeedingTransactionService
        },
        provideMockStore({
          selectors: [
            {
              selector: selectors.animalSelectors.getSelectedAnimalId,
              value: 1
            },
            {
              selector:
                selectors.feedingTransactionSelectors
                  .getSelectedFeedingTransaction,
              value: null
            },
            {
              selector:
                selectors.feedingTransactionSelectors
                  .getFeedingTransactionPendingState,
              value: false
            },
            {
              selector:
                selectors.feedingTransactionSelectors
                  .getFeedingTransactionErrorState,
              value: null
            },
            { selector: selectors.feedTypeSelectors.getFeedTypes, value: [] },
            { selector: selectors.unitSelectors.getUnits, value: [] }
          ]
        })
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMomentDateModule,
        MatToolbarModule,
        MomentDateModule,
        ReactiveFormsModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedingTransactionDetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
