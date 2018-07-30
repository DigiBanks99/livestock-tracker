import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitComponent } from './unit.component';
import { UnitService, MockUnitService } from './unit.service';
import { MatToolbarModule, MatListModule, MatPaginatorModule, MatIconModule, MatFormFieldModule } from '@angular/material';
import { UnitDetailComponent } from './unit-detail/unit-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('UnitComponent', () => {
  let component: UnitComponent;
  let fixture: ComponentFixture<UnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnitComponent, UnitDetailComponent],
      providers: [
        { provide: UnitService, useClass: MockUnitService },
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatListModule,
        MatPaginatorModule,
        MatIconModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
