import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnitDetailComponent } from '@unit/components/unit-detail/unit-detail.component';
import { MockUnitService, UnitService } from '@unit/services/unit.service';

describe('UnitDetailComponent', () => {
  let component: UnitDetailComponent;
  let fixture: ComponentFixture<UnitDetailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UnitDetailComponent],
        providers: [{ provide: UnitService, useClass: MockUnitService }],
        imports: [
          ReactiveFormsModule,
          BrowserAnimationsModule,
          MatFormFieldModule,
          MatInputModule,
          MatIconModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(
    waitForAsync(() => {
      fixture = TestBed.createComponent(UnitDetailComponent);
      component = fixture.componentInstance;
      component.unit = { description: 'Some stuff', id: 1 };
      fixture.detectChanges();
    })
  );

  it(
    'should create',
    waitForAsync(() => {
      expect(component).toBeTruthy();
    })
  );
});
