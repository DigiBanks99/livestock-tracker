import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTransactionComponent } from './medical-transaction.component';

describe('MedicalTransactionComponent', () => {
  let component: MedicalTransactionComponent;
  let fixture: ComponentFixture<MedicalTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
