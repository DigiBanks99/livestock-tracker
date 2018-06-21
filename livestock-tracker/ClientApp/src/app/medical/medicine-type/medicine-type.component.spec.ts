import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineTypeComponent } from './medicine-type.component';

describe('MedicineTypeComponent', () => {
  let component: MedicineTypeComponent;
  let fixture: ComponentFixture<MedicineTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
