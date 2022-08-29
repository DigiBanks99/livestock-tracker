import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FeedingTransactionService,
  FeedTypeService,
  MockFeedingTransactionService,
  MockFeedTypeService
} from '@feed/services';
import { provideMockStore } from '@ngrx/store/testing';
import { SvgService } from '@svg/services';
import {
  AnimalSelectTestingModule,
  CommandButtonTestingModule
} from '@test/shared';
import {
  MockUnitService,
  UnitService
} from '@unit/services/unit.service';

import {
  FeedingTransactionsComponent,
  FeedingTransactionsComponentModule
} from './feeding-transactions.component';

describe('FeedingTransactionComponent', () => {
  let component: FeedingTransactionsComponent;
  let fixture: ComponentFixture<FeedingTransactionsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [],
        providers: [
          SvgService,
          {
            provide: FeedingTransactionService,
            useClass: MockFeedingTransactionService
          },
          {
            provide: FeedTypeService,
            useClass: MockFeedTypeService
          },
          { provide: UnitService, useClass: MockUnitService },
          { provide: LocationStrategy, useClass: MockLocationStrategy },
          provideMockStore()
        ],
        imports: [
          FeedingTransactionsComponentModule,

          // Testing modules
          AnimalSelectTestingModule,
          CommandButtonTestingModule,
          NoopAnimationsModule,
          RouterTestingModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedingTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
