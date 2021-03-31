import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightComponent } from './weight.component';

describe('WeightComponent', () => {
  let component: WeightComponent;
  let fixture: ComponentFixture<WeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeightComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
