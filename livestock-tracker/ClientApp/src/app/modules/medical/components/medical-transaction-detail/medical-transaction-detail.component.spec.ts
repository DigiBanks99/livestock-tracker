import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTransactionDetailComponent } from './medical-transaction-detail.component';

describe('MedicalTransactionDetailComponent', () => {
  let component: MedicalTransactionDetailComponent;
  let fixture: ComponentFixture<MedicalTransactionDetailComponent>;

  beforeEach(async(() => {
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
