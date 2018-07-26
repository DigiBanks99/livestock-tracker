import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedTypeComponent } from './feed-type.component';
import { MatToolbarModule, MatDividerModule, MatListModule, MatPaginatorModule, MatIconModule, MatFormFieldModule } from '../../../node_modules/@angular/material';
import { FeedTypeDetailComponent } from './feed-type-detail/feed-type-detail.component';
import { ReactiveFormsModule } from '../../../node_modules/@angular/forms';
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
