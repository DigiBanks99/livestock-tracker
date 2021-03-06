import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTransactionNewComponent } from './medical-transaction-new.component';

describe('MedicalTransactionNewComponent', () => {
  let component: MedicalTransactionNewComponent;
  let fixture: ComponentFixture<MedicalTransactionNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalTransactionNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalTransactionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
