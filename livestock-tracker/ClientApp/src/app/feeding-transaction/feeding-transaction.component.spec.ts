import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingTransactionComponent } from './feeding-transaction.component';
import { FeedingTransactionService, MockFeedingTransactionService } from './feeding-transaction.service';

describe('FeedingTransactionComponent', () => {
  let component: FeedingTransactionComponent;
  let fixture: ComponentFixture<FeedingTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedingTransactionComponent ],
      providers: [
        { provide: FeedingTransactionService, useClass: MockFeedingTransactionService }
      ]
    })
    .compileComponents();
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
