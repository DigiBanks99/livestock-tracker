import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingTransactionComponent } from './feeding-transaction.component';
import {
  FeedingTransactionService,
  MockFeedingTransactionService
} from './feeding-transaction.service';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LsGridComponent } from '@app/shared/ls-grid/ls-grid.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  LivestockService,
  MockLivestockService
} from '@app/livestock/livestock.service';
import {
  FeedTypeService,
  MockFeedTypeService
} from '@app/feed-type/feed-type.service';
import { UnitService, MockUnitService } from '@app/unit/unit.service';

describe('FeedingTransactionComponent', () => {
  let component: FeedingTransactionComponent;
  let fixture: ComponentFixture<FeedingTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedingTransactionComponent, LsGridComponent],
      providers: [
        { provide: LivestockService, useClass: MockLivestockService },
        {
          provide: FeedingTransactionService,
          useClass: MockFeedingTransactionService
        },
        {
          provide: FeedTypeService,
          useClass: MockFeedTypeService
        },
        { provide: UnitService, useClass: MockUnitService }
      ],
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatOptionModule,
        MatPaginatorModule,
        MatSelectModule,
        MatToolbarModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedingTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
