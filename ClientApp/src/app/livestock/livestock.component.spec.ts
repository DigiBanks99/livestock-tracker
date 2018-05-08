import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule, MatIconModule, MatToolbarModule, MatDividerModule, MatListModule, MatInputModule, MatCheckboxModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { LivestockComponent } from './livestock.component';
import { LivestockListComponent } from './livestock-list/livestock-list.component';
import { LivestockDetailComponent } from './livestock-detail/livestock-detail.component';
import { LivestockService, MockLivestockService } from './livestock.service';

describe('LivestockComponent', () => {
  let component: LivestockComponent;
  let fixture: ComponentFixture<LivestockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LivestockComponent,
        LivestockListComponent,
        LivestockDetailComponent
      ],
      providers: [{ provide: LivestockService, useClass: MockLivestockService }],
      imports: [
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatDividerModule,
        MatListModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatListModule,
        MatInputModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        HttpClientModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
