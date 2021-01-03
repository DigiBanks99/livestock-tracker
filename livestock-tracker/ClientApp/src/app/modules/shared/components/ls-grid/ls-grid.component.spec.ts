import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { LsGridConfig } from '@core/models/ls-grid-config.model';
import { LsGridComponent } from '@shared/components/ls-grid/ls-grid.component';

describe('LsGridComponent', () => {
  let component: LsGridComponent;
  let fixture: ComponentFixture<LsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LsGridComponent],
      imports: [
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatPaginatorModule,
        FormsModule,
        RouterModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsGridComponent);
    component = fixture.componentInstance;
    component.config = new LsGridConfig();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
