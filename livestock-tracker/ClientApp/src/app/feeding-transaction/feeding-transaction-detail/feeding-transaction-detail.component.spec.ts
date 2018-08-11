import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingTransactionDetailComponent } from './feeding-transaction-detail.component';

describe('FeedingTransactionDetailComponent', () => {
  let component: FeedingTransactionDetailComponent;
  let fixture: ComponentFixture<FeedingTransactionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedingTransactionDetailComponent ]
    })
    .compileComponents();
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
