import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedTypeDetailComponent } from './feed-type-detail.component';

describe('FeedTypeDetailComponent', () => {
  let component: FeedTypeDetailComponent;
  let fixture: ComponentFixture<FeedTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedTypeDetailComponent ]
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
