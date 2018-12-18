import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingTransactionDetailComponent } from './feeding-transaction-detail.component';
import {
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
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

describe('FeedingTransactionDetailComponent', () => {
  let component: FeedingTransactionDetailComponent;
  let fixture: ComponentFixture<FeedingTransactionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedingTransactionDetailComponent],
      providers: [
        { provide: LivestockService, useClass: MockLivestockService },
        {
          provide: FeedingTransactionService,
          useClass: MockFeedingTransactionService
        }
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
