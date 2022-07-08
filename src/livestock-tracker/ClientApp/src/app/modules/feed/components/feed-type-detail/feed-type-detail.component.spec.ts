import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  FeedTypeService,
  MockFeedTypeService
} from '@feed/services/feed-type.service';

import { FeedTypeDetailComponent } from './feed-type-detail.component';

describe('FeedTypeDetailComponent', () => {
  let component: FeedTypeDetailComponent;
  let fixture: ComponentFixture<FeedTypeDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeedTypeDetailComponent],
      providers: [{ provide: FeedTypeService, useClass: MockFeedTypeService }],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

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
