import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MedicalTransactionDetailComponent } from './medical-transaction-detail.component';

describe('MedicalTransactionDetailComponent', () => {
  let component: MedicalTransactionDetailComponent;
  let fixture: ComponentFixture<MedicalTransactionDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalTransactionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalTransactionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
