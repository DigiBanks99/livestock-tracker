import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  FeedTypeService,
  MockFeedTypeService
} from '@feed/services/feed-type.service';

import {
  FeedTypeDetailComponent,
  FeedTypeDetailComponentModule
} from './feed-type-detail.component';

describe('FeedTypeDetailComponent', () => {
  let component: FeedTypeDetailComponent;
  let fixture: ComponentFixture<FeedTypeDetailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FeedTypeDetailComponent],
        providers: [
          { provide: FeedTypeService, useClass: MockFeedTypeService }
        ],
        imports: [NoopAnimationsModule, FeedTypeDetailComponentModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedTypeDetailComponent);
    component = fixture.componentInstance;
    component.feedType = {
      description: 'Some description',
      id: 1
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
