import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivestockComponent } from './livestock.component';
import { LivestockListComponent } from './livestock-list/livestock-list.component';
import { LivestockDetailComponent } from './livestock-detail/livestock-detail.component';

describe('LivestockComponent', () => {
  let component: LivestockComponent;
  let fixture: ComponentFixture<LivestockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LivestockComponent,
        LivestockListComponent,
        LivestockDetailComponent
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
