import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FeedTypeService, MockFeedTypeService } from '@feed/services';
import { CommandButtonTestingModule } from '@test/shared';

import { FeedTypeDetailComponent } from '../feed-type-detail/feed-type-detail.component';
import { FeedTypeComponent } from './feed-type.component';

describe('FeedTypeComponent', () => {
  let component: FeedTypeComponent;
  let fixture: ComponentFixture<FeedTypeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FeedTypeComponent, FeedTypeDetailComponent],
        providers: [
          { provide: FeedTypeService, useClass: MockFeedTypeService }
        ],
        imports: [
          CommandButtonTestingModule,
          NoopAnimationsModule,
          ReactiveFormsModule,
          MatToolbarModule,
          MatDividerModule,
          MatListModule,
          MatPaginatorModule,
          MatIconModule,
          MatFormFieldModule,
          MatTableModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
