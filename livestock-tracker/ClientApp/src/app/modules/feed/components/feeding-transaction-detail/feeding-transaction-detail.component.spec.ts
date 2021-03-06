import { Component, EventEmitter, Input, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatMomentDateModule,
  MomentDateModule
} from '@angular/material-moment-adapter';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FeedType } from '@core/models/feed-type.model';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { Unit } from '@core/models/unit.model';
import { getSelectedAnimalId, getUnits } from '@core/store/selectors';
import { feedingTransactionStore, feedTypeStore } from '@feed-store';
import {
  FeedingTransactionService,
  MockFeedingTransactionService
} from '@feed/services';
import {
  LivestockService,
  MockLivestockService
} from '@animal/services/livestock.service';
import { provideMockStore } from '@ngrx/store/testing';

import { FeedingTransactionDetailComponent } from './feeding-transaction-detail.component';

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
              selector: getSelectedAnimalId,
              value: 1
            },
            {
              selector:
                feedingTransactionStore.selectors.getSelectedFeedingTransaction,
              value: null
            },
            {
              selector:
                feedingTransactionStore.selectors
                  .getFeedingTransactionPendingState,
              value: false
            },
            {
              selector:
                feedingTransactionStore.selectors
                  .getFeedingTransactionErrorState,
              value: null
            },
            { selector: feedTypeStore.selectors.getFeedTypes, value: [] },
            { selector: getUnits, value: [] }
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
