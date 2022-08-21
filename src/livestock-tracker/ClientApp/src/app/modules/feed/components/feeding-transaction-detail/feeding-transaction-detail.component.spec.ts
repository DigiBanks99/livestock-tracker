import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
import { FeedStore } from '@feed-store';
import {
  FeedingTransactionService,
  MockFeedingTransactionService
} from '@feed/services';
import { provideMockStore } from '@ngrx/store/testing';
import { SvgService } from '@svg/services';

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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FeedingTransactionDetailComponent,
        FeedingTransactionFormComponent
      ],
      providers: [
        SvgService,
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
                FeedStore.Transactions.selectors.selectedFeedingTransaction,
              value: null
            },
            {
              selector: FeedStore.Transactions.selectors.isPendingTransaction,
              value: false
            },
            {
              selector: FeedStore.Transactions.selectors.error,
              value: null
            },
            { selector: FeedStore.Feed.selectors.feedTypes, value: [] },
            { selector: getUnits, value: [] }
          ]
        }),
        { provide: LocationStrategy, useClass: MockLocationStrategy }
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
