import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UnitDetailComponent } from '@unit/components/unit-detail/unit-detail.component';
import { UnitComponent } from '@unit/components/unit/unit.component';
import { MockUnitService, UnitService } from '@unit/services/unit.service';

describe('UnitComponent', () => {
  let component: UnitComponent;
  let fixture: ComponentFixture<UnitComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UnitComponent, UnitDetailComponent],
        providers: [{ provide: UnitService, useClass: MockUnitService }],
        imports: [
          NoopAnimationsModule,
          ReactiveFormsModule,
          MatFormFieldModule,
          MatToolbarModule,
          MatListModule,
          MatPaginatorModule,
          MatIconModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitComponent);
    component = fixture.componentInstance;
    component.units = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
