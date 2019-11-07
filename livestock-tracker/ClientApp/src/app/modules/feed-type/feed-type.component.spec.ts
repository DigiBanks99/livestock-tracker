import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedTypeComponent } from './feed-type.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FeedTypeDetailComponent } from './feed-type-detail/feed-type-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FeedTypeService, MockFeedTypeService } from './feed-type.service';

describe('FeedTypeComponent', () => {
  let component: FeedTypeComponent;
  let fixture: ComponentFixture<FeedTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedTypeComponent, FeedTypeDetailComponent],
      providers: [{ provide: FeedTypeService, useClass: MockFeedTypeService }],
      imports: [
        ReactiveFormsModule,
        MatToolbarModule,
        MatDividerModule,
        MatListModule,
        MatPaginatorModule,
        MatIconModule,
        MatFormFieldModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
