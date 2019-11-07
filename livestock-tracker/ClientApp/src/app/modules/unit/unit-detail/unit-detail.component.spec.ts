import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDetailComponent } from './unit-detail.component';
import { UnitService, MockUnitService } from '../unit.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { Unit } from '../unit.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UnitDetailComponent', () => {
  let component: UnitDetailComponent;
  let fixture: ComponentFixture<UnitDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnitDetailComponent],
      providers: [
        { provide: UnitService, useClass: MockUnitService }
      ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UnitDetailComponent);
    component = fixture.componentInstance;
    component.unit = new Unit();
    component.unit.description = 'Some stuff';
    component.unit.typeCode = 1;
    fixture.detectChanges();
  }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
});
