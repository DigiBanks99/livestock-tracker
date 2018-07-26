import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedTypeDetailComponent } from './feed-type-detail.component';
import { ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '../../../../node_modules/@angular/material';
import { FeedTypeService, MockFeedTypeService } from '../feed-type.service';
import { BrowserAnimationsModule } from '../../../../node_modules/@angular/platform-browser/animations';

describe('FeedTypeDetailComponent', () => {
  let component: FeedTypeDetailComponent;
  let fixture: ComponentFixture<FeedTypeDetailComponent>;

  beforeEach(async(() => {
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
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
