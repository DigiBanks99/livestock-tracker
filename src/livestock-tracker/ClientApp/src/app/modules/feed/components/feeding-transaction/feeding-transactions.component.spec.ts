import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FeedingTransactionService,
  FeedTypeService,
  MockFeedingTransactionService,
  MockFeedTypeService
} from '@feed/services';
import { SvgService } from '@svg/services';
import { CommandButtonTestingModule } from '@test/shared';
import { MockUnitService, UnitService } from '@unit/services/unit.service';

import { FeedingTransactionsComponent } from './feeding-transactions.component';

@Component({
  selector: 'app-animal-select-container',
  template: '<div></div>'
})
class AnimalSelectContainerComponent {
  @Input() public disabled: boolean;
}

describe('FeedingTransactionComponent', () => {
  let component: FeedingTransactionsComponent;
  let fixture: ComponentFixture<FeedingTransactionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FeedingTransactionsComponent,
        AnimalSelectContainerComponent
      ],
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
        { provide: LocationStrategy, useClass: MockLocationStrategy }
      ],
      imports: [
        BrowserAnimationsModule,
        CommandButtonTestingModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatOptionModule,
        MatPaginatorModule,
        MatSelectModule,
        MatTableModule,
        MatToolbarModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedingTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
