import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineTypeDetailComponent } from './medicine-type-detail.component';

describe('MedicineTypeDetailComponent', () => {
  let component: MedicineTypeDetailComponent;
  let fixture: ComponentFixture<MedicineTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineTypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
