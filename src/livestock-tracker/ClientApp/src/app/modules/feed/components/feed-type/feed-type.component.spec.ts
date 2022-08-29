import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  FeedTypeService,
  MockFeedTypeService
} from '@feed/services';

import { FeedTypeDetailComponent } from './feed-type-detail/feed-type-detail.component';
import {
  FeedTypeComponent,
  FeedTypeComponentModule
} from './feed-type.component';

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
        imports: [NoopAnimationsModule, FeedTypeComponentModule]
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
