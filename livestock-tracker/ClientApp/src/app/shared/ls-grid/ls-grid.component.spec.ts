import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LsGridComponent } from './ls-grid.component';

describe('LsGridComponent', () => {
  let component: LsGridComponent;
  let fixture: ComponentFixture<LsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
